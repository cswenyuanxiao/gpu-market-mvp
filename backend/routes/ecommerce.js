// backend/routes/ecommerce.js
const express = require('express');
const { z } = require('zod');
const DatabaseAdapter = require('../database');

// Validation schemas
const AddToCartSchema = z.object({
  gpu_id: z.number().positive(),
  quantity: z.number().positive().max(10).default(1),
});

const UpdateCartSchema = z.object({
  quantity: z.number().positive().max(10),
});

const CheckoutSchema = z.object({
  shipping_name: z.string().min(2).max(255),
  shipping_email: z.string().email(),
  shipping_phone: z.string().optional(),
  shipping_address_line1: z.string().min(5).max(255),
  shipping_address_line2: z.string().max(255).optional(),
  shipping_city: z.string().min(2).max(100),
  shipping_postcode: z.string().min(3).max(20),
  shipping_country: z.string().length(2).default('GB'),
  notes: z.string().max(500).optional(),
});

class EcommerceService {
  constructor() {
    this.db = new DatabaseAdapter();
  }

  async init() {
    await this.db.init();
  }

  async getOrCreateCart(userId) {
    let cart = await this.db.get('SELECT * FROM carts WHERE user_id = ?', [userId]);
    if (!cart) {
      const result = await this.db.run('INSERT INTO carts (user_id) VALUES (?)', [userId]);
      cart = { id: result.lastInsertRowid, user_id: userId };
    }
    return cart;
  }

  generateOrderNumber() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }

  calculateOrderAmounts(subtotal) {
    const taxRate = 0.2; // 20% VAT
    const freeShippingThreshold = 500;
    const standardShipping = 15;
    const taxAmount = subtotal * taxRate;
    const shippingAmount = subtotal >= freeShippingThreshold ? 0 : standardShipping;
    const totalAmount = subtotal + taxAmount + shippingAmount;
    return {
      subtotal: Math.round(subtotal * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      shippingAmount: Math.round(shippingAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    };
  }
}

function createEcommerceRoutes(authenticateToken) {
  const router = express.Router();
  const service = new EcommerceService();
  service.init().catch(console.error);

  // GET /api/cart
  router.get('/cart', authenticateToken, async (req, res) => {
    try {
      const cart = await service.getOrCreateCart(req.user.id);
      const items = await service.db.query(
        `
        SELECT 
          ci.id,
          ci.gpu_id,
          ci.quantity,
          ci.price,
          ci.created_at,
          g.title,
          g.image_path,
          g.brand,
          g.vram_gb,
          g.condition,
          i.stock_quantity
        FROM cart_items ci
        JOIN gpus g ON ci.gpu_id = g.id
        LEFT JOIN inventory i ON g.id = i.gpu_id
        WHERE ci.cart_id = ?
        ORDER BY ci.created_at DESC
      `,
        [cart.id],
      );

      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const { taxAmount, shippingAmount, totalAmount } = service.calculateOrderAmounts(subtotal);
      res.json({
        items,
        summary: {
          itemCount: items.length,
          totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
          subtotal,
          taxAmount,
          shippingAmount,
          totalAmount,
        },
      });
    } catch (error) {
      console.error('Cart fetch error:', error);
      res.status(500).json({ error: 'Failed to load cart' });
    }
  });

  // POST /api/cart
  router.post('/cart', authenticateToken, async (req, res) => {
    try {
      const parsed = AddToCartSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
      }
      const { gpu_id, quantity } = parsed.data;
      const gpu = await service.db.get(
        `
        SELECT g.*, i.stock_quantity 
        FROM gpus g 
        LEFT JOIN inventory i ON g.id = i.gpu_id 
        WHERE g.id = ?
      `,
        [gpu_id],
      );
      if (!gpu) return res.status(404).json({ error: 'Product not found' });
      if (gpu.stock_quantity < quantity) {
        return res.status(400).json({ error: 'Insufficient stock', available: gpu.stock_quantity });
      }
      const cart = await service.getOrCreateCart(req.user.id);
      const existingItem = await service.db.get(
        'SELECT * FROM cart_items WHERE cart_id = ? AND gpu_id = ?',
        [cart.id, gpu_id],
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (gpu.stock_quantity < newQuantity) {
          return res.status(400).json({
            error: 'Insufficient stock',
            available: gpu.stock_quantity,
            currentInCart: existingItem.quantity,
          });
        }
        await service.db.run(
          'UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [newQuantity, existingItem.id],
        );
      } else {
        await service.db.run(
          'INSERT INTO cart_items (cart_id, gpu_id, quantity, price) VALUES (?, ?, ?, ?)',
          [cart.id, gpu_id, quantity, gpu.price],
        );
      }
      await service.db.run('UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [
        cart.id,
      ]);
      res.json({ success: true, message: 'Added to cart' });
    } catch (error) {
      console.error('Add to cart error:', error);
      res.status(500).json({ error: 'Failed to add to cart' });
    }
  });

  // PUT /api/cart/:itemId
  router.put('/cart/:itemId', authenticateToken, async (req, res) => {
    try {
      const parsed = UpdateCartSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
      }
      const { quantity } = parsed.data;
      const itemId = parseInt(req.params.itemId);
      const item = await service.db.get(
        `
        SELECT ci.*, g.title, i.stock_quantity
        FROM cart_items ci
        JOIN carts c ON ci.cart_id = c.id
        JOIN gpus g ON ci.gpu_id = g.id
        LEFT JOIN inventory i ON g.id = i.gpu_id
        WHERE ci.id = ? AND c.user_id = ?
      `,
        [itemId, req.user.id],
      );
      if (!item) return res.status(404).json({ error: 'Cart item not found' });
      if (item.stock_quantity < quantity) {
        return res
          .status(400)
          .json({ error: 'Insufficient stock', available: item.stock_quantity });
      }
      await service.db.run('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, itemId]);
      res.json({ success: true, message: 'Cart updated' });
    } catch (error) {
      console.error('Update cart error:', error);
      res.status(500).json({ error: 'Failed to update cart' });
    }
  });

  // DELETE /api/cart/:itemId
  router.delete('/cart/:itemId', authenticateToken, async (req, res) => {
    try {
      const itemId = parseInt(req.params.itemId);
      const result = await service.db.run(
        `
        DELETE FROM cart_items 
        WHERE id = ? AND cart_id IN (
          SELECT id FROM carts WHERE user_id = ?
        )
      `,
        [itemId, req.user.id],
      );
      if (result.changes === 0) return res.status(404).json({ error: 'Cart item not found' });
      res.json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
      console.error('Remove from cart error:', error);
      res.status(500).json({ error: 'Failed to remove from cart' });
    }
  });

  // POST /api/checkout/session
  router.post('/checkout/session', authenticateToken, async (req, res) => {
    try {
      const parsed = CheckoutSchema.safeParse(req.body);
      if (!parsed.success) {
        return res
          .status(400)
          .json({ error: 'Invalid checkout data', details: parsed.error.flatten() });
      }
      const checkoutData = parsed.data;
      const cart = await service.getOrCreateCart(req.user.id);
      const items = await service.db.query(
        `
        SELECT 
          ci.*,
          g.title,
          i.stock_quantity
        FROM cart_items ci
        JOIN gpus g ON ci.gpu_id = g.id
        LEFT JOIN inventory i ON g.id = i.gpu_id
        WHERE ci.cart_id = ?
      `,
        [cart.id],
      );
      if (items.length === 0) return res.status(400).json({ error: 'Cart is empty' });
      for (const item of items) {
        if (item.stock_quantity < item.quantity) {
          return res.status(400).json({
            error: `Insufficient stock for ${item.title}`,
            available: item.stock_quantity,
            requested: item.quantity,
          });
        }
      }
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const amounts = service.calculateOrderAmounts(subtotal);
      const orderNumber = service.generateOrderNumber();
      const orderResult = await service.db.run(
        `
        INSERT INTO orders (
          user_id, order_number, 
          subtotal, tax_amount, shipping_amount, total_amount,
          shipping_name, shipping_email, shipping_phone,
          shipping_address_line1, shipping_address_line2,
          shipping_city, shipping_postcode, shipping_country,
          notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          req.user.id,
          orderNumber,
          amounts.subtotal,
          amounts.taxAmount,
          amounts.shippingAmount,
          amounts.totalAmount,
          checkoutData.shipping_name,
          checkoutData.shipping_email,
          checkoutData.shipping_phone,
          checkoutData.shipping_address_line1,
          checkoutData.shipping_address_line2,
          checkoutData.shipping_city,
          checkoutData.shipping_postcode,
          checkoutData.shipping_country,
          checkoutData.notes,
        ],
      );
      const orderId = orderResult.lastInsertRowid;
      for (const item of items) {
        await service.db.run(
          `INSERT INTO order_items (order_id, gpu_id, title, price, quantity, subtotal) VALUES (?, ?, ?, ?, ?, ?)`,
          [orderId, item.gpu_id, item.title, item.price, item.quantity, item.price * item.quantity],
        );
      }
      for (const item of items) {
        await service.db.run(
          'UPDATE inventory SET reserved_quantity = reserved_quantity + ? WHERE gpu_id = ?',
          [item.quantity, item.gpu_id],
        );
      }
      res.json({
        orderId,
        orderNumber,
        ...amounts,
        message: 'Checkout session created',
      });
    } catch (error) {
      console.error('Checkout error:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  });

  // GET /api/orders
  router.get('/orders', authenticateToken, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const orders = await service.db.query(
        `
        SELECT id, order_number, status, total_amount, payment_status, created_at
        FROM orders 
        WHERE user_id = ? 
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `,
        [req.user.id, limit, offset],
      );
      const totalResult = await service.db.get(
        'SELECT COUNT(*) as total FROM orders WHERE user_id = ?',
        [req.user.id],
      );
      res.json({
        orders,
        pagination: {
          page,
          limit,
          total: totalResult.total,
          totalPages: Math.ceil(totalResult.total / limit),
        },
      });
    } catch (error) {
      console.error('Orders fetch error:', error);
      res.status(500).json({ error: 'Failed to load orders' });
    }
  });

  // GET /api/orders/:id
  router.get('/orders/:id', authenticateToken, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await service.db.get('SELECT * FROM orders WHERE id = ? AND user_id = ?', [
        orderId,
        req.user.id,
      ]);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      const items = await service.db.query(
        `
        SELECT 
          oi.*,
          g.image_path,
          g.brand,
          g.vram_gb,
          g.condition
        FROM order_items oi
        LEFT JOIN gpus g ON oi.gpu_id = g.id
        WHERE oi.order_id = ?
      `,
        [orderId],
      );
      res.json({ order, items });
    } catch (error) {
      console.error('Order fetch error:', error);
      res.status(500).json({ error: 'Failed to load order' });
    }
  });

  // POST /api/orders/:id/confirm (demo payment)
  router.post('/orders/:id/confirm', authenticateToken, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const { payment_method = 'demo' } = req.body || {};
      const order = await service.db.get(
        `SELECT * FROM orders WHERE id = ? AND user_id = ? AND status = 'pending'`,
        [orderId, req.user.id],
      );
      if (!order) return res.status(404).json({ error: 'Order not found or already processed' });
      await service.db.run(
        `
        UPDATE orders 
        SET status = 'confirmed', 
            payment_status = 'paid',
            payment_method = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
        [payment_method, orderId],
      );
      const orderItems = await service.db.query('SELECT * FROM order_items WHERE order_id = ?', [
        orderId,
      ]);
      for (const item of orderItems) {
        await service.db.run(
          `
          UPDATE inventory 
          SET stock_quantity = stock_quantity - ?,
              reserved_quantity = reserved_quantity - ?
          WHERE gpu_id = ?
        `,
          [item.quantity, item.quantity, item.gpu_id],
        );
      }
      const cart = await service.getOrCreateCart(req.user.id);
      await service.db.run('DELETE FROM cart_items WHERE cart_id = ?', [cart.id]);
      res.json({ success: true, message: 'Order confirmed', orderNumber: order.order_number });
    } catch (error) {
      console.error('Order confirmation error:', error);
      res.status(500).json({ error: 'Failed to confirm order' });
    }
  });

  return router;
}

module.exports = createEcommerceRoutes;

import { useEffect, useState } from 'react';
import { getCartItems, removeFromCart, updateCartQuantity } from '../lib/cart';
import { Button, Empty, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatPrice } from '../lib/format';

type CartItem = {
  gpu_id: number;
  quantity: number;
  title?: string;
  price?: number;
  image_path?: string;
  brand?: string;
  vram_gb?: number;
};

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);

  function loadCart() {
    const local = getCartItems();
    setItems(local as any);

    const totalQty = local.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    window.dispatchEvent(
      new CustomEvent('cart-loaded', {
        detail: { count: totalQty },
      }),
    );
  }

  function handleUpdateQuantity(gpuId: number, quantity: number) {
    if (quantity < 1) return;
    updateCartQuantity(gpuId, quantity);
    loadCart();
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: { text: 'Cart updated', type: 'success' },
      }),
    );
  }

  function handleRemoveItem(gpuId: number) {
    const removedItem = items.find((i) => i.gpu_id === gpuId);
    const removedQty = removedItem?.quantity || 0;
    const updated = removeFromCart(gpuId, removedQty);
    setItems(updated as any);
    window.dispatchEvent(
      new CustomEvent('cart-changed', {
        detail: { delta: -removedQty },
      }),
    );
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: { text: 'Item removed', type: 'success' },
      }),
    );
  }

  useEffect(() => {
    loadCart();
  }, []);

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <Empty description="Your cart is empty" image={Empty.PRESENTED_IMAGE_SIMPLE}>
          <Button type="primary" href="/">
            Continue Shopping
          </Button>
        </Empty>
      </div>
    );
  }

  const total = items.reduce(
    (s, it) => s + (Number(it.price) || 0) * (Number(it.quantity) || 0),
    0,
  );

  return (
    <div className="page-cart container py-4">
      <h1 className="mb-4">Shopping Cart</h1>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.gpu_id} className="cart-item modern-card p-3 mb-3">
            <div className="d-flex gap-3">
              {item.image_path && (
                <img
                  src={item.image_path}
                  alt={item.title || ''}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
              )}

              <div className="flex-grow-1">
                <h5>{item.title || `GPU #${item.gpu_id}`}</h5>
                {item.brand && <div className="text-muted">{item.brand}</div>}
                {item.vram_gb && <div className="text-muted">{item.vram_gb}GB VRAM</div>}
                <div className="mt-2 d-flex align-items-center gap-3">
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(v) => v && handleUpdateQuantity(item.gpu_id, v)}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(item.gpu_id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <div className="text-end">
                <div className="h5">{formatPrice((item.price || 0) * (item.quantity || 0))}</div>
                <div className="text-muted small">{formatPrice(item.price || 0)} each</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary modern-card p-4 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Total</h4>
          <h3 className="mb-0">{formatPrice(total)}</h3>
        </div>
        <Button type="primary" size="large" block href="/checkout">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

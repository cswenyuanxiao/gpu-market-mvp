import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { getCartItems, removeFromCart } from '../lib/cart';
import { Button, Result, Spin, Empty, InputNumber } from 'antd';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);

  async function loadCart() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch('/api/cart');
      const json = await res.json().catch(() => ({}));
      const arr = Array.isArray(json.items) ? json.items : [];
      setItems(arr);

      // Update cart count in header
      const totalQty = arr.reduce((sum: number, item: any) => {
        return sum + (Number(item.quantity) || 0);
      }, 0);

      window.dispatchEvent(
        new CustomEvent('cart-loaded', {
          detail: { count: totalQty },
        }),
      );
    } catch (e: any) {
      // Fallback to local cart when API is unavailable
      const local = getCartItems();
      setItems(local as any);
      setError(null);

      // Update cart count from local
      const totalQty = local.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
      window.dispatchEvent(
        new CustomEvent('cart-loaded', {
          detail: { count: totalQty },
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(gpuId: number, quantity: number) {
    if (quantity < 1) return;

    setUpdating(gpuId);
    try {
      const res = await apiFetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gpu_id: gpuId, quantity }),
      });

      if (res.ok) {
        await loadCart();
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: 'Cart updated', type: 'success' },
          }),
        );
      }
    } catch (error) {
      // Fallback to local cart update
      const updated = removeFromCart(gpuId, 1);
      const newItem = updated.find((item) => item.gpu_id === gpuId);
      if (newItem) {
        newItem.quantity = quantity;
        setItems(updated as any);
        window.dispatchEvent(
          new CustomEvent('cart-changed', {
            detail: { delta: quantity - (items.find((i) => i.gpu_id === gpuId)?.quantity || 0) },
          }),
        );
      }
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: 'Cart updated (offline)', type: 'success' },
        }),
      );
    } finally {
      setUpdating(null);
    }
  }

  async function removeItem(gpuId: number) {
    setUpdating(gpuId);
    try {
      const res = await apiFetch(`/api/cart/${gpuId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const removedItem = items.find((item) => item.gpu_id === gpuId);
        const removedQty = removedItem?.quantity || 0;

        await loadCart();

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
    } catch (error) {
      // Fallback to local cart removal
      const removedItem = items.find((item) => item.gpu_id === gpuId);
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
          detail: { text: 'Item removed (offline)', type: 'success' },
        }),
      );
    } finally {
      setUpdating(null);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <Result status="error" title="Failed to load cart" subTitle={error} />
      </div>
    );
  }

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
                    onChange={(value) => value && updateQuantity(item.gpu_id, value)}
                    disabled={updating === item.gpu_id}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(item.gpu_id)}
                    loading={updating === item.gpu_id}
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

import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../lib/api';
import { getCartItems } from '../lib/cart';
import { Button, Form, Input, Result, Spin } from 'antd';
import { formatPrice } from '../lib/format';

type CartItem = {
  gpu_id: number;
  quantity: number;
  title: string;
  price: number;
  image_path?: string;
  brand?: string;
  vram_gb?: number;
};

export default function Checkout() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function loadCart() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch('/api/cart');
      const json = await res.json();
      setItems(Array.isArray(json.items) ? json.items : []);
    } catch (e: any) {
      // fallback to local cart
      setItems(getCartItems() as any);
      setError(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.quantity, 0), [items]);

  async function onSubmit(values: any) {
    setSubmitting(true);
    try {
      const res = await apiFetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          shipping_name: values.name,
          shipping_address1: values.address1,
          shipping_address2: values.address2,
          city: values.city,
          postcode: values.postcode,
          country: values.country || 'GB',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.url) {
        window.location.href = json.url;
      } else {
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: json?.error || 'Failed to start checkout', type: 'error' },
          }),
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading)
    return (
      <div className="container py-4 d-flex justify-content-center">
        <Spin />
      </div>
    );
  if (error)
    return (
      <div className="container py-4">
        <Result status="error" title="Failed to load" subTitle={error} />
      </div>
    );

  return (
    <div className="page-checkout container py-3">
      <div className="product-grid">
        <div className="modern-card p-3">
          <h3>Order Summary</h3>
          {items.length === 0 && <div className="text-muted">Cart is empty</div>}
          {items.map((it) => (
            <div
              key={it.gpu_id}
              className="d-flex align-items-center justify-content-between py-2"
              style={{ borderBottom: '1px solid #f1f5f9' }}
            >
              <div className="d-flex align-items-center gap-2">
                {it.image_path && (
                  <img
                    src={it.image_path}
                    alt={it.title}
                    width={56}
                    height={56}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: 600 }}>{it.title}</div>
                  <div className="text-muted small">Qty {it.quantity}</div>
                </div>
              </div>
              <div style={{ fontWeight: 600 }}>{formatPrice(it.price * it.quantity)}</div>
            </div>
          ))}
          <div className="d-flex justify-content-between py-3" style={{ fontWeight: 700 }}>
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="text-muted small">Tax included. Shipping calculated at checkout.</div>
        </div>
        <div className="modern-card p-3">
          <h3>Contact & Delivery</h3>
          <Form layout="vertical" onFinish={onSubmit} requiredMark={false}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="you@example.com" />
            </Form.Item>
            <Form.Item label="Full name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Address line 1" name="address1" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address line 2" name="address2">
              <Input />
            </Form.Item>
            <Form.Item label="City" name="city" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Postcode" name="postcode" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Country" name="country" initialValue="GB">
              <Input />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={items.length === 0}
            >
              Continue to payment
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

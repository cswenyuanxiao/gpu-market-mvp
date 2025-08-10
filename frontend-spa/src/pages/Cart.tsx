import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { getCartItems, removeFromCart, updateCartQuantity } from '../lib/cart';
import { Button, Empty, InputNumber, Alert, Spin, Card, Row, Col, Divider, Space } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, CreditCardOutlined } from '@ant-design/icons';
import { formatPrice } from '../lib/format';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

type CartItem = {
  id?: number;
  gpu_id: number;
  quantity: number;
  title?: string;
  price?: number;
  image_path?: string;
  brand?: string;
  vram_gb?: number;
  condition?: string;
};

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<Set<number>>(new Set());
  const navigate = useNavigate();
  const { user } = useAuth();

  async function loadCart() {
    setLoading(true);
    setError(null);
    try {
      if (user) {
        const res = await apiFetch('/api/cart');
        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
          setSummary(data.summary || null);
          window.dispatchEvent(
            new CustomEvent('cart-loaded', {
              detail: { count: data.summary?.totalQuantity || 0 },
            }),
          );
          return;
        }
      }
      const localItems = getCartItems();
      setItems(localItems as CartItem[]);
      const localSummary = {
        itemCount: localItems.length,
        totalQuantity: localItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: localItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
        taxAmount: 0,
        shippingAmount: 0,
        totalAmount: localItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
      };
      setSummary(localSummary);
      window.dispatchEvent(
        new CustomEvent('cart-loaded', {
          detail: { count: localSummary.totalQuantity },
        }),
      );
    } catch (e: any) {
      setError('Failed to load cart. Please try again.');
      const localItems = getCartItems();
      setItems(localItems as CartItem[]);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateQuantity(itemIdOrGpuId: number, quantity: number) {
    if (quantity < 1) return;
    setUpdating((prev) => new Set([...prev, itemIdOrGpuId]));
    try {
      if (user) {
        const res = await apiFetch(`/api/cart/${itemIdOrGpuId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });
        if (!res.ok) throw new Error('Failed to update');
        await loadCart();
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: 'Cart updated', type: 'success' } }),
        );
        return;
      }
      updateCartQuantity(itemIdOrGpuId, quantity);
      loadCart();
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: 'Cart updated (offline)', type: 'success' },
        }),
      );
    } finally {
      setUpdating((prev) => {
        const s = new Set(prev);
        s.delete(itemIdOrGpuId);
        return s;
      });
    }
  }

  async function handleRemoveItem(itemIdOrGpuId: number) {
    setUpdating((prev) => new Set([...prev, itemIdOrGpuId]));
    try {
      if (user) {
        const res = await apiFetch(`/api/cart/${itemIdOrGpuId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to remove');
        await loadCart();
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: 'Item removed from cart', type: 'success' },
          }),
        );
        return;
      }
      const item = items.find((i) => i.gpu_id === itemIdOrGpuId);
      const updated = removeFromCart(itemIdOrGpuId, item?.quantity || 0);
      setItems(updated as any);
      window.dispatchEvent(
        new CustomEvent('cart-changed', { detail: { delta: -(item?.quantity || 0) } }),
      );
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: 'Item removed (offline)', type: 'success' },
        }),
      );
    } finally {
      setUpdating((prev) => {
        const s = new Set(prev);
        s.delete(itemIdOrGpuId);
        return s;
      });
    }
  }

  function handleCheckout() {
    if (!user) {
      sessionStorage.setItem('from', '/cart');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  }

  useEffect(() => {
    loadCart();
  }, [user]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Spin size="large" />
        <div className="mt-3">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <Alert
          message="Error"
          description={error}
          type="error"
          action={
            <Button size="small" onClick={loadCart}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <Empty
          description="Your cart is empty"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ padding: '60px 0' }}
        >
          <Button type="primary" size="large" href="/" icon={<ShoppingCartOutlined />}>
            Continue Shopping
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="page-cart container py-4">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title={`Shopping Cart (${summary?.itemCount || 0} items)`} className="mb-4">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id || item.gpu_id} className="cart-item">
                  <Row gutter={[16, 16]} align="middle" className="py-3">
                    <Col xs={24} sm={6}>
                      {item.image_path && (
                        <img
                          src={item.image_path}
                          alt={item.title}
                          style={{
                            width: '100%',
                            maxWidth: 120,
                            height: 90,
                            objectFit: 'cover',
                            borderRadius: 8,
                          }}
                        />
                      )}
                    </Col>
                    <Col xs={24} sm={12}>
                      <div>
                        <h5 className="mb-2">{item.title || `GPU #${item.gpu_id}`}</h5>
                        <div className="text-muted mb-2">
                          {item.brand && `${item.brand} • `}
                          {item.vram_gb && `${item.vram_gb}GB VRAM • `}
                          {item.condition}
                        </div>
                        <div className="price-text">{formatPrice(item.price || 0)}</div>
                      </div>
                    </Col>
                    <Col xs={24} sm={6}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div>
                          <span className="text-muted">Quantity:</span>
                          <InputNumber
                            min={1}
                            value={item.quantity}
                            onChange={(value) =>
                              value && handleUpdateQuantity(item.id ?? item.gpu_id, value)
                            }
                            style={{ width: '100%', marginTop: 4 }}
                          />
                        </div>
                        <div className="text-end">
                          <div className="price-lg">
                            {formatPrice((item.price || 0) * (item.quantity || 0))}
                          </div>
                          <Button
                            type="text"
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemoveItem(item.id ?? item.gpu_id)}
                            title="Remove from cart"
                          >
                            Remove
                          </Button>
                        </div>
                      </Space>
                    </Col>
                  </Row>
                  <Divider />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Order Summary" className="sticky-summary">
            {summary && (
              <div className="order-summary">
                <Row justify="space-between" className="summary-row">
                  <Col>Subtotal ({summary.totalQuantity} items):</Col>
                  <Col>{formatPrice(summary.subtotal)}</Col>
                </Row>
                {summary.taxAmount > 0 && (
                  <Row justify="space-between" className="summary-row">
                    <Col>VAT (20%):</Col>
                    <Col>{formatPrice(summary.taxAmount)}</Col>
                  </Row>
                )}
                <Row justify="space-between" className="summary-row">
                  <Col>Shipping:</Col>
                  <Col>
                    {summary.shippingAmount === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      formatPrice(summary.shippingAmount)
                    )}
                  </Col>
                </Row>
                <Divider />
                <Row justify="space-between" className="summary-total">
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>
                    <strong>{formatPrice(summary.totalAmount)}</strong>
                  </Col>
                </Row>
                {summary.subtotal > 0 && summary.subtotal < 500 && (
                  <Alert
                    message={`Add ${formatPrice(500 - summary.subtotal)} more for FREE shipping!`}
                    type="info"
                    showIcon
                    className="mt-3"
                  />
                )}
                <div className="checkout-actions mt-4">
                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<CreditCardOutlined />}
                    onClick={handleCheckout}
                    className="mb-3"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button type="default" size="large" block href="/">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <style>{`
        .cart-item:last-child .ant-divider { display: none; }
        .summary-row { margin-bottom: 8px; }
        .summary-total { font-size: 16px; margin-top: 8px; }
        .sticky-summary { position: sticky; top: 20px; }
        .price-text { font-weight: 600; color: #1890ff; }
        .price-lg { font-size: 18px; font-weight: 600; color: #1890ff; }
        .checkout-actions .ant-btn { height: 48px; font-size: 16px; }
        @media (max-width: 768px) { .sticky-summary { position: static; } }
      `}</style>
    </div>
  );
}

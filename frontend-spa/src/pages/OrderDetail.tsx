import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Row, Col, Tag } from 'antd';
import { apiFetch } from '../lib/api';
import { formatPrice } from '../lib/format';

type Order = {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  payment_status: string;
  created_at: string;
};

type OrderItem = {
  id: number;
  gpu_id: number;
  title: string;
  price: number;
  quantity: number;
  subtotal: number;
  image_path?: string;
  brand?: string;
  vram_gb?: number;
  condition?: string;
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await apiFetch(`/api/orders/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
          setItems(data.items || []);
        }
      } finally {
        setLoading(false);
      }
    }
    if (id) loadOrder();
  }, [id]);

  if (loading) return <div className="container py-4">Loading...</div>;
  if (!order) return <div className="container py-4">Order not found</div>;

  return (
    <div className="container py-4">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title={`Order #${order.order_number}`}>
            <p>
              <strong>Status:</strong>{' '}
              <Tag color={order.status === 'confirmed' ? 'green' : 'orange'}>
                {order.status.toUpperCase()}
              </Tag>
            </p>
            <p>
              <strong>Total:</strong> {formatPrice(order.total_amount)}
            </p>
            <p>
              <strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
            </p>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Items">
            {items.map((it) => (
              <Row key={it.id} gutter={[12, 12]} align="middle" className="mb-3">
                <Col xs={6} sm={4} md={3}>
                  {it.image_path && (
                    <img
                      src={it.image_path}
                      alt={it.title}
                      style={{ width: '100%', height: 72, objectFit: 'cover', borderRadius: 6 }}
                    />
                  )}
                </Col>
                <Col xs={12} sm={14} md={16}>
                  <div style={{ fontWeight: 600 }}>{it.title}</div>
                  <div className="text-muted small">
                    {it.brand && `${it.brand} • `}
                    {it.vram_gb ? `${it.vram_gb}GB VRAM • ` : ''}
                    {it.condition || ''}
                  </div>
                </Col>
                <Col xs={6} sm={6} md={5} style={{ textAlign: 'right' }}>
                  <div>
                    {formatPrice(it.price)} × {it.quantity}
                  </div>
                  <div style={{ fontWeight: 600 }}>{formatPrice(it.subtotal)}</div>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
        <Col span={24}>
          <Link to="/orders">Back to Orders</Link>
        </Col>
      </Row>
    </div>
  );
}

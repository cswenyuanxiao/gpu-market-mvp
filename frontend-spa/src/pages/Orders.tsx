import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Tag } from 'antd';
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

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await apiFetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'order_number',
      key: 'order_number',
      render: (_: any, record: Order) => (
        <Link to={`/orders/${record.id}`}>{record.order_number}</Link>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'confirmed' ? 'green' : 'orange'}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount: number) => formatPrice(amount),
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="container py-4">
      <Card title="My Orders">
        <Table columns={columns as any} dataSource={orders} loading={loading} rowKey="id" />
      </Card>
    </div>
  );
}

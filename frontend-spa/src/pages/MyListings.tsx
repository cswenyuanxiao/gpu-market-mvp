import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import GpuCard from '../components/domain/GpuCard';
import { Button, Empty, Popconfirm, Spin } from 'antd';

export default function MyListings() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiFetch('/api/my/gpus');
        const data = await res.json();
        if (mounted) setItems(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const navigate = useNavigate();
  async function onDelete(id: number) {
    if (!confirm('Delete this listing?')) return;
    const r = await apiFetch(`/api/gpus/${id}`, { method: 'DELETE' });
    if (!r.ok) {
      const msg = (await r.json().catch(() => ({})))?.error || 'Delete failed';
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }));
      return;
    }
    window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Deleted', type: 'success' } }));
    setItems((curr) => curr.filter((x) => x.id !== id));
  }

  return (
    <div className="container py-3">
      <h3>My Listings</h3>
      {loading && <Spin className="my-3" />}
      {!loading && items.length === 0 && <Empty description="No items" className="my-3" />}
      <div className="row">
        {items.map((gpu) => (
          <div className="col-md-6" key={gpu.id}>
            <GpuCard gpu={gpu} onDetails={(id) => navigate(`/g/${id}`)} />
            <div className="d-flex gap-2 mb-4">
              <Button size="small" onClick={() => navigate(`/edit/${gpu.id}`)}>Edit</Button>
              <Popconfirm title="Delete this listing?" onConfirm={() => onDelete(gpu.id)}>
                <Button size="small" danger>Delete</Button>
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



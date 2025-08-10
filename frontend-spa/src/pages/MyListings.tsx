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
        if (mounted) setItems(Array.isArray(data) ? data : []);
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
    // optimistic update
    setItems((curr) => curr.filter((x) => x.id !== id));
    try {
      const r = await apiFetch(`/api/gpus/${id}`, { method: 'DELETE' });
      if (!r.ok) {
        const msg = (await r.json().catch(() => ({})))?.error || 'Delete failed';
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }),
        );
        // rollback
        setItems((curr) => (Array.isArray(curr) ? [...curr, { id }] : [{ id }]));
        return;
      }
      window.dispatchEvent(
        new CustomEvent('app-toast', { detail: { text: 'Deleted', type: 'success' } }),
      );
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent('app-toast', { detail: { text: 'Network error', type: 'error' } }),
      );
      // reload listings
      try {
        const res = await apiFetch('/api/my/gpus');
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch {}
    }
  }

  return (
    <div className="container py-3">
      <h3>My Listings</h3>
      {loading && <Spin className="my-3" />}
      {!loading && (Array.isArray(items) ? items.length : 0) === 0 && (
        <div className="my-4 d-flex flex-column align-items-center">
          <Empty description="No items" />
          <div className="mt-3">
            <Button type="primary" onClick={() => navigate('/sell')}>
              Create your first listing
            </Button>
          </div>
        </div>
      )}
      <div className="product-grid">
        {(Array.isArray(items) ? items : []).map((gpu) => (
          <div key={gpu.id}>
            <GpuCard gpu={gpu} onDetails={(id) => navigate(`/g/${id}`)} />
            <div className="d-flex gap-2 mt-2">
              <Button size="small" onClick={() => navigate(`/edit/${gpu.id}`)}>
                Edit
              </Button>
              <Popconfirm title="Delete this listing?" onConfirm={() => onDelete(gpu.id)}>
                <Button size="small" danger>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

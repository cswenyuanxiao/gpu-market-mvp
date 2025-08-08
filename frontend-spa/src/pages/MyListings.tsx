import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { useNavigate } from 'react-router-dom';

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
      {loading && <div>Loading...</div>}
      {!loading && items.length === 0 && <div>No items.</div>}
      <div className="row">
        {items.map((gpu) => (
          <div className="col-md-6" key={gpu.id}>
            <div className="card mb-3">
              <div className="row g-0">
                {gpu.image_path && (
                  <div className="col-4">
                    <img
                      src={gpu.image_path}
                      className="img-fluid rounded-start"
                      style={{ height: 120, objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="col">
                  <div className="card-body">
                    <h5 className="card-title">{gpu.title}</h5>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate(`/edit/${gpu.id}`)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(gpu.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



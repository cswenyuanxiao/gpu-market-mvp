import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Profile() {
  const [me, setMe] = useState<{ id: number; display_name: string; avatar_path?: string } | null>(
    null,
  );
  const [mine, setMine] = useState<any[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const mid = token.split('.')[1] ?? '';
      const payload = mid ? JSON.parse(atob(mid)) : {};
      apiFetch(`/api/users/${payload.id}`).then(async (r) => setMe(await r.json()));
      apiFetch('/api/my/gpus').then(async (r) => setMine(await r.json()));
    } catch {}
  }, []);
  if (!localStorage.getItem('token')) return <div className="container py-3">Please login</div>;
  return (
    <div className="container py-3">
      <h3>My Profile</h3>
      {me && (
        <div className="d-flex align-items-center gap-2 mb-3">
          {me.avatar_path && (
            <img
              src={me.avatar_path}
              className="rounded"
              style={{ width: 64, height: 64, objectFit: 'cover' }}
            />
          )}
          <div>{me.display_name}</div>
          <div className="ms-auto">
            <Link to="/profile/edit" className="btn btn-sm btn-outline-secondary">Edit Profile</Link>
          </div>
        </div>
      )}
      <h5>My Listings</h5>
      <div className="row">
        {mine.map((gpu) => (
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

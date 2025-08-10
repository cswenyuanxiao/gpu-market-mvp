import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { Avatar, Button, Card, Empty, Skeleton } from 'antd';

export default function Profile() {
  const { user, token } = useAuth();
  const [me, setMe] = useState<{ id: number; display_name: string; avatar_path?: string } | null>(
    null,
  );
  const [mine, setMine] = useState<any[]>([]);
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) return;
    (async () => {
      try {
        const r1 = await apiFetch(`/api/users/me`);
        if (r1.ok) setMe(await r1.json());
      } catch {}
      try {
        const r2 = await apiFetch('/api/my/gpus');
        if (r2.ok) {
          const arr = await r2.json();
          setMine(Array.isArray(arr) ? arr : []);
        }
      } catch {
        setMine([]);
      }
    })();
  }, [token]);
  if (!localStorage.getItem('token')) return <div className="container py-3">Please login</div>;
  return (
    <div className="container py-3">
      <h3>My Profile</h3>
      {me && (
        <div className="d-flex align-items-center gap-3 mb-3">
          <Avatar size={64} src={me.avatar_path}>
            {me.display_name?.[0]}
          </Avatar>
          <div className="fw-bold">{me?.display_name || user?.display_name || user?.username || ''}</div>
          <div className="ms-auto">
            <Link to="/profile/edit">
              <Button size="small">Edit Profile</Button>
            </Link>
          </div>
        </div>
      )}
      <h5>My Listings</h5>
      <div className="product-grid">
        {(Array.isArray(mine) ? mine : []).map((gpu) => (
          <div key={gpu.id}>
            <Card
              className="mb-3"
              cover={
                gpu.image_path ? (
                  <img src={gpu.image_path} style={{ height: 160, objectFit: 'cover' }} />
                ) : undefined
              }
            >
              <Card.Meta title={gpu.title} />
            </Card>
          </div>
        ))}
        {(Array.isArray(mine) ? mine.length : 0) === 0 && (
          <Empty description="No listings" className="my-3" />
        )}
      </div>
    </div>
  );
}

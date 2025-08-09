import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { Avatar, Button, Card, Empty, Skeleton } from 'antd';

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
        <div className="d-flex align-items-center gap-3 mb-3">
          <Avatar size={64} src={me.avatar_path}>
            {me.display_name?.[0]}
          </Avatar>
          <div className="fw-bold">{me.display_name}</div>
          <div className="ms-auto">
            <Link to="/profile/edit">
              <Button size="small">Edit Profile</Button>
            </Link>
          </div>
        </div>
      )}
      <h5>My Listings</h5>
      <div className="row">
        {mine.map((gpu) => (
          <div className="col-md-6" key={gpu.id}>
            <Card className="mb-3" cover={gpu.image_path ? <img src={gpu.image_path} style={{ height: 160, objectFit: 'cover' }} /> : undefined}>
              <Card.Meta title={gpu.title} />
            </Card>
          </div>
        ))}
        {mine.length === 0 && <Empty description="No listings" className="my-3" />}
      </div>
    </div>
  );
}

import { FormEvent, useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

export default function ProfileEdit() {
  const [display, setDisplay] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      apiFetch(`/api/users/${payload.id}`).then(async (r) => {
        const u = await r.json();
        setDisplay(u.display_name || '');
        setAvatarPreview(u.avatar_path || null);
      });
    } catch {}
  }, []);

  function onAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.item(0) || null;
    setAvatarFile(f);
    if (f) setAvatarPreview(URL.createObjectURL(f));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (avatarFile) {
        const fd = new FormData();
        fd.append('avatar', avatarFile);
        const r = await apiFetch('/api/users/me/avatar', { method: 'POST', body: fd });
        if (!r.ok) {
          const msg = (await r.json().catch(() => ({})))?.error || 'Upload failed';
          window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }));
          return;
        }
        window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Avatar updated', type: 'success' } }));
      }
      // Display name editing would require backend endpoint; keep read-only for now
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-3" style={{ maxWidth: 520 }}>
      <h3>Edit Profile</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Display Name</label>
          <input className="form-control" value={display} onChange={(e) => setDisplay(e.target.value)} disabled />
          <div className="form-text">Display name editing requires backend endpoint; coming later.</div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="avatar">Avatar</label>
          <input id="avatar" type="file" accept="image/*" className="form-control" onChange={onAvatar} />
        </div>
        {avatarPreview && (
          <div className="mb-3">
            <img src={avatarPreview} style={{ width: 96, height: 96, objectFit: 'cover' }} className="rounded" />
          </div>
        )}
        <button className="btn btn-primary" disabled={loading} type="submit">{loading ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}



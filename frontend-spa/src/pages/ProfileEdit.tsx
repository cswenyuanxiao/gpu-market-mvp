import { FormEvent, useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import FormField from '../components/ui/FormField';
import { Button, Input, Upload, Avatar } from 'antd';
import type { UploadProps } from 'antd';
import { useAuth } from '../store/auth';

export default function ProfileEdit() {
  const [display, setDisplay] = useState('');
  const [initialDisplay, setInitialDisplay] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    apiFetch(`/api/users/me`)
      .then(async (r) => {
        const u = await r.json();
        setDisplay(u.display_name || '');
        setInitialDisplay(u.display_name || '');
        setAvatarPreview(u.avatar_path || null);
      })
      .catch(() => {});
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
      // 1) Update display name if changed
      if ((display || '').trim().length > 0) {
        const r = await apiFetch('/api/users/me', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_name: display.trim() }),
        });
        if (!r.ok) {
          const msg = (await r.json().catch(() => ({})))?.error || 'Update failed';
          window.dispatchEvent(
            new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }),
          );
          return;
        }
        const data = await r.json().catch(() => ({}) as any);
        if (data?.token) {
          login(data.token);
        }
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: 'Profile updated', type: 'success' } }),
        );
        setInitialDisplay(display);
      }
      // 2) Upload avatar if selected
      if (avatarFile) {
        const fd = new FormData();
        fd.append('avatar', avatarFile);
        const r = await apiFetch('/api/users/me/avatar', { method: 'POST', body: fd });
        if (!r.ok) {
          const msg = (await r.json().catch(() => ({})))?.error || 'Upload failed';
          window.dispatchEvent(
            new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }),
          );
          return;
        }
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: 'Avatar updated', type: 'success' } }),
        );
        // Refresh current preview without full reload
        try {
          const me = await (await apiFetch('/api/users/me')).json();
          setAvatarPreview(me.avatar_path || null);
          setAvatarFile(null);
        } catch {}
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-3" style={{ maxWidth: 520 }}>
      <h3>Edit Profile</h3>
      <form onSubmit={onSubmit}>
        <div className="d-flex align-items-center gap-3 mb-3">
          <Avatar size={64} src={avatarPreview || undefined}>
            {display?.[0]}
          </Avatar>
          <Input
            value={display}
            onChange={(e) => setDisplay(e.target.value)}
            style={{ maxWidth: 260 }}
            placeholder="Display name"
          />
        </div>
        <FormField label="Avatar" htmlFor="avatar">
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="form-control"
            onChange={onAvatar}
          />
        </FormField>
        {avatarPreview && (
          <div className="mb-3">
            <img
              src={avatarPreview}
              style={{ width: 96, height: 96, objectFit: 'cover' }}
              className="rounded"
            />
          </div>
        )}
        <Button type="primary" loading={loading} htmlType="submit">
          Save
        </Button>
      </form>
    </div>
  );
}

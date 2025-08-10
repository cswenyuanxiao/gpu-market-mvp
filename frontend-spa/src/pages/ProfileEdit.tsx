import { FormEvent, useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import FormField from '../components/ui/FormField';
import { Button, Input, Upload, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
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
    if (loading) return;
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
        // 告知头部刷新用户信息（首字母/菜单）
        window.dispatchEvent(new Event('profile-updated'));
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
          // 也触发一次全局事件，让其它组件（如头像首字母、下拉菜单标题）刷新
          window.dispatchEvent(new Event('profile-updated'));
        } catch {}
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <div className="form-description">
        <h3>Edit Profile</h3>
        <p>Update your profile information and avatar.</p>
      </div>

      <form onSubmit={onSubmit} className="modern-form">
        <div className="form-section">
          <div className="section-title">Profile Information</div>
          <div className="form-field">
            <FormField label="Display Name" htmlFor="display-name">
              <div className="d-flex align-items-center gap-3">
                <Avatar size={64} src={avatarPreview || undefined} icon={<UserOutlined />}>
                  {display?.[0]}
                </Avatar>
                <Input
                  id="display-name"
                  value={display}
                  onChange={(e) => setDisplay(e.target.value)}
                  placeholder="Enter your display name"
                />
              </div>
            </FormField>
          </div>
        </div>

        <div className="form-section">
          <div className="section-title">Avatar</div>
          <div className="form-field">
            <FormField label="Upload New Avatar" htmlFor="avatar">
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={(file) => {
                  setAvatarFile(file);
                  setAvatarPreview(URL.createObjectURL(file));
                  return false; // Prevent auto upload
                }}
              >
                <Button icon={<UploadOutlined />}>Choose Image</Button>
              </Upload>
            </FormField>
          </div>

          {avatarPreview && (
            <div className="form-field">
              <FormField label="Preview">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={avatarPreview}
                    style={{ width: 96, height: 96, objectFit: 'cover' }}
                    className="rounded-lg border"
                  />
                  <div className="text-sm text-gray-500">
                    <p>New avatar preview</p>
                    <p>Click "Save" to apply changes</p>
                  </div>
                </div>
              </FormField>
            </div>
          )}
        </div>

        <div className="form-actions">
          <Button type="primary" loading={loading} htmlType="submit" className="submit-btn">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

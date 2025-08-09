import { FormEvent, useState } from 'react';
import { apiFetch } from '../lib/api';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import FormField from '../components/ui/FormField';
import { Button } from 'antd';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const { login } = useAuth();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Missing fields', type: 'warning' } }));
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({})))?.error || 'Login failed';
        window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }));
        return;
      }
      const data = await res.json();
      login(data.token || '');
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Logged in', type: 'success' } }));
      const from = location?.state?.from || '/my';
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Login</h3>
      <form onSubmit={onSubmit}>
        <FormField label="Username" htmlFor="login-username">
          <input id="login-username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormField>
        <FormField label="Password" htmlFor="login-password">
          <input id="login-password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormField>
        <Button type="primary" htmlType="submit" block loading={loading}>Sign In</Button>
      </form>
      <div className="mt-3">
        New here? <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
}



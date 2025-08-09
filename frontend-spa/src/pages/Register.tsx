import { FormEvent, useState } from 'react';
import { apiFetch } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../components/ui/FormField';
import { Button } from 'antd';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Missing fields', type: 'warning' } }));
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, display_name: displayName || username }),
      });
      if (res.status !== 201) {
        const msg = (await res.json().catch(() => ({})))?.error || 'Register failed';
        window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }));
        return;
      }
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Registered, please login', type: 'success' } }));
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Register</h3>
      <form onSubmit={onSubmit}>
        <FormField label="Username" htmlFor="reg-username">
          <input id="reg-username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormField>
        <FormField label="Password" htmlFor="reg-password">
          <input id="reg-password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormField>
        <FormField label="Display Name" htmlFor="reg-display">
          <input id="reg-display" className="form-control" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </FormField>
        <Button type="primary" htmlType="submit" block loading={loading}>Create Account</Button>
      </form>
      <div className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}



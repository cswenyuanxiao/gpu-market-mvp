import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import FormField from '../components/ui/FormField';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});
type LoginValues = z.infer<typeof LoginSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(values: LoginValues) {
    setLoading(true);
    try {
      const res = await apiFetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({})))?.error || 'Login failed';
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }),
        );
        return;
      }
      const data = await res.json();
      login(data.token || '');
      window.dispatchEvent(
        new CustomEvent('app-toast', { detail: { text: 'Logged in', type: 'success' } }),
      );
      // Prefer sessionStorage 'from' set by apiFetch on 401/403; fallback to router state
      let from: string | undefined = undefined;
      try {
        from = sessionStorage.getItem('from') || undefined;
        if (from) sessionStorage.removeItem('from');
      } catch {}
      if (!from) from = (location as any)?.state?.from;
      if (!from) from = '/my';
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Username" htmlFor="login-username" error={errors.username?.message}>
          <input id="login-username" className="form-control" {...register('username')} />
        </FormField>
        <FormField label="Password" htmlFor="login-password" error={errors.password?.message}>
          <input
            id="login-password"
            type="password"
            className="form-control"
            {...register('password')}
          />
        </FormField>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Sign In
        </Button>
      </form>
      <div className="mt-3">
        New here? <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import FormField from '../components/ui/FormField';
import { Button, Input } from 'antd';
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
    <div className="form-container">
      <div className="form-description">
        <h3>Welcome Back</h3>
        <p>Sign in to your GPU Market account to continue.</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
        <div className="form-section">
          <div className="form-field">
            <FormField label="Username" htmlFor="login-username" error={errors.username?.message}>
              <Input id="login-username" {...register('username')} />
            </FormField>
          </div>
          <div className="form-field">
            <FormField label="Password" htmlFor="login-password" error={errors.password?.message}>
              <Input.Password id="login-password" {...register('password')} />
            </FormField>
          </div>
        </div>

        <div className="form-actions">
          <Button type="primary" htmlType="submit" loading={loading} className="submit-btn" block>
            Sign In
          </Button>
        </div>
      </form>
      
      <div className="text-center mt-4">
        <p>New here? <Link to="/register">Create an account</Link></p>
      </div>
    </div>
  );
}

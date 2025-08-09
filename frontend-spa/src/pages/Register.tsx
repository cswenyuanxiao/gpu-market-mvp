import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../components/ui/FormField';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const RegisterSchema = z.object({
  username: z.string().min(3, 'At least 3 characters'),
  password: z.string().min(6, 'At least 6 characters'),
  display_name: z.string().optional(),
});
type RegisterValues = z.infer<typeof RegisterSchema>;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register: rfRegister, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
  });

  async function onSubmit(values: RegisterValues) {
    setLoading(true);
    try {
      const res = await apiFetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          display_name: values.display_name || values.username,
        }),
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Username" htmlFor="reg-username" error={errors.username?.message}>
          <input id="reg-username" className="form-control" {...rfRegister('username')} />
        </FormField>
        <FormField label="Password" htmlFor="reg-password" error={errors.password?.message}>
          <input id="reg-password" type="password" className="form-control" {...rfRegister('password')} />
        </FormField>
        <FormField label="Display Name" htmlFor="reg-display" error={errors.display_name?.message}>
          <input id="reg-display" className="form-control" {...rfRegister('display_name')} />
        </FormField>
        <Button type="primary" htmlType="submit" block loading={loading}>Create Account</Button>
      </form>
      <div className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}



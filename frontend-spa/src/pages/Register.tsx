import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../components/ui/FormField';
import { Button, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { username: '', password: '', display_name: '' },
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
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }),
        );
        return;
      }
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: 'Registered, please login', type: 'success' },
        }),
      );
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <div className="form-description">
        <h3>Create Account</h3>
        <p>Join GPU Market to buy and sell graphics cards.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
        <div className="form-section">
          <div className="form-field">
            <FormField label="Username" htmlFor="reg-username" error={errors.username?.message}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="reg-username"
                    placeholder="Enter username"
                    status={errors.username ? 'error' : ''}
                  />
                )}
              />
            </FormField>
          </div>
          <div className="form-field">
            <FormField label="Password" htmlFor="reg-password" error={errors.password?.message}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    id="reg-password"
                    placeholder="Enter password"
                    status={errors.password ? 'error' : ''}
                  />
                )}
              />
            </FormField>
          </div>
          <div className="form-field">
            <FormField
              label="Display Name (Optional)"
              htmlFor="reg-display"
              error={errors.display_name?.message}
            >
              <Controller
                name="display_name"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="reg-display" placeholder="Enter display name" />
                )}
              />
            </FormField>
          </div>
        </div>

        <div className="form-actions">
          <Button type="primary" htmlType="submit" loading={loading} className="submit-btn" block>
            Create Account
          </Button>
        </div>
      </form>

      <div className="text-center mt-4">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Checkbox } from 'antd';
import { Button } from 'antd';
import { apiFetch } from '../lib/api';
import FormField from '../components/ui/FormField';

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Please provide more details'),
  consent: z.boolean().default(false),
});
type Values = z.infer<typeof Schema>;

export default function Contact() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(Schema),
    defaultValues: { consent: false },
  });

  async function onSubmit(values: Values) {
    const r = await apiFetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!r.ok) {
      const msg = (await r.json().catch(() => ({})))?.error || 'Submit failed';
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }));
      return;
    }
    window.dispatchEvent(
      new CustomEvent('app-toast', { detail: { text: 'Message sent', type: 'success' } }),
    );
    reset();
  }

  return (
    <div className="container py-3" style={{ maxWidth: 720 }}>
      <h3>Contact Us</h3>
      <div className="mb-3">
        <p>
          Have a question about a listing, pricing, or trade-ins? Send us a message and we’ll get
          back within 1–2 business days.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Your Name" htmlFor="name" error={errors.name?.message}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input id="name" {...field} />}
          />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input id="email" type="email" {...field} />}
          />
        </FormField>
        <FormField label="Message" htmlFor="message" error={errors.message?.message}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => <Input.TextArea id="message" rows={6} {...field} />}
          />
        </FormField>
        <div className="form-check mb-3">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="consent"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                I agree to the processing of my personal data according to the Privacy Policy.
              </Checkbox>
            )}
          />
        </div>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </form>
    </div>
  );
}

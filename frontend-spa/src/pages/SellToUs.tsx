import { useState, lazy, Suspense } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Switch } from 'antd';
import { Button } from 'antd';
import { apiFetch } from '../lib/api';
import FormField from '../components/ui/FormField';

const ImageUploader = lazy(() => import('../components/ImageUploader')) as any;

const Schema = z.object({
  contact_name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  brand: z.enum(['NVIDIA', 'AMD', 'Intel'], { required_error: 'Brand is required' }),
  model: z.string().min(1, 'Model is required'),
  grade: z.enum(['A', 'B', 'C']).default('B'),
  warranty: z.boolean().default(false),
  accessories: z.string().optional(),
  expected_price: z.coerce.number().min(1, 'Expected price must be ≥ 1'),
  note: z.string().optional(),
});
type Values = z.infer<typeof Schema>;

export default function SellToUs() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(Schema),
    defaultValues: { grade: 'B', warranty: false },
  });

  async function onSubmit(values: Values) {
    if (loading) return;
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      if (typeof v === 'boolean') fd.set(k, v ? 'true' : 'false');
      else fd.set(k, String(v));
    });
    files.slice(0, 10).forEach((f) => fd.append('images', f));
    setLoading(true);
    try {
      const r = await apiFetch('/api/quotes', { method: 'POST', body: fd });
      if (!r.ok) {
        const msg = (await r.json().catch(() => ({})))?.error || 'Submit failed';
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }),
        );
        return;
      }
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: 'Submitted, we will contact you soon', type: 'success' },
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h3>Sell to us</h3>
      <div className="form-description">
        <p>
          Get a no-obligation quote for your GPU. Share basic details and photos. We'll email you
          with an offer and next steps.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
        {/* Personal Information Section */}
        <div className="form-section">
          <h4 className="section-title">Personal Information</h4>
          <div className="form-grid">
            <div className="form-field">
              <FormField
                label="Your Name"
                htmlFor="contact_name"
                error={errors.contact_name?.message}
              >
                <Controller
                  name="contact_name"
                  control={control}
                  render={({ field }) => <Input id="contact_name" {...field} />}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Email" htmlFor="email" error={errors.email?.message}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input id="email" type="email" {...field} />}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Phone" htmlFor="phone" error={errors.phone?.message}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => <Input id="phone" {...field} />}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Product Information Section */}
        <div className="form-section">
          <h4 className="section-title">Product Information</h4>
          <div className="form-grid">
            <div className="form-field">
              <FormField label="Brand" htmlFor="brand" error={errors.brand?.message}>
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Select
                      aria-label="brand"
                      id="brand"
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                      options={[
                        { value: 'NVIDIA', label: 'NVIDIA' },
                        { value: 'AMD', label: 'AMD' },
                        { value: 'Intel', label: 'Intel' },
                      ]}
                    />
                  )}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Model" htmlFor="model" error={errors.model?.message}>
                <Controller
                  name="model"
                  control={control}
                  render={({ field }) => <Input id="model" {...field} />}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Grade" htmlFor="grade" error={errors.grade?.message}>
                <Controller
                  name="grade"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="grade"
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                      options={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B' },
                        { value: 'C', label: 'C' },
                      ]}
                    />
                  )}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Warranty" htmlFor="warranty" error={errors.warranty?.message}>
                <Controller
                  name="warranty"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="warranty"
                      checked={field.value}
                      onChange={(v) => field.onChange(v)}
                    />
                  )}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField
                label="Accessories"
                htmlFor="accessories"
                error={errors.accessories?.message}
              >
                <Controller
                  name="accessories"
                  control={control}
                  render={({ field }) => <Input id="accessories" {...field} />}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Price & Note Section */}
        <div className="form-section">
          <h4 className="section-title">Price & Note</h4>
          <div className="form-grid">
            <div className="form-field">
              <FormField
                label="Expected Price"
                htmlFor="expected_price"
                error={errors.expected_price?.message}
              >
                <Controller
                  name="expected_price"
                  control={control}
                  render={({ field }) => <Input id="expected_price" {...field} />}
                />
              </FormField>
            </div>
            <div className="form-field-full">
              <FormField label="Note" htmlFor="note" error={errors.note?.message}>
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => <Input.TextArea id="note" rows={5} {...field} />}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="form-section">
          <h4 className="section-title">Images</h4>
          <div className="form-field-full">
            <Suspense fallback={null}>
              <ImageUploader onChange={setFiles} />
            </Suspense>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <Button type="primary" htmlType="submit" loading={loading} className="submit-btn">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

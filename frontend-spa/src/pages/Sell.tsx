import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { lazy, Suspense } from 'react';
const ImageUploader = lazy(() => import('../components/ImageUploader')) as any;
import type { LocalImage } from '../components/ImageUploader';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import FormField from '../components/ui/FormField';
import { Input, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'antd';

const allowedBrands = ['NVIDIA', 'AMD'] as const;
const SellSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.coerce.number().min(1, 'Price must be ≥ 1').max(500000, 'Price too large'),
  condition: z.enum(['New', 'Used']),
  brand: z
    .string()
    .optional()
    .refine((v) => !v || (allowedBrands as readonly string[]).includes(v), 'Brand must be NVIDIA or AMD'),
  vram: z.coerce.number().int().min(0, 'VRAM must be ≥ 0').max(64, 'VRAM must be ≤ 64').optional(),
  desc: z.string().max(2000).optional(),
});
type SellValues = z.infer<typeof SellSchema>;

export default function Sell() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, control } = useForm<SellValues>({
    resolver: zodResolver(SellSchema),
    defaultValues: { condition: 'Used' },
  });

  async function onSubmit(values: SellValues) {
    const fd = new FormData();
    fd.set('title', values.title);
    fd.set('price', String(values.price));
    fd.set('condition', values.condition);
    if (values.brand) fd.set('brand', values.brand);
    if (values.vram !== undefined) fd.set('vram_gb', String(values.vram));
    if (values.desc) fd.set('description', values.desc);
    files.slice(0, 10).forEach((f) => fd.append('images', f));
    setLoading(true);
    try {
      const r = await apiFetch('/api/gpus', { method: 'POST', body: fd });
      if (!r.ok) {
        const msg = (await r.json().catch(() => ({})))?.error || 'Create failed';
        window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }));
        return;
      }
      const created = await r.json();
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Created', type: 'success' } }));
      navigate(`/g/${created.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h3>Create Listing</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h4 className="section-title">Basic Information</h4>
          <div className="form-grid">
            <div className="form-field">
              <FormField label="Title" htmlFor="title" error={errors.title?.message} hint="Short, descriptive title">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => <Input id="title" {...field} />}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Price" htmlFor="price" error={errors.price?.message} hint="In USD, ≥ 1">
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => <Input id="price" {...field} />}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Condition" htmlFor="cond" error={errors.condition?.message}>
                <Controller
                  name="condition"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="cond"
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                      options={[{ value: 'New', label: 'New' }, { value: 'Used', label: 'Used' }]}
                    />
                  )}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Brand" htmlFor="brand" error={errors.brand?.message} hint="NVIDIA or AMD">
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="brand"
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                      options={[{ value: 'NVIDIA', label: 'NVIDIA' }, { value: 'AMD', label: 'AMD' }]}
                      allowClear
                    />
                  )}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="VRAM (GB)" htmlFor="vram" error={errors.vram?.message} hint="0 - 64">
                <Controller
                  name="vram"
                  control={control}
                  render={({ field }) => <Input id="vram" {...field} />}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="form-section">
          <h4 className="section-title">Description</h4>
          <div className="form-field-full">
            <FormField label="Description" htmlFor="desc" error={errors.desc?.message} hint="Optional. Up to 2000 characters">
              <Controller
                name="desc"
                control={control}
                render={({ field }) => <Input.TextArea id="desc" rows={6} {...field} />}
              />
            </FormField>
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



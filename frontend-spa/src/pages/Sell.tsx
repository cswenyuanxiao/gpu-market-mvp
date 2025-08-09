import { useState } from 'react';
import { apiFetch } from '../lib/api';
import ImageUploader, { LocalImage } from '../components/ImageUploader';
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
  const { register, handleSubmit, formState: { errors } } = useForm<SellValues>({
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
    <div className="container py-3" style={{ maxWidth: 720 }}>
      <h3>Create Listing</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3">
          <div className="col-md-8">
            <FormField label="Title" htmlFor="title" error={errors.title?.message} hint="Short, descriptive title">
              <Input id="title" {...register('title')} />
            </FormField>
            <FormField label="Description" htmlFor="desc" error={errors.desc?.message} hint="Optional. Up to 2000 characters">
              <Input.TextArea id="desc" rows={6} {...register('desc')} />
            </FormField>
          </div>
          <div className="col-md-4">
            <FormField label="Price" htmlFor="price" error={errors.price?.message} hint="In USD, ≥ 1">
              <Input id="price" {...register('price')} />
            </FormField>
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
            <FormField label="VRAM (GB)" htmlFor="vram" error={errors.vram?.message} hint="0 - 64">
              <Input id="vram" {...register('vram')} />
            </FormField>
          </div>
        </div>
        <div className="mb-3">
          <ImageUploader onChange={setFiles} />
        </div>
        <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
      </form>
    </div>
  );
}



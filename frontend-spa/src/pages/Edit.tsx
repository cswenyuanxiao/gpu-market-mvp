import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { lazy, Suspense } from 'react';
const ImageUploader = lazy(() => import('../components/ImageUploader')) as any;
import { z } from 'zod';
import FormField from '../components/ui/FormField';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, Spin } from 'antd';

const allowedBrands = ['NVIDIA', 'AMD'] as const;
const EditSchema = z.object({
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
type EditValues = z.infer<typeof EditSchema>;

export default function Edit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<EditValues>({
    resolver: zodResolver(EditSchema),
    defaultValues: { condition: 'Used' },
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const r = await apiFetch(`/api/gpus/${id}`);
        const j = await r.json();
        reset({
          title: j.title || '',
          price: j.price ?? '',
          condition: j.condition || 'Used',
          brand: j.brand || '',
          vram: j.vram_gb ?? '',
          desc: j.description || '',
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, reset]);

  async function onSubmit(values: EditValues) {
    if (!id) return;
    const fd = new FormData();
    fd.set('title', values.title);
    fd.set('price', String(values.price));
    fd.set('condition', values.condition);
    if (values.brand) fd.set('brand', values.brand);
    if (values.vram !== undefined) fd.set('vram_gb', String(values.vram));
    if (values.desc) fd.set('description', values.desc);
    files.slice(0, 10).forEach((f) => fd.append('images', f));
    const r = await apiFetch(`/api/gpus/${id}`, { method: 'PUT', body: fd });
    if (!r.ok) {
      const msg = (await r.json().catch(() => ({})))?.error || 'Update failed';
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: msg, type: 'error' } }));
      return;
    }
    window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Updated', type: 'success' } }));
    navigate(`/g/${id}`);
  }

  if (loading) return (
    <div className="container py-3">
      <div className="d-flex justify-content-center">
        <Spin size="large" />
      </div>
    </div>
  );

  return (
    <div className="form-container">
      <div className="form-description">
        <h3>Edit Listing</h3>
        <p>Update your GPU listing information below.</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
        <div className="form-section">
          <div className="section-title">Basic Information</div>
          <div className="form-grid">
            <div className="form-field">
              <FormField label="Title" htmlFor="title" error={errors.title?.message}>
                <Input id="title" {...register('title')} />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Price (£)" htmlFor="price" error={errors.price?.message} hint="≥ 1">
                <Input id="price" type="number" {...register('price')} />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Condition" htmlFor="cond" error={errors.condition?.message}>
                <Controller
                  name="condition"
                  control={control}
                  render={({ field }) => (
                    <Select id="cond" value={field.value} onChange={field.onChange}>
                      <Select.Option value="New">New</Select.Option>
                      <Select.Option value="Used">Used</Select.Option>
                    </Select>
                  )}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="Brand" htmlFor="brand" error={errors.brand?.message} hint="NVIDIA, AMD, or Intel">
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Select id="brand" value={field.value} onChange={field.onChange} allowClear>
                      <Select.Option value="NVIDIA">NVIDIA</Select.Option>
                      <Select.Option value="AMD">AMD</Select.Option>
                      <Select.Option value="Intel">Intel</Select.Option>
                    </Select>
                  )}
                />
              </FormField>
            </div>
            <div className="form-field">
              <FormField label="VRAM (GB)" htmlFor="vram" error={errors.vram?.message} hint="0 - 64">
                <Input id="vram" type="number" {...register('vram')} />
              </FormField>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-title">Description</div>
          <div className="form-field form-field-full">
            <FormField label="Description" htmlFor="desc" error={errors.desc?.message}>
              <Controller
                name="desc"
                control={control}
                render={({ field }) => <Input.TextArea id="desc" rows={6} {...field} />}
              />
            </FormField>
          </div>
        </div>

        <div className="form-section">
          <div className="section-title">Images</div>
          <Suspense fallback={<Spin />}>
            <ImageUploader onChange={setFiles} />
          </Suspense>
        </div>

        <div className="form-actions">
          <Button type="primary" htmlType="submit" className="submit-btn">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}



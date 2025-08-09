import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { lazy, Suspense } from 'react';
const ImageUploader = lazy(() => import('../components/ImageUploader')) as any;
import { z } from 'zod';
import FormField from '../components/ui/FormField';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'antd';

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

  if (loading) return <div className="container py-3">Loading...</div>;

  return (
    <div className="container py-3" style={{ maxWidth: 720 }}>
      <h3>Edit Listing</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3">
          <div className="col-md-8">
            <FormField label="Title" htmlFor="title" error={errors.title?.message}>
              <input id="title" className="form-control" {...register('title')} />
            </FormField>
            <FormField label="Description" htmlFor="desc" error={errors.desc?.message}>
              <textarea id="desc" className="form-control" rows={6} {...register('desc')} />
            </FormField>
          </div>
          <div className="col-md-4">
            <FormField label="Price" htmlFor="price" error={errors.price?.message} hint="In USD, ≥ 1">
              <input id="price" className="form-control" {...register('price')} />
            </FormField>
            <FormField label="Condition" htmlFor="cond" error={errors.condition?.message}>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <select id="cond" className="form-select" value={field.value} onChange={(e) => field.onChange(e.target.value)}>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
                )}
              />
            </FormField>
            <FormField label="Brand" htmlFor="brand" error={errors.brand?.message} hint="NVIDIA or AMD">
              <input id="brand" className="form-control" {...register('brand')} />
            </FormField>
            <FormField label="VRAM (GB)" htmlFor="vram" error={errors.vram?.message} hint="0 - 64">
              <input id="vram" className="form-control" {...register('vram')} />
            </FormField>
          </div>
        </div>
        <div className="mb-3">
          <Suspense fallback={null}>
            <ImageUploader onChange={setFiles} />
          </Suspense>
        </div>
        <Button type="primary" htmlType="submit">Save</Button>
      </form>
    </div>
  );
}



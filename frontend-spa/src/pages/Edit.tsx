import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import ImageUploader from '../components/ImageUploader';
import { z } from 'zod';
import FormField from '../components/ui/FormField';

export default function Edit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'New' | 'Used'>('Used');
  const [brand, setBrand] = useState('');
  const [vram, setVram] = useState('');
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const r = await apiFetch(`/api/gpus/${id}`);
        const j = await r.json();
        setTitle(j.title || '');
        setPrice(String(j.price || ''));
        setCondition(j.condition || 'Used');
        setBrand(j.brand || '');
        setVram(String(j.vram_gb ?? ''));
        setDesc(j.description || '');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id) return;
    const schema = z.object({
      title: z.string().min(1),
      price: z.coerce.number().positive(),
      condition: z.enum(['New', 'Used']),
      brand: z.string().max(50).optional(),
      vram: z.coerce.number().int().nonnegative().max(64).optional(),
      desc: z.string().max(2000).optional(),
    });
    const parsed = schema.safeParse({ title, price, condition, brand, vram, desc });
    if (!parsed.success) {
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Invalid form input', type: 'warning' } }));
      return;
    }
    const fd = new FormData();
    fd.set('title', parsed.data.title);
    fd.set('price', String(parsed.data.price));
    fd.set('condition', parsed.data.condition);
    if (parsed.data.brand) fd.set('brand', parsed.data.brand);
    if (parsed.data.vram !== undefined) fd.set('vram_gb', String(parsed.data.vram));
    if (parsed.data.desc) fd.set('description', parsed.data.desc);
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
      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-8">
            <FormField label="Title" htmlFor="title">
              <input id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormField>
            <FormField label="Description" htmlFor="desc">
              <textarea id="desc" className="form-control" rows={6} value={desc} onChange={(e) => setDesc(e.target.value)} />
            </FormField>
          </div>
          <div className="col-md-4">
            <FormField label="Price" htmlFor="price">
              <input id="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormField>
            <FormField label="Condition" htmlFor="cond">
              <select id="cond" className="form-select" value={condition} onChange={(e) => setCondition(e.target.value as any)}>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </FormField>
            <FormField label="Brand" htmlFor="brand">
              <input id="brand" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </FormField>
            <FormField label="VRAM (GB)" htmlFor="vram">
              <input id="vram" className="form-control" value={vram} onChange={(e) => setVram(e.target.value)} />
            </FormField>
          </div>
        </div>
        <div className="mb-3">
          <ImageUploader onChange={setFiles} />
        </div>
        <button className="btn btn-primary" type="submit">Save</button>
      </form>
    </div>
  );
}



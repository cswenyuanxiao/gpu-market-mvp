import { FormEvent, useState } from 'react';
import { apiFetch } from '../lib/api';
import ImageUploader, { LocalImage } from '../components/ImageUploader';
import { useNavigate } from 'react-router-dom';

export default function Sell() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'New' | 'Used'>('Used');
  const [brand, setBrand] = useState('');
  const [vram, setVram] = useState('');
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title || !price) {
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Missing required fields', type: 'warning' } }));
      return;
    }
    const fd = new FormData();
    fd.set('title', title);
    fd.set('price', price);
    fd.set('condition', condition);
    if (brand) fd.set('brand', brand);
    if (vram) fd.set('vram_gb', vram);
    if (desc) fd.set('description', desc);
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
      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Title</label>
              <input id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="desc">Description</label>
              <textarea id="desc" className="form-control" rows={6} value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label" htmlFor="price">Price</label>
              <input id="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="cond">Condition</label>
              <select id="cond" className="form-select" value={condition} onChange={(e) => setCondition(e.target.value as any)}>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="brand">Brand</label>
              <input id="brand" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="vram">VRAM (GB)</label>
              <input id="vram" className="form-control" value={vram} onChange={(e) => setVram(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <ImageUploader onChange={setFiles} />
        </div>
        <button disabled={loading} className="btn btn-primary" type="submit">{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
}



import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import ImageUploader from '../components/ImageUploader';

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
    const fd = new FormData();
    fd.set('title', title);
    fd.set('price', price);
    fd.set('condition', condition);
    if (brand) fd.set('brand', brand);
    if (vram) fd.set('vram_gb', vram);
    if (desc) fd.set('description', desc);
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
        <button className="btn btn-primary" type="submit">Save</button>
      </form>
    </div>
  );
}



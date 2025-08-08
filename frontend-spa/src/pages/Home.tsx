import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../lib/api';
import { formatDate, formatPrice } from '../lib/format';
import DetailsModal from '../components/DetailsModal';
import SearchFilters from '../components/SearchFilters';
import type { Gpu, SearchQuery } from '../types';

export default function Home() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [items, setItems] = useState<Gpu[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Gpu | null>(null);

  const params = useMemo(() => new URLSearchParams({ q, sort }), [q, sort]);

  function fetchList(extra?: Partial<SearchQuery>) {
    const p = new URLSearchParams(Object.fromEntries(params.entries()));
    if (extra)
      Object.entries(extra).forEach(([k, v]) => {
        if (v === undefined || v === '') p.delete(k);
        else p.set(k, String(v));
      });
    const url = '/api/search?' + p.toString();
    setLoading(true);
    apiFetch(url)
      .then((r) => r.json())
      .then((j) => setItems(j.results || []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchList();
  }, [params]);

  return (
    <div className="container py-3">
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            GPU Market
          </a>
          <div className="d-flex align-items-center gap-2">
            <small className="text-muted">ReqID:</small>
            <span id="reqIdBadge" className="badge text-bg-light">
              -
            </span>
          </div>
        </div>
      </nav>

      <div className="d-flex gap-2 my-3">
        <input
          className="form-control"
          placeholder="Search GPUs..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="form-select"
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
        </select>
        <button className="btn btn-primary" onClick={() => fetchList({ q, sort })}>
          Search
        </button>
      </div>

      <div className="row">
        <div className="col-md-4">
          <h5>Search & Filters</h5>
          <SearchFilters onApply={(patch) => fetchList(patch)} />
        </div>
        <div className="col-md-8">
          {loading && <div className="alert alert-secondary">Loading...</div>}
          <div className="row">
            {items.map((gpu) => (
              <div className="col-md-6" key={gpu.id}>
                <div className="card mb-3">
                  <div className="row g-0">
                    {gpu.image_path && (
                      <div className="col-4">
                        <img
                          src={gpu.image_path}
                          className="img-fluid rounded-start"
                          style={{ height: 160, objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className="col">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="card-title mb-0">{gpu.title}</h5>
                          <div className="d-flex gap-1">
                            {gpu.brand && (
                              <span className="badge bg-info text-dark">{gpu.brand}</span>
                            )}
                            {gpu.vram_gb && gpu.vram_gb > 0 && (
                              <span className="badge bg-warning text-dark">{gpu.vram_gb}GB</span>
                            )}
                            <span
                              className={`badge ${gpu.condition === 'New' ? 'bg-success' : 'bg-secondary'}`}
                            >
                              {gpu.condition}
                            </span>
                          </div>
                        </div>
                        <p className="card-text mt-2">{gpu.description || ''}</p>
                        <p className="card-text d-flex align-items-center gap-2">
                          <small className="text-muted">{formatPrice(gpu.price)}</small>
                          {gpu.seller_avatar && (
                            <img
                              src={gpu.seller_avatar}
                              className="rounded-circle"
                              style={{ width: 24, height: 24, objectFit: 'cover' }}
                            />
                          )}
                          <small className="text-muted">Seller: {gpu.seller_name || ''}</small>
                          {gpu.created_at && (
                            <small className="text-muted ms-auto">
                              Added: {formatDate(gpu.created_at)}
                            </small>
                          )}
                        </p>
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={async () => {
                              const r = await apiFetch(`/api/gpus/${gpu.id}`);
                              const full = await r.json();
                              setSelected(full);
                            }}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DetailsModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

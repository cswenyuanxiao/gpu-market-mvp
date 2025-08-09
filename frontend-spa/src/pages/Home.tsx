import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../lib/api';
import { formatDate, formatPrice } from '../lib/format';
import DetailsModal from '../components/DetailsModal';
import SearchFilters from '../components/SearchFilters';
import Drawer from '../components/ui/Drawer';
import GpuCard from '../components/domain/GpuCard';
import ListToolbar from '../components/domain/ListToolbar';
import type { Gpu, SearchQuery } from '../types';
import Pagination from '../components/Pagination';
import { useQueryState } from '../lib/useQueryState';

export default function Home() {
  const { getAll, setAll } = useQueryState<{ q?: string; sort?: string; page?: string }>();
  const init = getAll();
  const [q, setQ] = useState(init.q || '');
  const [sort, setSort] = useState<'newest' | 'price_asc' | 'price_desc'>((init.sort as any) || 'newest');
  const [items, setItems] = useState<Gpu[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Gpu | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(Number(init.page || '1'));
  const [per] = useState(12);
  const [total, setTotal] = useState(0);

  const params = useMemo(() => new URLSearchParams({ q, sort }), [q, sort]);

  function fetchList(extra?: Partial<SearchQuery>) {
    const p = new URLSearchParams(Object.fromEntries(params.entries()));
    if (extra)
      Object.entries(extra).forEach(([k, v]) => {
        if (v === undefined || v === '') p.delete(k);
        else p.set(k, String(v));
      });
    setAll({ q, sort, page: String(page) } as any);
    p.set('page', String(page));
    p.set('per', String(per));
    const url = '/api/search?' + p.toString();
    setLoading(true);
    apiFetch(url)
      .then((r) => r.json())
      .then((j) => {
        setItems(j.results || []);
        setTotal(j.total || 0);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchList();
  }, [params, page, per]);

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
        <button className="btn btn-outline-secondary d-md-none" onClick={() => setDrawerOpen(true)}>
          Filters
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
                <GpuCard
                  gpu={gpu}
                  onDetails={async (id) => {
                    const r = await apiFetch(`/api/gpus/${id}`);
                    const full = await r.json();
                    setSelected(full);
                  }}
                />
              </div>
            ))}
            {!loading && items.length === 0 && (
              <div className="col-12">
                <div className="alert alert-info">No results. Try adjusting filters.</div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Pagination page={page} per={per} total={total} onChange={(p) => setPage(p)} />
          </div>
        </div>
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <h5 className="mb-3">Filters</h5>
        <SearchFilters
          onApply={(patch) => {
            setDrawerOpen(false);
            fetchList(patch);
          }}
        />
      </Drawer>
      <DetailsModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

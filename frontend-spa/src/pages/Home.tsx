import { useMemo, useState, lazy, Suspense } from 'react';
import { apiFetch } from '../lib/api';
const DetailsModal = lazy(() => import('../components/DetailsModal'));
import SearchFilters from '../components/SearchFilters';
import GpuCard from '../components/domain/GpuCard';
import type { Gpu, SearchQuery } from '../types';
import type { SearchResult } from '../lib/api';
import { useQueryState } from '../lib/useQueryState';
import { useQuery } from '@tanstack/react-query';
import { Input, Select, Button, Drawer as AntDrawer, Pagination as AntPagination, Alert, Spin } from 'antd';

export default function Home() {
  const { getAll, setAll } = useQueryState<SearchQuery & { page?: string; sort?: string }>();
  const init = getAll();
  const [q, setQ] = useState(init.q || '');
  const [sort, setSort] = useState<'newest' | 'price_asc' | 'price_desc'>((init.sort as any) || 'newest');
  const [filters, setFilters] = useState<Partial<SearchQuery>>({
    min: init.min || '',
    max: init.max || '',
    brand: init.brand || '',
    vram_min: init.vram_min || '',
    condition: (init.condition as any) || '',
  });
  const [selected, setSelected] = useState<Gpu | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(Number(init.page || '1'));
  const [per] = useState(12);

  const queryParams = useMemo(() => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (sort) p.set('sort', sort);
    Object.entries(filters).forEach(([k, v]) => {
      if (v) p.set(k, String(v));
    });
    p.set('page', String(page));
    p.set('per', String(per));
    return p;
  }, [q, sort, filters, page, per]);

  const { data, isLoading, isError, refetch, isFetching } = useQuery<SearchResult>({
    queryKey: ['search', q, sort, filters, page, per],
    queryFn: async (): Promise<SearchResult> => {
      setAll({ q, sort, page: String(page), ...filters });
      const res = await apiFetch('/api/search?' + queryParams.toString());
      return res.json();
    },
    placeholderData: (prev) => prev as any,
    staleTime: 30_000,
    retry: 2,
  });

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
        <Input
          placeholder="Search GPUs..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Select
          value={sort}
          style={{ width: 160 }}
          onChange={(v) => setSort(v as any)}
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'price_asc', label: 'Price ↑' },
            { value: 'price_desc', label: 'Price ↓' },
          ]}
        />
        <Button type="primary" onClick={() => refetch()}>Search</Button>
        <Button onClick={() => setDrawerOpen(true)} className="d-md-none">Filters</Button>
      </div>

      <div className="row">
        <div className="col-md-4">
          <h5>Search & Filters</h5>
          <SearchFilters onApply={(patch) => { setFilters((f) => ({ ...f, ...patch })); setPage(1); }} />
        </div>
        <div className="col-md-8">
          {isError && <Alert type="error" message="Failed to load list" showIcon className="mb-2" />}
          {(isLoading || isFetching) && <Spin className="mb-2" />}
          <div className="row">
            {(data?.results || []).map((gpu: Gpu) => (
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
            {!isLoading && (data?.results?.length || 0) === 0 && (
              <div className="col-12">
                <div className="alert alert-info">No results. Try adjusting filters.</div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <AntPagination current={page} pageSize={per} total={data?.total || 0} onChange={(p) => setPage(p)} showSizeChanger={false} />
          </div>
        </div>
      </div>
      <AntDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <h5 className="mb-3">Filters</h5>
        <SearchFilters
          onApply={(patch) => {
            setDrawerOpen(false);
            setFilters((f) => ({ ...f, ...patch }));
            setPage(1);
          }}
        />
      </AntDrawer>
      <Suspense fallback={null}>
        <DetailsModal item={selected} onClose={() => setSelected(null)} />
      </Suspense>
    </div>
  );
}

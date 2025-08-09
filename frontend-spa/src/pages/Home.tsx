import { useMemo, useState, lazy, Suspense, useRef } from 'react';
import { apiFetch } from '../lib/api';
const DetailsModal = lazy(() => import('../components/DetailsModal'));
import SearchFilters from '../components/SearchFilters';
import GpuCard from '../components/domain/GpuCard';
import type { Gpu, SearchQuery } from '../types';
import type { SearchResult } from '../lib/api';
import { useQueryState } from '../lib/useQueryState';
import { useQuery } from '@tanstack/react-query';
import {
  Input,
  Select,
  Button,
  Drawer as AntDrawer,
  Pagination as AntPagination,
  Result,
  Spin,
} from 'antd';

export default function Home() {
  const { getAll, setAll } = useQueryState<SearchQuery & { page?: string; sort?: string }>();
  const init = getAll();
  const isEverything = typeof location !== 'undefined' && location.pathname === '/everything';
  const [q, setQ] = useState(init.q || '');
  type UiSort =
    | 'featured'
    | 'best'
    | 'alpha_asc'
    | 'alpha_desc'
    | 'date_new'
    | 'date_old'
    | 'price_asc'
    | 'price_desc';
  const [uiSort, setUiSort] = useState<UiSort>(
    ((init.sort as any) || (isEverything ? 'price_desc' : 'date_new')) as UiSort,
  );
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
    // map UI sorts to backend sorts (placeholder mapping where unsupported)
    let backendSort: 'newest' | 'price_asc' | 'price_desc' = 'newest';
    if (uiSort === 'price_asc') backendSort = 'price_asc';
    else if (uiSort === 'price_desc') backendSort = 'price_desc';
    else if (
      uiSort === 'date_new' ||
      uiSort === 'featured' ||
      uiSort === 'best' ||
      uiSort === 'alpha_asc' ||
      uiSort === 'alpha_desc' ||
      uiSort === 'date_old'
    )
      backendSort = 'newest';
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    p.set('sort', backendSort);
    Object.entries(filters).forEach(([k, v]) => {
      if (v) p.set(k, String(v));
    });
    p.set('page', String(page));
    p.set('per', String(per));
    return p;
  }, [q, uiSort, filters, page, per]);

  const { data, isLoading, isError, refetch, isFetching } = useQuery<SearchResult>({
    queryKey: ['search', q, uiSort, filters, page, per],
    queryFn: async (): Promise<SearchResult> => {
      setAll({ q, sort: uiSort as any, page: String(page), ...filters });
      const res = await apiFetch('/api/search?' + queryParams.toString());
      return res.json();
    },
    placeholderData: (prev) => prev as any,
    staleTime: 30_000,
    retry: 2,
  });

  // prefetch on hover (once)
  const prefetched = useRef(false);
  function prefetchDetailsChunk() {
    if (prefetched.current) return;
    prefetched.current = true;
    import('../components/DetailsModal');
    import('../components/ImageUploader');
  }

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
        <Input placeholder="Search GPUs..." value={q} onChange={(e) => setQ(e.target.value)} />
        <Select
          value={uiSort}
          style={{ width: 220 }}
          onChange={(v) => setUiSort(v as UiSort)}
          options={[
            { value: 'featured', label: 'Featured' },
            { value: 'best', label: 'Best selling' },
            { value: 'alpha_asc', label: 'Alphabetically, A-Z' },
            { value: 'alpha_desc', label: 'Alphabetically, Z-A' },
            { value: 'price_asc', label: 'Price, low to high' },
            { value: 'price_desc', label: 'Price, high to low' },
            { value: 'date_old', label: 'Date, old to new' },
            { value: 'date_new', label: 'Date, new to old' },
          ]}
        />
        <Button type="primary" onClick={() => refetch()}>
          Search
        </Button>
        <Button onClick={() => setDrawerOpen(true)} className="d-md-none">
          Filters
        </Button>
      </div>

      <div className="row">
        <div className="col-md-4">
          <h5>Search & Filters</h5>
          <SearchFilters
            onApply={(patch) => {
              setFilters((f) => ({ ...f, ...patch }));
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-8">
          {isError && (
            <div className="my-4">
              <Result
                status="error"
                title="Failed to load list"
                subTitle="Please try again later."
              />
            </div>
          )}
          <div className="row" onMouseEnter={prefetchDetailsChunk}>
            {(isLoading || isFetching) && (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="col-md-6 mb-3" key={i}>
                    <div className="card p-3">
                      <Spin />
                    </div>
                  </div>
                ))}
              </>
            )}
            {!isLoading &&
              (data?.results || []).map((gpu: Gpu) => (
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
                <div className="my-4">
                  <Result status="info" title="No results" subTitle="Try adjusting filters." />
                </div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <AntPagination
              current={page}
              pageSize={per}
              total={data?.total || 0}
              onChange={(p) => setPage(p)}
              showSizeChanger={false}
            />
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

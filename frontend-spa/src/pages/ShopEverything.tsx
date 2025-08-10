import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
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
import { useTitle } from '../lib/seo';

export default function ShopEverything() {
  const { getAll, setAll } = useQueryState<SearchQuery & { page?: string; sort?: string }>();
  const init = getAll();
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
    ((init.sort as any) || 'price_desc') as UiSort,
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
  useEffect(() => useTitle('Shop Everything — GPU Market'), []);

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
      try {
        const res = await apiFetch('/api/search?' + queryParams.toString());
        const json = await res.json().catch(() => ({}));
        const results = Array.isArray((json as any).results) ? (json as any).results : [];
        const total = Number((json as any).total || results.length || 0);
        const pageNum = Number((json as any).page || page);
        const perNum = Number((json as any).per || per);
        return { total, page: pageNum, per: perNum, results };
      } catch (e) {
        return { total: 0, page, per, results: [] };
      }
    },
    placeholderData: (prev) => prev as any,
    staleTime: 30_000,
    retry: 2,
  });

  // Scroll to top on page change
  useEffect(() => {
    const el = document.querySelector('.container');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  function prefetchDetailsChunk() {
    import('../components/DetailsModal');
  }

  return (
    <div className="page-shop-everything container py-3">
      <div className="d-flex gap-2 my-3 align-items-center">
        <Input
          id="globalSearchInput"
          placeholder="Search GPUs..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1 }}
        />
        <Select
          value={uiSort}
          style={{ width: 180 }}
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
        <Button
          onClick={() => {
            setUiSort('price_desc');
          }}
        >
          Reset sort
        </Button>
        <Button type="primary" onClick={() => refetch()}>
          Search
        </Button>
        <Button onClick={() => setDrawerOpen(true)}>Filters</Button>
      </div>

      <div className="row">
        <div className="col-12">
          {isError && (
            <div className="my-4">
              <Result
                status="error"
                title="Failed to load list"
                subTitle="Please try again later."
              />
            </div>
          )}
          <div className="product-grid" onMouseEnter={prefetchDetailsChunk}>
            {(isLoading || isFetching) && (
              <>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div className="loading-card" key={i}>
                    <div className="loading-placeholder">
                      <Spin />
                    </div>
                  </div>
                ))}
              </>
            )}
            {!isLoading &&
              (Array.isArray(data?.results) ? (data?.results as Gpu[]) : []).map((gpu: Gpu) => (
                <div key={gpu.id}>
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
                  <Result
                    status="info"
                    title="No results"
                    subTitle={
                      q ||
                      filters.min ||
                      filters.max ||
                      filters.brand ||
                      filters.vram_min ||
                      filters.condition
                        ? 'Try adjusting filters or sorting options.'
                        : 'Browse by series from the top menu or apply filters to get started.'
                    }
                    extra={
                      q ||
                      filters.min ||
                      filters.max ||
                      filters.brand ||
                      filters.vram_min ||
                      filters.condition ? (
                        <div className="d-flex gap-2 justify-content-center">
                          <Button
                            onClick={() => {
                              setQ('');
                              setFilters({
                                min: '',
                                max: '',
                                brand: '',
                                vram_min: '',
                                condition: '',
                              } as any);
                              setPage(1);
                            }}
                          >
                            Clear all filters
                          </Button>
                        </div>
                      ) : (
                        <div className="d-flex gap-2 justify-content-center">
                          <Button href="/?brand=NVIDIA&vram_min=12">NVIDIA 40 Series</Button>
                          <Button href="/?brand=NVIDIA&vram_min=8">NVIDIA 30 Series</Button>
                          <Button href="/?brand=AMD&vram_min=12">AMD 7000 Series</Button>
                          <Button href="/?brand=AMD&vram_min=8">AMD 6000 Series</Button>
                        </div>
                      )
                    }
                  />
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

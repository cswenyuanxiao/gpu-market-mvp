import { useEffect, useState } from 'react';
import { useQueryState } from '../lib/useQueryState';
import type { SearchQuery } from '../types';

type Condition = '' | 'New' | 'Used';

export default function SearchFilters({ onApply }: { onApply: (q: Partial<SearchQuery>) => void }) {
  const { getAll, setAll } = useQueryState<SearchQuery>();
  const init = getAll();
  const [q, setQ] = useState(init.q || '');
  const [min, setMin] = useState(init.min || '');
  const [max, setMax] = useState(init.max || '');
  const [brand, setBrand] = useState(init.brand || '');
  const [vram, setVram] = useState(init.vram_min || '');
  const [condition, setCondition] = useState<Condition>(init.condition || '');

  useEffect(() => {
    // keep URL in sync
    setAll({ q, min, max, brand, vram_min: vram, condition });
  }, [q, min, max, brand, vram, condition, setAll]);

  return (
    <div>
      <input
        className="form-control mb-2"
        placeholder="Search title or description"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="d-flex gap-2 mb-2">
        <input
          className="form-control"
          placeholder="Min price"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Max price"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 mb-2">
        <select className="form-select" value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Any brand</option>
          <option>NVIDIA</option>
          <option>AMD</option>
        </select>
        <select className="form-select" value={vram} onChange={(e) => setVram(e.target.value)}>
          <option value="">Any VRAM</option>
          <option value="4">≥ 4GB</option>
          <option value="6">≥ 6GB</option>
          <option value="8">≥ 8GB</option>
          <option value="12">≥ 12GB</option>
          <option value="16">≥ 16GB</option>
        </select>
      </div>
      <select
        className="form-select mb-2"
        value={condition}
        onChange={(e) => setCondition(e.target.value as Condition)}
      >
        <option value="">Any condition</option>
        <option>New</option>
        <option>Used</option>
      </select>
      <div className="d-flex gap-2 align-items-center">
        <button
          className="btn btn-primary"
          onClick={() => onApply({ q, min, max, brand, vram_min: vram, condition, page: '1' })}
        >
          Search
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setQ('');
            setMin('');
            setMax('');
            setBrand('');
            setVram('');
            setCondition('');
            onApply({ q: '', min: '', max: '', brand: '', vram_min: '', condition: '', page: '1' });
          }}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

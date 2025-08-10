import { useEffect, useState } from 'react';
import { useQueryState } from '../lib/useQueryState';
import type { SearchQuery } from '../types';
import { Input, Select, Button, InputNumber } from 'antd';

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
    <div className="search-filters-container">
      <div className="filter-section">
        <label className="filter-label">Search</label>
        <Input
          placeholder="Search title or description"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="filter-input"
        />
      </div>
      
      <div className="filter-section">
        <label className="filter-label">Price Range</label>
        <div className="price-inputs">
          <InputNumber
            placeholder="Min price"
            value={min === '' ? undefined : Number(min)}
            onChange={(v) => setMin(v == null ? '' : String(v))}
            min={0}
            className="price-input"
          />
          <InputNumber
            placeholder="Max price"
            value={max === '' ? undefined : Number(max)}
            onChange={(v) => setMax(v == null ? '' : String(v))}
            min={0}
            className="price-input"
          />
        </div>
      </div>
      
      <div className="filter-section">
        <label className="filter-label">Brand</label>
        <Select
          value={brand}
          onChange={(v) => setBrand(v)}
          className="filter-select"
          options={[
            { value: '', label: 'Any brand' },
            { value: 'NVIDIA', label: 'NVIDIA' },
            { value: 'AMD', label: 'AMD' },
          ]}
        />
      </div>
      
      <div className="filter-section">
        <label className="filter-label">VRAM</label>
        <Select
          value={vram}
          onChange={(v) => setVram(String(v))}
          className="filter-select"
          options={[
            { value: '', label: 'Any VRAM' },
            { value: '4', label: '≥ 4GB' },
            { value: '6', label: '≥ 6GB' },
            { value: '8', label: '≥ 8GB' },
            { value: '12', label: '≥ 12GB' },
            { value: '16', label: '≥ 16GB' },
          ]}
        />
      </div>
      
      <div className="filter-section">
        <label className="filter-label">Condition</label>
        <Select
          value={condition}
          onChange={(v) => setCondition(v as Condition)}
          className="filter-select"
          options={[
            { value: '', label: 'Any condition' },
            { value: 'New', label: 'New' },
            { value: 'Used', label: 'Used' },
          ]}
        />
      </div>
      
      <div className="filter-actions">
        <Button
          type="primary"
          onClick={() => onApply({ q, min, max, brand, vram_min: vram, condition, page: '1' })}
          className="apply-btn"
        >
          Apply Filters
        </Button>
        <Button
          onClick={() => {
            setQ('');
            setMin('');
            setMax('');
            setBrand('');
            setVram('');
            setCondition('');
            onApply({ q: '', min: '', max: '', brand: '', vram_min: '', condition: '', page: '1' });
          }}
          className="clear-btn"
        >
          Clear all
        </Button>
      </div>
    </div>
  );
}

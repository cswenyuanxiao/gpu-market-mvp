import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { apiFetch } from '../lib/api';
import type { Gpu } from '../types';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: Props) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Gpu[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [visible, setVisible] = useState(open);

  useEffect(() => setVisible(open), [open]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [visible, onClose]);

  // Debounced fetch
  useEffect(() => {
    if (!visible) return;
    const handle = setTimeout(async () => {
      if (!q) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const p = new URLSearchParams({ q, sort: 'newest', page: '1', per: '10' });
        const r = await apiFetch('/api/search?' + p.toString());
        const data = await r.json();
        setResults(data.results || []);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [q, visible]);

  const suggestions = useMemo(() => {
    const titles = results.slice(0, 5).map((g) => g.title);
    const uniq = Array.from(new Set(titles));
    return uniq;
  }, [results]);

  if (!visible) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="position-fixed top-0 start-0 end-0 bottom-0"
      style={{ background: 'rgba(0,0,0,0.35)', zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-white shadow rounded-3"
        style={{ maxWidth: 960, margin: '6rem auto', padding: '12px 12px 0 12px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex align-items-center border rounded px-2" style={{ height: 56 }}>
          <SearchOutlined style={{ fontSize: 18 }} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="form-control border-0 shadow-0"
            style={{ fontSize: 18 }}
          />
          {q && (
            <button className="btn btn-link" onClick={() => setQ('')} aria-label="Clear">
              ×
            </button>
          )}
          <button className="btn btn-link" onClick={onClose} aria-label="Close">
            <CloseOutlined />
          </button>
        </div>

        <div className="row py-3" style={{ minHeight: 180 }}>
          {loading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 160 }}
            >
              <Spin />
            </div>
          )}
          {!loading && (
            <>
              <div className="col-6 border-end">
                <div className="text-muted small mb-2">SUGGESTIONS</div>
                {suggestions.map((s, i) => (
                  <a
                    key={i}
                    href={`/everything?sort=price_desc&q=${encodeURIComponent(s)}`}
                    className="d-block py-2 text-decoration-none"
                  >
                    {s}
                  </a>
                ))}
                {!suggestions.length && <div className="text-muted">Type to see suggestions…</div>}
              </div>
              <div className="col-6">
                <div className="text-muted small mb-2">PRODUCTS</div>
                {results.slice(0, 5).map((g) => (
                  <a
                    key={g.id}
                    href={`/g/${g.id}`}
                    className="d-flex align-items-center gap-2 py-2 text-decoration-none"
                  >
                    <img
                      alt={g.title}
                      src={g.image_path || '/placeholder.webp'}
                      width={48}
                      height={48}
                      style={{ objectFit: 'cover', borderRadius: 4 }}
                    />
                    <span>{g.title}</span>
                  </a>
                ))}
                {!results.length && <div className="text-muted">No products yet.</div>}
              </div>
            </>
          )}
        </div>

        <div className="border-top py-2 d-flex justify-content-between align-items-center">
          <span className="text-muted">Search for “{q || '…'}”</span>
          <a
            className="text-decoration-none"
            href={`/everything?sort=price_desc&q=${encodeURIComponent(q)}`}
          >
            →
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}

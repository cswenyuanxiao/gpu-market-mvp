import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { apiFetch } from '../lib/api';
import type { Gpu } from '../types';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Spin } from 'antd';

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
        const data = await r.json().catch(() => ({}) as any);
        const list = Array.isArray((data as any).results) ? (data as any).results : [];
        setResults(list as any);
      } catch (_) {
        setResults([]);
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
      className="position-fixed start-0 end-0 bottom-0"
      style={{
        background: 'rgba(0,0,0,0.4)',
        zIndex: 1050,
        top: '35px', // Leave space for announcement bar
      }}
      onClick={onClose}
    >
      <div
        className="bg-white search-overlay-panel"
        style={{
          width: 'calc(100% - 48px)',
          margin: '16px auto 0',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
          maxHeight: 'calc(100vh - 80px)',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex align-items-center gap-2">
          <Input
            ref={inputRef as any}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            allowClear
            prefix={<SearchOutlined style={{ color: '#6c757d' }} />}
            size="large"
          />
          <Button type="text" aria-label="Close" onClick={onClose} icon={<CloseOutlined />} />
        </div>

        <div className="py-3" style={{ minHeight: 180 }}>
          {loading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 160 }}
            >
              <Spin />
            </div>
          )}
          {!loading && (
            <div className="search-overlay-columns">
              <div>
                <div
                  className="text-uppercase fw-semibold mb-3"
                  style={{
                    fontSize: 12,
                    color: '#6c757d',
                    letterSpacing: '0.5px',
                  }}
                >
                  SUGGESTIONS
                </div>
                {suggestions.map((s, i) => (
                  <a
                    key={i}
                    href={`/everything?sort=price_desc&q=${encodeURIComponent(s)}`}
                    className="d-block py-2 px-3 mb-1 text-decoration-none rounded"
                    style={{
                      color: '#212529',
                      backgroundColor: 'transparent',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <SearchOutlined style={{ fontSize: 14, marginRight: 8, color: '#6c757d' }} />
                    {s}
                  </a>
                ))}
                {!suggestions.length && (
                  <div className="text-muted px-3 py-4 text-center">Type to see suggestions…</div>
                )}
              </div>
              <div>
                <div
                  className="text-uppercase fw-semibold mb-3"
                  style={{
                    fontSize: 12,
                    color: '#6c757d',
                    letterSpacing: '0.5px',
                  }}
                >
                  PRODUCTS
                </div>
                {results.slice(0, 5).map((g) => (
                  <a
                    key={g.id}
                    href={`/g/${g.id}`}
                    className="d-flex align-items-center gap-3 py-2 px-3 mb-1 text-decoration-none rounded"
                    style={{
                      color: '#212529',
                      backgroundColor: 'transparent',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <img
                      alt={g.title}
                      src={g.image_path || '/placeholder.webp'}
                      width={40}
                      height={40}
                      style={{
                        objectFit: 'cover',
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 14, lineHeight: 1.4 }}>{g.title}</span>
                  </a>
                ))}
                {!results.length && (
                  <div className="text-muted px-3 py-4 text-center">No products found.</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-top pt-3 pb-1">
          <a
            className="btn w-100 text-decoration-none d-flex justify-content-between align-items-center"
            href={`/everything?sort=price_desc&q=${encodeURIComponent(q)}`}
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#495057',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e9ecef';
              e.currentTarget.style.borderColor = '#adb5bd';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.borderColor = '#dee2e6';
            }}
          >
            <span>Search for "{q || 'all products'}"</span>
            <span style={{ fontSize: '16px' }}>→</span>
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}

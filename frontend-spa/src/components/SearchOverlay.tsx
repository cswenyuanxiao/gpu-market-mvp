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
      className="search-overlay-gpused"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1050,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* 精确定位的搜索区域 - 从横幅下方到主内容上方 */}
      <div
        className="search-container-gpused"
        style={{
          position: 'absolute',
          top: '35px', // 横幅高度，按需微调
          left: 0,
          right: 0,
          height: 'auto',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 搜索输入区域 */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '24px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* 主搜索框 */}
          <div style={{ flex: 1, position: 'relative' }}>
            <Input
              ref={inputRef as any}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              allowClear
              prefix={<SearchOutlined style={{ color: '#9ca3af', fontSize: '18px' }} />}
              style={{
                height: '48px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                backgroundColor: '#ffffff',
                boxShadow: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* 关闭按钮 */}
          <Button
            type="text"
            onClick={onClose}
            icon={<CloseOutlined />}
            style={{
              height: '48px',
              width: '48px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          />
        </div>

        {/* 搜索结果区域 */}
        {q && (
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 16px 24px',
              borderTop: '1px solid #f3f4f6',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                paddingTop: '24px',
                minHeight: '200px',
              }}
            >
              {/* 建议搜索 */}
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '16px',
                  }}
                >
                  SUGGESTIONS
                </div>
                {suggestions.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {suggestions.map((suggestion, i) => (
                      <a
                        key={i}
                        href={`/everything?sort=price_desc&q=${encodeURIComponent(suggestion)}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          color: '#374151',
                          backgroundColor: 'transparent',
                          transition: 'background-color 0.15s ease',
                          fontSize: '14px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <SearchOutlined
                          style={{ fontSize: '14px', marginRight: '12px', color: '#9ca3af' }}
                        />
                        {suggestion}
                      </a>
                    ))}
                  </div>
                ) : !loading ? (
                  <div style={{ color: '#9ca3af', fontSize: '14px', padding: '12px' }}>
                    Type to see suggestions...
                  </div>
                ) : null}
              </div>

              {/* 产品结果 */}
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '16px',
                  }}
                >
                  PRODUCTS
                </div>
                {loading ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '120px',
                    }}
                  >
                    <Spin />
                  </div>
                ) : results.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {results.slice(0, 4).map((product) => (
                      <a
                        key={product.id}
                        href={`/g/${product.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          color: '#374151',
                          backgroundColor: 'transparent',
                          transition: 'background-color 0.15s ease',
                          fontSize: '14px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '4px',
                            backgroundColor: '#f3f4f6',
                            marginRight: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: '#9ca3af',
                            flexShrink: 0,
                          }}
                        >
                          GPU
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#111827',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {product.title}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>£{product.price}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: '#9ca3af', fontSize: '14px', padding: '12px' }}>
                    No products found.
                  </div>
                )}
              </div>
            </div>

            {/* 查看全部结果按钮 */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
              <a
                href={`/everything?sort=price_desc&q=${encodeURIComponent(q)}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
              >
                <span>Search for "{q}"</span>
                <span style={{ fontSize: '18px' }}>→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

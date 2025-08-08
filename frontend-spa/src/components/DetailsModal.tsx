import { useEffect, useRef } from 'react';
import type { Gpu } from '../types';

export default function DetailsModal({ item, onClose }: { item: Gpu | null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (item && ref.current) {
      // noop; Bootstrap 展示由父层控制
    }
  }, [item]);
  if (!item) return null;
  return (
    <div className="modal show d-block" tabIndex={-1} ref={ref}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{item.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                {item.image_path && (
                  <img className="img-fluid rounded mb-2" src={item.image_path} />
                )}
                <div className="d-flex flex-wrap gap-2">
                  {item.images?.map((im, idx) => (
                    <img
                      key={idx}
                      src={im.thumb_path || im.image_path}
                      style={{ width: 72, height: 72, objectFit: 'cover' }}
                      className="rounded border"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <p className="mb-2">{item.description || ''}</p>
                <p className="mb-2">
                  <span
                    className={`badge ${item.condition === 'New' ? 'bg-success' : 'bg-secondary'}`}
                  >
                    {item.condition}
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Price:</strong> £{Math.round(item.price).toLocaleString()}
                </p>
                <div className="d-flex align-items-center gap-2 mb-3">
                  {item.seller_avatar && (
                    <img
                      src={item.seller_avatar}
                      className="rounded-circle"
                      style={{ width: 32, height: 32, objectFit: 'cover' }}
                    />
                  )}
                  <span>{item.seller_name || ''}</span>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      const href = `${location.origin}/g/${item.id}`;
                      navigator.clipboard.writeText(href);
                      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Link copied', type: 'success' } }));
                    }}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

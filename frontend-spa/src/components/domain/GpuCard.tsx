import { formatDate, formatPrice } from '../../lib/format';
import type { Gpu } from '../../types';
import LazyImg from '../ui/LazyImg';

export default function GpuCard({ gpu, onDetails }: { gpu: Gpu; onDetails: (id: number) => void }) {
  const isNewlyAdded = (() => {
    if (!gpu.created_at) return false;
    const created = new Date(gpu.created_at).getTime();
    return Date.now() - created < 7 * 24 * 60 * 60 * 1000;
  })();
  return (
    <div className="card card-rounded mb-3">
      <div className="row g-0">
        {gpu.image_path && (
          <div className="col-4">
            <LazyImg
              src={gpu.image_path}
              fallbackSrc={gpu.seller_avatar || (undefined as any)}
              srcSet={`${gpu.image_path} 1x, ${gpu.image_path} 2x`}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="img-fluid rounded-start"
              style={{ height: 160, objectFit: 'cover' }}
            />
          </div>
        )}
        <div className="col">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div className="pe-2 flex-grow-1">
                <h5
                  className="card-title mb-1"
                  title={gpu.title}
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {gpu.title}
                </h5>
                <div className="d-flex gap-1 flex-wrap">
                  {isNewlyAdded && (
                    <span className="badge bg-success-subtle text-success">Just added</span>
                  )}
                  {gpu.brand && <span className="badge bg-info-subtle text-info">{gpu.brand}</span>}
                  {gpu.vram_gb && gpu.vram_gb > 0 && (
                    <span className="badge bg-warning-subtle text-warning">{gpu.vram_gb}GB</span>
                  )}
                  <span
                    className={`badge ${gpu.condition === 'New' ? 'bg-success' : 'bg-secondary'}`}
                  >
                    {gpu.condition}
                  </span>
                </div>
              </div>
              <div className="ms-2 text-end" style={{ minWidth: 90 }}>
                <strong className="text-dark">{formatPrice(gpu.price)}</strong>
              </div>
            </div>
            <p className="card-text mt-2">
              {gpu.description && gpu.description.length > 120 ? (
                <>
                  {gpu.description.slice(0, 120)}...
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = e.currentTarget.previousSibling as any;
                      (e.currentTarget.parentElement as HTMLElement).textContent =
                        gpu.description || '';
                    }}
                    className="ms-1"
                  >
                    Read more
                  </a>
                </>
              ) : (
                gpu.description || ''
              )}
            </p>
            <p className="card-text d-flex align-items-center gap-2">
              {gpu.seller_avatar && (
                <img
                  src={gpu.seller_avatar}
                  className="rounded-circle"
                  style={{ width: 24, height: 24, objectFit: 'cover' }}
                />
              )}
              <small className="text-muted">Seller: {gpu.seller_name || ''}</small>
              {gpu.created_at && (
                <small className="text-muted ms-auto">Added: {formatDate(gpu.created_at)}</small>
              )}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-sm btn-primary" onClick={() => onDetails(gpu.id)}>
                Details
              </button>
              <div className="text-muted small" title={`Seller: ${gpu.seller_name || ''}`}>
                {gpu.seller_name || ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { formatDate, formatPrice } from '../../lib/format';
import type { Gpu } from '../../types';

export default function GpuCard({ gpu, onDetails }: { gpu: Gpu; onDetails: (id: number) => void }) {
  return (
    <div className="card card-rounded mb-3">
      <div className="row g-0">
        {gpu.image_path && (
          <div className="col-4">
            <img
              src={gpu.image_path}
              className="img-fluid rounded-start"
              style={{ height: 160, objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        )}
        <div className="col">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">{gpu.title}</h5>
              <div className="d-flex gap-1">
                {gpu.brand && <span className="badge bg-info text-dark">{gpu.brand}</span>}
                {gpu.vram_gb && gpu.vram_gb > 0 && (
                  <span className="badge bg-warning text-dark">{gpu.vram_gb}GB</span>
                )}
                <span className={`badge ${gpu.condition === 'New' ? 'bg-success' : 'bg-secondary'}`}>
                  {gpu.condition}
                </span>
              </div>
            </div>
            <p className="card-text mt-2">{gpu.description || ''}</p>
            <p className="card-text d-flex align-items-center gap-2">
              <small className="text-muted">{formatPrice(gpu.price)}</small>
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
            <div>
              <button className="btn btn-sm btn-outline-primary" onClick={() => onDetails(gpu.id)}>
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



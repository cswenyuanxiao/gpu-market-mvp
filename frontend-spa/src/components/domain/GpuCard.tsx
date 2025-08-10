import { formatDate, formatPrice } from '../../lib/format';
import type { Gpu } from '../../types';
import LazyImg from '../ui/LazyImg';
import { apiFetch } from '../../lib/api';
import { addToCart } from '../../lib/cart';

export default function GpuCard({ gpu, onDetails }: { gpu: Gpu; onDetails: (id: number) => void }) {
  const isNewlyAdded = (() => {
    if (!gpu.created_at) return false;
    const created = new Date(gpu.created_at).getTime();
    return Date.now() - created < 7 * 24 * 60 * 60 * 1000;
  })();

  return (
    <div
      className="modern-gpu-card"
      onClick={() => onDetails(gpu.id)}
      style={{ cursor: 'pointer' }}
    >
      {/* Product Image */}
      {gpu.image_path && (
        <div className="card-image">
          <LazyImg
            src={gpu.image_path}
            fallbackSrc={gpu.seller_avatar || (undefined as any)}
            srcSet={`${gpu.image_path} 1x, ${gpu.image_path} 2x`}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="product-image"
            alt={gpu.title}
          />
        </div>
      )}

      {/* Card Content */}
      <div className="card-content">
        {/* Header: Title and Price */}
        <div className="card-header">
          <h3 className="product-title" title={gpu.title}>
            {gpu.title}
          </h3>
          <div className="product-price">{formatPrice(gpu.price)}</div>
        </div>

        {/* Status Tags */}
        <div className="status-tags">
          {isNewlyAdded && <span className="tag tag-new">Just added</span>}
          <span className={`tag tag-condition ${gpu.condition === 'New' ? 'tag-new' : 'tag-used'}`}>
            {gpu.condition}
          </span>
          {gpu.brand && <span className="tag tag-brand">{gpu.brand}</span>}
          {gpu.vram_gb && gpu.vram_gb > 0 && <span className="tag tag-vram">{gpu.vram_gb}GB</span>}
        </div>

        {/* Description */}
        <p className="product-description">
          {gpu.description && gpu.description.length > 80 ? (
            <>
              {gpu.description.slice(0, 80)}...
              <button
                className="read-more-btn"
                onClick={(e) => {
                  e.preventDefault();
                  const el = e.currentTarget.previousSibling as any;
                  (e.currentTarget.parentElement as HTMLElement).textContent =
                    gpu.description || '';
                }}
              >
                Read more
              </button>
            </>
          ) : (
            gpu.description || ''
          )}
        </p>

        {/* Footer: Seller Info and Action */}
        <div className="card-footer">
          <div className="seller-info">
            {gpu.seller_avatar && (
              <img
                src={gpu.seller_avatar}
                className="seller-avatar"
                alt={`${gpu.seller_name || 'Seller'} avatar`}
              />
            )}
            <div className="seller-details">
              <span className="seller-name">Seller: {gpu.seller_name || ''}</span>
              {gpu.created_at && (
                <span className="added-date">Added: {formatDate(gpu.created_at)}</span>
              )}
            </div>
          </div>
          <button
            className="details-btn"
            onClick={async (e) => {
              e.stopPropagation();
              try {
                const res = await apiFetch('/api/cart', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ gpu_id: gpu.id, quantity: 1 }),
                });
                if (res.ok) {
                  try {
                    // Try to parse, ignore content
                    await res.json().catch(() => ({}) as any);
                  } catch {}
                  // Keep local cart in sync for offline/SSR scenarios
                  addToCart({
                    gpu_id: gpu.id,
                    quantity: 1,
                    title: gpu.title,
                    price: gpu.price,
                    image_path: gpu.image_path || undefined,
                    brand: gpu.brand as any,
                    vram_gb: gpu.vram_gb as any,
                  });
                  window.dispatchEvent(new CustomEvent('cart-changed', { detail: { delta: 1 } }));
                  window.dispatchEvent(
                    new CustomEvent('app-toast', {
                      detail: { text: 'Added to cart', type: 'success' },
                    }),
                  );
                } else {
                  // Fallback: local cart
                  addToCart({
                    gpu_id: gpu.id,
                    quantity: 1,
                    title: gpu.title,
                    price: gpu.price,
                    image_path: gpu.image_path || undefined,
                    brand: gpu.brand as any,
                    vram_gb: gpu.vram_gb as any,
                  });
                  window.dispatchEvent(new CustomEvent('cart-changed', { detail: { delta: 1 } }));
                  window.dispatchEvent(
                    new CustomEvent('app-toast', {
                      detail: { text: 'Added to cart (offline)', type: 'success' },
                    }),
                  );
                }
              } catch {}
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { Button, Badge, Modal, Avatar, Image } from 'antd';
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
    <Modal open={!!item} onCancel={onClose} onOk={onClose} title={item.title} footer={null} width={900}>
      <div className="row g-3">
        <div className="col-md-6">
          {item.image_path && (
            <Image src={item.image_path} width="100%" style={{ borderRadius: 6, marginBottom: 8 }} />
          )}
          <div className="d-flex flex-wrap gap-2">
            {item.images?.map((im, idx) => (
              <Image
                key={idx}
                src={im.thumb_path || im.image_path}
                width={72}
                height={72}
                style={{ objectFit: 'cover', borderRadius: 4 }}
                preview={false}
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <p className="mb-2">{item.description || ''}</p>
          <p className="mb-2">
            <Badge color={item.condition === 'New' ? 'green' : 'gray'} text={item.condition} />
          </p>
          <p className="mb-2">
            <strong>Price:</strong> £{Math.round(item.price).toLocaleString()}
          </p>
          <div className="d-flex align-items-center gap-2 mb-3">
            {item.seller_avatar ? (
              <Avatar size={32} src={item.seller_avatar} />
            ) : (
              <Avatar size={32}>{(item.seller_name || 'U')[0]}</Avatar>
            )}
            <span>{item.seller_name || ''}</span>
          </div>
          <div className="d-flex gap-2">
            <Button
              onClick={() => {
                const href = `${location.origin}/g/${item.id}`;
                navigator.clipboard.writeText(href);
                window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Link copied', type: 'success' } }));
              }}
            >
              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

import React from 'react';
import { Avatar, Badge, Button, Image, Space, Typography } from 'antd';
import { formatPrice } from '../lib/format';
import type { Gpu } from '../types';

export default function DetailsView({ item }: { item: Gpu }) {
  const [activeSrc, setActiveSrc] = React.useState<string | null>(null);
  React.useEffect(() => {
    const firstImage =
      Array.isArray((item as any)?.images) && (item as any).images.length > 0
        ? (item as any).images[0].image_path
        : null;
    setActiveSrc(item?.image_path || firstImage || null);
  }, [item?.id, item?.image_path, (item as any)?.images]);
  return (
    <div className="row g-3">
      <div className="col-md-6">
        {activeSrc && (
          <Image
            src={activeSrc}
            srcSet={`${activeSrc} 1x, ${activeSrc} 2x`}
            width="100%"
            style={{ borderRadius: 6, marginBottom: 8 }}
          />
        )}
        {Array.isArray((item as any)?.images) && (item as any).images.length > 0 && (
          <div className="d-flex flex-wrap gap-2">
            {(item as any).images.map((im: any, idx: number) => (
              <Image
                key={idx}
                src={im.thumb_path || im.image_path}
                width={72}
                height={72}
                placeholder={
                  <div style={{ width: 72, height: 72, background: '#f0f0f0', borderRadius: 4 }} />
                }
                style={{
                  objectFit: 'cover',
                  borderRadius: 4,
                  cursor: 'pointer',
                  boxShadow: (im.image_path === activeSrc ? '0 0 0 2px #1677ff' : undefined) as any,
                }}
                preview={false}
                onClick={() => setActiveSrc(im.image_path)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            <Badge color={item.condition === 'New' ? 'green' : 'gray'} text={item.condition} />
          </Typography.Paragraph>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {formatPrice(item.price)}
          </Typography.Title>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }}>
            {item.description || ''}
          </Typography.Paragraph>
        </Space>
        <div className="d-flex align-items-center gap-2 mb-3">
          {item.seller_avatar ? (
            <Avatar size={32} src={item.seller_avatar} />
          ) : (
            <Avatar size={32}>{(item.seller_name || 'U')[0]}</Avatar>
          )}
          <span>{item.seller_name || ''}</span>
        </div>
        <div className="d-flex gap-2">
          <CopyLinkButton id={item.id} />
        </div>
      </div>
    </div>
  );
}

function CopyLinkButton({ id }: { id: number }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <Button
      type={copied ? 'primary' : 'default'}
      disabled={copied}
      onClick={async () => {
        const href = `${location.origin}/g/${id}`;
        try {
          await navigator.clipboard.writeText(href);
          setCopied(true);
          window.dispatchEvent(
            new CustomEvent('app-toast', {
              detail: { text: 'Link copied', type: 'success' },
            }),
          );
          setTimeout(() => setCopied(false), 2000);
        } catch (e) {
          window.dispatchEvent(
            new CustomEvent('app-toast', {
              detail: { text: 'Copy failed', type: 'error' },
            }),
          );
        }
      }}
    >
      {copied ? 'Copied!' : 'Copy Link'}
    </Button>
  );
}

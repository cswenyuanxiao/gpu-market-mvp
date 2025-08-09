import { Avatar, Badge, Button, Image, Space, Typography } from 'antd';
import { formatPrice } from '../lib/format';
import type { Gpu } from '../types';

export default function DetailsView({ item }: { item: Gpu }) {
  return (
    <div className="row g-3">
      <div className="col-md-6">
        {item.image_path && (
          <Image
            src={item.image_path}
            srcSet={`${item.image_path} 1x, ${item.image_path} 2x`}
            width="100%"
            style={{ borderRadius: 6, marginBottom: 8 }}
          />
        )}
        <div className="d-flex flex-wrap gap-2">
          {item.images?.map((im: any, idx: number) => (
            <Image
              key={idx}
              src={im.thumb_path || im.image_path}
              width={72}
              height={72}
              placeholder={
                <div style={{ width: 72, height: 72, background: '#f0f0f0', borderRadius: 4 }} />
              }
              style={{ objectFit: 'cover', borderRadius: 4 }}
              preview={false}
            />
          ))}
        </div>
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
          <Button
            onClick={() => {
              const href = `${location.origin}/g/${item.id}`;
              navigator.clipboard.writeText(href);
              window.dispatchEvent(
                new CustomEvent('app-toast', {
                  detail: { text: 'Link copied', type: 'success' },
                }),
              );
            }}
          >
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
}

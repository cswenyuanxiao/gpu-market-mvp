import { Modal } from 'antd';
import type { Gpu } from '../types';
import DetailsView from './DetailsView';

export default function DetailsModal({ item, onClose }: { item: Gpu | null; onClose: () => void }) {
  if (!item) return null;
  return (
    <Modal open={!!item} onCancel={onClose} footer={null} width={900} title={item.title}>
      <DetailsView item={item} />
    </Modal>
  );
}

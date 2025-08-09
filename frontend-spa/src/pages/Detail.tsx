import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import type { Gpu } from '../types';
import { Button } from 'antd';
import DetailsView from '../components/DetailsView';

export default function Detail() {
  const { id } = useParams();
  const [item, setItem] = useState<Gpu | null>(null);
  useEffect(() => {
    if (!id) return;
    (async () => {
      const r = await apiFetch(`/api/gpus/${id}`);
      setItem(await r.json());
    })();
  }, [id]);
  useEffect(() => {
    if (item?.title) document.title = `${item.title} — GPU Market`;
    return () => {
      document.title = 'GPU Market — Buy & Sell Used GPUs';
    };
  }, [item?.title]);
  if (!id) return null;
  return (
    <div className="container py-3">
      <Button type="link" href="/">
        ← Back
      </Button>
      {item && <DetailsView item={item} />}
    </div>
  );
}

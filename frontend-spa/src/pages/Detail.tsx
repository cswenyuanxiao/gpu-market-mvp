import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import type { Gpu } from '../types';
import DetailsModal from '../components/DetailsModal';

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
  if (!id) return null;
  return <DetailsModal item={item} onClose={() => { /* noop for page */ }} />;
}



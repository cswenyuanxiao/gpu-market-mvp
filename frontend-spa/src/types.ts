export type GpuImage = {
  image_path: string;
  thumb_path?: string | null;
  sort_order?: number;
};

export type Gpu = {
  id: number;
  title: string;
  description?: string;
  price: number;
  condition: 'New' | 'Used';
  image_path?: string;
  brand?: string;
  vram_gb?: number;
  seller_name?: string;
  seller_avatar?: string;
  created_at?: string;
  images?: GpuImage[];
  seller_id?: number;
};

export type SearchQuery = {
  q?: string;
  min?: string;
  max?: string;
  brand?: string;
  vram_min?: string;
  condition?: 'New' | 'Used' | '';
  sort?: 'newest' | 'price_asc' | 'price_desc';
  page?: string;
};

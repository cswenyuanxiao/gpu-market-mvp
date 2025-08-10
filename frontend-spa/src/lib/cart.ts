export type LocalCartItem = {
  gpu_id: number;
  quantity: number;
  title?: string;
  price?: number;
  image_path?: string | null;
  brand?: string | null;
  vram_gb?: number | null;
};

const STORAGE_KEY = 'local_cart_v1';

function readCart(): LocalCartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items: LocalCartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function getCartItems(): LocalCartItem[] {
  return readCart();
}

export function getCartCount(): number {
  return readCart().reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
}

export function addToCart(item: LocalCartItem): LocalCartItem[] {
  const items = readCart();
  const idx = items.findIndex((it) => it.gpu_id === item.gpu_id);
  if (idx >= 0) {
    const nextQty = (Number(items[idx].quantity) || 0) + (Number(item.quantity) || 0);
    items[idx] = { ...items[idx], ...item, quantity: nextQty };
  } else {
    items.push({ ...item, quantity: Number(item.quantity) || 1 });
  }
  writeCart(items);
  return items;
}

export function removeFromCart(gpuId: number, qty?: number): LocalCartItem[] {
  const items = readCart();
  const idx = items.findIndex((it) => it.gpu_id === gpuId);
  if (idx >= 0) {
    if (qty === undefined) {
      items.splice(idx, 1);
    } else {
      const nextQty = (Number(items[idx].quantity) || 0) - (Number(qty) || 0);
      if (nextQty <= 0) items.splice(idx, 1);
      else items[idx].quantity = nextQty;
    }
  }
  writeCart(items);
  return items;
}

export function updateCartQuantity(gpuId: number, quantity: number): LocalCartItem[] {
  const items = readCart();
  const idx = items.findIndex((it) => it.gpu_id === gpuId);
  if (idx >= 0) {
    if (quantity <= 0) {
      items.splice(idx, 1);
    } else {
      items[idx].quantity = quantity;
    }
  }
  writeCart(items);
  return items;
}

export function clearCart(): LocalCartItem[] {
  writeCart([]);
  return [];
}

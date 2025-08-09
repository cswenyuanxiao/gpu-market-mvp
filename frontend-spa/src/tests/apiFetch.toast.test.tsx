import { describe, it, expect, vi } from 'vitest';
import { apiFetch } from '../lib/api';

describe('apiFetch toast on network error', () => {
  it('dispatches app-toast', async () => {
    const spy = vi.fn();
    window.addEventListener('app-toast', spy as any, { once: true });
    const original = global.fetch;
    global.fetch = vi.fn(async () => { throw new Error('Network down'); }) as any;
    await expect(apiFetch('/api/anything')).rejects.toThrow();
    global.fetch = original;
    expect(spy).toHaveBeenCalled();
  });
});



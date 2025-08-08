import { describe, it, expect } from 'vitest';
import { formatPrice, formatDate } from '../lib/format';

describe('format helpers', () => {
  it('formats price', () => {
    expect(formatPrice(2000)).toContain('£');
  });
  it('formats date', () => {
    expect(formatDate('2025-01-01T00:00:00.000Z')).toMatch(/\d{1,2}\//);
  });
});

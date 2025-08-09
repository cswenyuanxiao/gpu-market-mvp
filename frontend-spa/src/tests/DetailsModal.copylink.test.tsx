import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailsModal from '../components/DetailsModal';

describe('DetailsModal copy link', () => {
  it('copies link and shows toast', async () => {
    const write = vi.fn().mockResolvedValue(undefined);
    (global as any).navigator = { clipboard: { writeText: write } } as any;
    const item: any = { id: 1, title: 'GPU', price: 100, condition: 'Used' };
    render(<DetailsModal item={item} onClose={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /copy link/i }));
    expect(write).toHaveBeenCalled();
  });
});

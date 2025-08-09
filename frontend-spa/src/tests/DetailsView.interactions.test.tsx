import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailsView from '../components/DetailsView';

const itemBase: any = {
  id: 1,
  title: 'GPU',
  price: 100,
  condition: 'Used',
  seller_name: 'Alice',
};

describe('Details interactions', () => {
  it('switches main image when clicking thumbnail', () => {
    const item = {
      ...itemBase,
      image_path: '/uploads/a.webp',
      images: [
        { image_path: '/uploads/a.webp', thumb_path: '/uploads/a.thumb.webp' },
        { image_path: '/uploads/b.webp', thumb_path: '/uploads/b.thumb.webp' },
      ],
    } as any;
    render(<DetailsView item={item} />);
    const thumbs = screen.getAllByRole('img');
    const bThumb = thumbs.find((n) =>
      (n as HTMLImageElement).src.includes('b.thumb.webp'),
    ) as HTMLElement;
    fireEvent.click(bThumb);
    const mains = screen.getAllByRole('img');
    const main = mains.find((n) =>
      (n as HTMLImageElement).src.includes('/uploads/b.webp'),
    ) as HTMLImageElement;
    expect(main).toBeTruthy();
  });

  it('shows Copied! after copy link click', async () => {
    Object.assign(navigator, { clipboard: { writeText: async () => {} } });
    const item = { ...itemBase, id: 42 } as any;
    render(<DetailsView item={item} />);
    const btn = screen.getByRole('button', { name: /copy link/i });
    fireEvent.click(btn);
    expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument();
  });
});

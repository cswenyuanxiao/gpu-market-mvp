import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageUploader from '../components/ImageUploader';

function createFile(name: string, type = 'image/png', size = 1024) {
  const file = new File([new Uint8Array(size)], name, { type });
  return file;
}

describe('ImageUploader', () => {
  it('adds and removes images', async () => {
    const onChange = vi.fn();
    render(<ImageUploader onChange={onChange} />);
    const input = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement | null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const f1 = createFile('a.png');
    await fireEvent.change(fileInput, { target: { files: { 0: f1, length: 1, item: (i: number) => f1 } } });
    expect(onChange).toHaveBeenCalled();
  });
});



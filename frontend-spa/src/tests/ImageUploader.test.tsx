import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ImageUploader from '../components/ImageUploader';

function createFile(name: string, type = 'image/png', size = 1024) {
  const file = new File([new Uint8Array(size)], name, { type });
  return file;
}

describe('ImageUploader', () => {
  it('adds images and calls onChange', async () => {
    // Mocks for JSDOM environment
    const origCreate = URL.createObjectURL;
    // @ts-expect-error override for test
    URL.createObjectURL = vi.fn(() => 'blob://test') as any;
    const OrigImage = (global as any).Image;
    // @ts-expect-error override for test
    (global as any).Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_v: string) {
        setTimeout(() => this.onload && this.onload(), 0);
      }
    };

    const onChange = vi.fn();
    render(<ImageUploader onChange={onChange} />);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const f1 = createFile('a.png');
    await fireEvent.change(fileInput, { target: { files: { 0: f1, length: 1, item: (_i: number) => f1 } } });
    expect(onChange).toHaveBeenCalled();

    // restore
    URL.createObjectURL = origCreate;
    (global as any).Image = OrigImage;
  });
});



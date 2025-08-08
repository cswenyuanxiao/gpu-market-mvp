import { useEffect, useRef, useState } from 'react';

export type LocalImage = {
  file: File;
  url: string;
  width?: number;
  height?: number;
  tooLarge?: boolean;
};

export default function ImageUploader({
  onChange,
  maxImages = 10,
  maxSizeMb = 5,
  pixelLimit = 25000000,
}: {
  onChange: (files: File[]) => void;
  maxImages?: number;
  maxSizeMb?: number;
  pixelLimit?: number;
}) {
  const [images, setImages] = useState<LocalImage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange(images.map((i) => i.file));
  }, [images, onChange]);

  function openPicker() {
    inputRef.current?.click();
  }

  function revokeAll(urls: string[]) {
    urls.forEach((u) => URL.revokeObjectURL(u));
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const toAdd: LocalImage[] = [];
    const urlsToRevoke: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (!f.type.startsWith('image/')) continue;
        if (images.length + toAdd.length >= maxImages) break;
        const tooBig = f.size > maxSizeMb * 1024 * 1024;
        const url = URL.createObjectURL(f);
        urlsToRevoke.push(url);
        const dims = await readImageDims(url).catch(() => ({ width: 0, height: 0 }));
        const tooLarge = dims.width * dims.height > pixelLimit;
        toAdd.push({ file: f, url, width: dims.width, height: dims.height, tooLarge: tooBig || tooLarge });
      }
      if (toAdd.some((x) => x.tooLarge)) {
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: `Some images exceed limit (${maxSizeMb}MB or ${pixelLimit.toLocaleString()} px)`, type: 'warning' },
          }),
        );
      }
      setImages((curr) => [...curr, ...toAdd]);
    } finally {
      // do not revoke selected urls yet; keep for preview; they will be revoked on remove
    }
  }

  function removeAt(idx: number) {
    const img = images[idx];
    if (img) URL.revokeObjectURL(img.url);
    setImages((curr) => curr.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="d-none"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="d-flex align-items-center gap-2 mb-2">
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={openPicker}>
          Add Images
        </button>
        <small className="text-muted">Up to {maxImages} images, ≤ {maxSizeMb}MB, ≤ {pixelLimit.toLocaleString()} px</small>
      </div>
      <div className="d-flex flex-wrap gap-2">
        {images.map((img, idx) => (
          <div key={idx} className="position-relative">
            <img
              src={img.url}
              width={96}
              height={96}
              style={{ objectFit: 'cover' }}
              loading="lazy"
              className={`rounded border ${img.tooLarge ? 'border-danger' : ''}`}
            />
            <button
              type="button"
              className="btn btn-sm btn-danger position-absolute top-0 end-0"
              onClick={() => removeAt(idx)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function readImageDims(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = url;
  });
}



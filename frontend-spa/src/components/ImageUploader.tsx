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
  const [dragOver, setDragOver] = useState(false);

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
        const f: File = files.item(i)!;
        if (!f) continue;
        if (!f.type.startsWith('image/')) continue;
        if (images.length + toAdd.length >= maxImages) break;
        const tooBig = f.size > maxSizeMb * 1024 * 1024;
        const url = URL.createObjectURL(f as Blob);
        urlsToRevoke.push(url);
        const dims = await readImageDims(url).catch(() => ({ width: 0, height: 0 }));
        const tooLarge = dims.width * dims.height > pixelLimit;
        toAdd.push({ file: f as File, url, width: dims.width, height: dims.height, tooLarge: tooBig || tooLarge });
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

  function move(idx: number, dir: -1 | 1) {
    setImages((curr) => {
      const next = curr.slice();
      const j = idx + dir;
      if (j < 0 || j >= next.length) return curr;
      const t = next[idx];
      next[idx] = next[j];
      next[j] = t;
      return next;
    });
  }

  function setAsCover(idx: number) {
    setImages((curr) => {
      if (idx <= 0) return curr;
      const next = curr.slice();
      const [img] = next.splice(idx, 1);
      next.unshift(img);
      return next;
    });
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(true);
  }

  function onDragLeave() {
    setDragOver(false);
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
      <div
        className={`p-3 border rounded ${dragOver ? 'border-primary bg-light' : 'border-secondary-subtle'}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <div className="text-muted mb-2">Drag & drop images here</div>
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
              <div className="position-absolute top-0 start-0 d-flex gap-1 p-1">
                <span className="badge text-bg-dark">{idx === 0 ? 'Cover' : idx + 1}</span>
              </div>
              <div className="position-absolute bottom-0 start-0 d-flex gap-1 p-1">
                <button type="button" className="btn btn-sm btn-light" onClick={() => move(idx, -1)} disabled={idx === 0} title="Move left">←</button>
                <button type="button" className="btn btn-sm btn-light" onClick={() => move(idx, 1)} disabled={idx === images.length - 1} title="Move right">→</button>
                <button type="button" className="btn btn-sm btn-warning" onClick={() => setAsCover(idx)} disabled={idx === 0} title="Set as cover">★</button>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                onClick={() => removeAt(idx)}
                title="Remove"
              >
                ×
              </button>
          </div>
        ))}
        </div>
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



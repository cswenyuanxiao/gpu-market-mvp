import { useEffect, useRef, useState } from 'react';
import { Button, Upload, Badge } from 'antd';
import { PlusOutlined, DeleteOutlined, StarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

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
      const t = next[idx]!;
      next[idx] = next[j]!;
      next[j] = t;
      return next;
    });
  }

  function setAsCover(idx: number) {
    setImages((curr) => {
      if (idx <= 0) return curr;
      const next = curr.slice();
      const [img] = next.splice(idx, 1);
      if (!img) return curr;
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
      
      <div className="d-flex align-items-center gap-2 mb-3">
        <Button 
          type="default" 
          icon={<PlusOutlined />} 
          onClick={openPicker}
          size="small"
        >
          Add Images
        </Button>
        <small className="text-muted">Up to {maxImages} images, ≤ {maxSizeMb}MB, ≤ {pixelLimit.toLocaleString()} px</small>
      </div>
      
      <div
        className={`p-4 border-2 border-dashed rounded-lg transition-colors ${
          dragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <div className="text-center text-gray-500 mb-3">
          <Upload.Dragger disabled>
            <p className="ant-upload-drag-icon">
              <PlusOutlined />
            </p>
            <p className="ant-upload-text">Drag & drop images here</p>
          </Upload.Dragger>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative group">
              <div className="relative">
                <img
                  src={img.url}
                  width={96}
                  height={96}
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  className={`w-24 h-24 rounded-lg border-2 ${
                    img.tooLarge ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                
                {/* Cover badge */}
                <div className="absolute top-1 left-1">
                  <Badge 
                    count={idx === 0 ? 'Cover' : idx + 1} 
                    style={{ 
                      backgroundColor: idx === 0 ? '#1890ff' : '#666',
                      fontSize: '10px',
                      padding: '2px 6px'
                    }} 
                  />
                </div>
                
                {/* Action buttons */}
                <div className="absolute bottom-1 left-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="text"
                    size="small"
                    icon={<LeftOutlined />}
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    title="Move left"
                    style={{ padding: '2px', minWidth: 'auto' }}
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<RightOutlined />}
                    onClick={() => move(idx, 1)}
                    disabled={idx === images.length - 1}
                    title="Move right"
                    style={{ padding: '2px', minWidth: 'auto' }}
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<StarOutlined />}
                    onClick={() => setAsCover(idx)}
                    disabled={idx === 0}
                    title="Set as cover"
                    style={{ padding: '2px', minWidth: 'auto' }}
                  />
                </div>
                
                {/* Remove button */}
                <Button
                  type="text"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => removeAt(idx)}
                  title="Remove"
                  danger
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ padding: '2px', minWidth: 'auto' }}
                />
              </div>
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



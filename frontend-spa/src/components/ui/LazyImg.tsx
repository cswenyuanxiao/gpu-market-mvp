import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  srcSet?: string;
  sizes?: string;
};

export default function LazyImg({
  src,
  alt = '',
  className,
  style,
  width,
  height,
  srcSet,
  sizes,
}: Props) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e && e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={visible ? src : undefined}
      srcSet={visible ? srcSet : undefined}
      sizes={visible ? sizes : undefined}
      alt={alt}
      className={className}
      style={{ backgroundColor: '#f5f5f5', ...style }}
      width={width as any}
      height={height as any}
      loading="lazy"
    />
  );
}

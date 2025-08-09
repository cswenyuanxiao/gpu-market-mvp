import { ReactNode, useEffect } from 'react';

export default function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return (
    <>
      {open && <div className="drawer-backdrop" onClick={onClose} aria-hidden></div>}
      <div className={`drawer-panel ${open ? 'open' : ''}`} role="dialog" aria-modal="true">
        {children}
      </div>
    </>
  );
}



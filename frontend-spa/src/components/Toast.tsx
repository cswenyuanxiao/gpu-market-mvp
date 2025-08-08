import { useEffect, useState } from 'react';
import type { ToastType } from '../lib/toastBus';

export function useToast() {
  const [messages, set] = useState<Array<{ id: number; text: string; type: ToastType }>>([]);
  function push(text: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
    const id = Date.now();
    set((m) => [...m, { id, text, type }]);
    setTimeout(() => set((m) => m.filter((x) => x.id !== id)), 3000);
  }
  const api = { push };
  return { api, messages };
}

export function ToastContainer({
  messages,
}: {
  messages: Array<{ id: number; text: string; type: string }>;
}) {
  useEffect(() => {}, [messages]);
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
      {messages.map((m) => (
        <div
          key={m.id}
          className={`toast show align-items-center text-bg-${m.type === 'error' ? 'danger' : m.type === 'warning' ? 'warning' : m.type === 'success' ? 'success' : 'primary'} mb-2`}
        >
          <div className="d-flex">
            <div className="toast-body">{m.text}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}

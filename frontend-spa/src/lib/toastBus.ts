export type ToastType = 'info' | 'success' | 'error' | 'warning';

export function emitToast(text: string, type: ToastType = 'info') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('app-toast', { detail: { text, type } }));
  }
}

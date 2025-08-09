export function useTitle(title: string, fallback = 'GPU Market — Buy & Sell Used GPUs') {
  if (typeof document === 'undefined') return;
  const prev = document.title;
  document.title = title || fallback;
  return () => {
    document.title = prev || fallback;
  };
}

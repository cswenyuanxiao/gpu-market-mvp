import { useCallback, useMemo } from 'react';

export function useQueryState<T extends Record<string, string | undefined>>() {
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const getAll = useCallback(() => Object.fromEntries(params.entries()) as T, [params]);
  const setAll = useCallback((patch: Partial<T>) => {
    const p = new URLSearchParams(location.search);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === '') p.delete(k);
      else p.set(k, String(v));
    });
    history.replaceState({}, '', `?${p.toString()}`);
  }, []);
  return { getAll, setAll };
}

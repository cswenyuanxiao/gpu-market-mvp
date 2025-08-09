// Vite injects import.meta.env in runtime; fallback to window.location.origin
export const API_BASE: string =
  (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_API_BASE) ||
  window.location.origin;

export async function apiFetch(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  const token = localStorage.getItem('token');
  if (token && !headers.has('Authorization')) headers.set('Authorization', 'Bearer ' + token);
  let res: Response;
  try {
    res = await fetch(input.startsWith('http') ? input : API_BASE + input, { ...init, headers });
  } catch (e: any) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: e?.message || 'Network error', type: 'error' },
        }),
      );
    }
    throw e;
  }
  const reqId = res.headers.get('x-request-id');
  if (reqId) {
    const badge = document.getElementById('reqIdBadge');
    if (badge) badge.textContent = reqId;
  }
  if ((res.status === 401 || res.status === 403) && token) {
    localStorage.removeItem('token');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: 'Session expired, please log in again', type: 'warning' },
        }),
      );
      // Redirect to login if current page is protected
      try {
        const { pathname, search } = window.location;
        const protectedMatchers: Array<(p: string) => boolean> = [
          (p) => p === '/sell',
          (p) => p.startsWith('/edit/'),
          (p) => p === '/my',
          (p) => p === '/profile/edit',
        ];
        const isProtected = protectedMatchers.some((m) => m(pathname));
        const isLogin = pathname === '/login';
        if (isProtected && !isLogin) {
          try {
            sessionStorage.setItem('from', pathname + (search || ''));
          } catch {}
          window.location.href = '/login';
        }
      } catch {}
    }
  }
  return res;
}

export type SearchResult = {
  total: number;
  page: number;
  per: number;
  results: Array<any>;
};

const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/DetailsModal-BAOxp9XG.js',
      'assets/react-query-BGeIQRPr.js',
      'assets/react-CTDr35rJ.js',
      'assets/DetailsView-DUPy39j2.js',
      'assets/antd-n40S5sxn.js',
      'assets/ImageUploader-DWnjEkzb.js',
      'assets/Profile-CkBj_o5F.js',
      'assets/Login-qu9XJ7-5.js',
      'assets/FormField-iyrhpl26.js',
      'assets/zod-SQF3v9p3.js',
      'assets/Register-G7iru1yt.js',
      'assets/MyListings-H1ILjpc9.js',
      'assets/Detail-CKZNOBjW.js',
      'assets/Sell-BmERp_b2.js',
      'assets/Edit-Chn7W6El.js',
      'assets/NotFound-Bq8LLBzl.js',
      'assets/ProfileEdit-BY09EPPb.js',
      'assets/SellToUs-f7XL_Qfl.js',
      'assets/Contact-qAX44P1o.js',
    ]),
) => i.map((i) => d[i]);
import { j as e, u as ue, Q as me, a as he } from './react-query-BGeIQRPr.js';
import {
  c as xe,
  r as o,
  u as fe,
  e as K,
  g as pe,
  R as Z,
  L as u,
  f as je,
  h as b,
  B as ve,
} from './react-CTDr35rJ.js';
import {
  I as X,
  T as V,
  S as C,
  B as j,
  R as z,
  a as ge,
  P as ye,
  D as ee,
  s as be,
  b as we,
  M as _e,
} from './antd-n40S5sxn.js';
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) l(n);
  new MutationObserver((n) => {
    for (const a of n)
      if (a.type === 'childList')
        for (const i of a.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && l(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(n) {
    const a = {};
    return (
      n.integrity && (a.integrity = n.integrity),
      n.referrerPolicy && (a.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (a.credentials = 'include')
        : n.crossOrigin === 'anonymous'
          ? (a.credentials = 'omit')
          : (a.credentials = 'same-origin'),
      a
    );
  }
  function l(n) {
    if (n.ep) return;
    n.ep = !0;
    const a = r(n);
    fetch(n.href, a);
  }
})();
var R = {},
  G = xe;
((R.createRoot = G.createRoot), (R.hydrateRoot = G.hydrateRoot));
const Se = 'modulepreload',
  Ne = function (t) {
    return '/' + t;
  },
  U = {},
  _ = function (s, r, l) {
    let n = Promise.resolve();
    if (r && r.length > 0) {
      document.getElementsByTagName('link');
      const a = document.querySelector('meta[property=csp-nonce]'),
        i = (a == null ? void 0 : a.nonce) || (a == null ? void 0 : a.getAttribute('nonce'));
      n = Promise.all(
        r.map((h) => {
          if (((h = Ne(h)), h in U)) return;
          U[h] = !0;
          const c = h.endsWith('.css'),
            g = c ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${h}"]${g}`)) return;
          const d = document.createElement('link');
          if (
            ((d.rel = c ? 'stylesheet' : Se),
            c || ((d.as = 'script'), (d.crossOrigin = '')),
            (d.href = h),
            i && d.setAttribute('nonce', i),
            document.head.appendChild(d),
            c)
          )
            return new Promise((m, y) => {
              (d.addEventListener('load', m),
                d.addEventListener('error', () => y(new Error(`Unable to preload CSS for ${h}`))));
            });
        }),
      );
    }
    return n
      .then(() => s())
      .catch((a) => {
        const i = new Event('vite:preloadError', { cancelable: !0 });
        if (((i.payload = a), window.dispatchEvent(i), !i.defaultPrevented)) throw a;
      });
  };
var Y, J;
const Ee =
  (typeof import.meta < 'u' &&
    ((J = (Y = import.meta) == null ? void 0 : Y.env) == null ? void 0 : J.VITE_API_BASE)) ||
  window.location.origin;
async function F(t, s = {}) {
  const r = new Headers(s.headers || {}),
    l = localStorage.getItem('token');
  l && !r.has('Authorization') && r.set('Authorization', 'Bearer ' + l);
  let n;
  try {
    n = await fetch(t.startsWith('http') ? t : Ee + t, { ...s, headers: r });
  } catch (i) {
    throw (
      typeof window < 'u' &&
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: (i == null ? void 0 : i.message) || 'Network error', type: 'error' },
          }),
        ),
      i
    );
  }
  const a = n.headers.get('x-request-id');
  if (a) {
    const i = document.getElementById('reqIdBadge');
    i && (i.textContent = a);
  }
  if (
    (n.status === 401 || n.status === 403) &&
    l &&
    (localStorage.removeItem('token'), typeof window < 'u')
  ) {
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: { text: 'Session expired, please log in again', type: 'warning' },
      }),
    );
    try {
      const { pathname: i, search: h } = window.location;
      if (
        [
          (m) => m === '/sell',
          (m) => m.startsWith('/edit/'),
          (m) => m === '/my',
          (m) => m === '/profile/edit',
        ].some((m) => m(i)) &&
        !(i === '/login')
      ) {
        try {
          sessionStorage.setItem('from', i + (h || ''));
        } catch {}
        window.location.href = '/login';
      }
    } catch {}
  }
  return n;
}
function te() {
  const t = o.useMemo(() => new URLSearchParams(location.search), [location.search]),
    s = o.useCallback(() => Object.fromEntries(t.entries()), [t]),
    r = o.useCallback((l) => {
      const n = new URLSearchParams(location.search);
      (Object.entries(l).forEach(([a, i]) => {
        i === void 0 || i === '' ? n.delete(a) : n.set(a, String(i));
      }),
        history.replaceState({}, '', `?${n.toString()}`));
    }, []);
  return { getAll: s, setAll: r };
}
function B({ onApply: t }) {
  const { getAll: s, setAll: r } = te(),
    l = s(),
    [n, a] = o.useState(l.q || ''),
    [i, h] = o.useState(l.min || ''),
    [c, g] = o.useState(l.max || ''),
    [d, m] = o.useState(l.brand || ''),
    [y, v] = o.useState(l.vram_min || ''),
    [f, S] = o.useState(l.condition || '');
  return (
    o.useEffect(() => {
      r({ q: n, min: i, max: c, brand: d, vram_min: y, condition: f });
    }, [n, i, c, d, y, f, r]),
    e.jsxs('div', {
      children: [
        e.jsx(X, {
          className: 'mb-2',
          placeholder: 'Search title or description',
          value: n,
          onChange: (p) => a(p.target.value),
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(V, {
              placeholder: 'Min price',
              value: i === '' ? void 0 : Number(i),
              onChange: (p) => h(p == null ? '' : String(p)),
              min: 0,
              style: { width: '100%' },
            }),
            e.jsx(V, {
              placeholder: 'Max price',
              value: c === '' ? void 0 : Number(c),
              onChange: (p) => g(p == null ? '' : String(p)),
              min: 0,
              style: { width: '100%' },
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(C, {
              value: d,
              style: { minWidth: 140 },
              onChange: (p) => m(p),
              options: [
                { value: '', label: 'Any brand' },
                { value: 'NVIDIA', label: 'NVIDIA' },
                { value: 'AMD', label: 'AMD' },
              ],
            }),
            e.jsx(C, {
              value: y,
              style: { minWidth: 140 },
              onChange: (p) => v(String(p)),
              options: [
                { value: '', label: 'Any VRAM' },
                { value: '4', label: '≥ 4GB' },
                { value: '6', label: '≥ 6GB' },
                { value: '8', label: '≥ 8GB' },
                { value: '12', label: '≥ 12GB' },
                { value: '16', label: '≥ 16GB' },
              ],
            }),
          ],
        }),
        e.jsx(C, {
          className: 'mb-2',
          value: f,
          onChange: (p) => S(p),
          options: [
            { value: '', label: 'Any condition' },
            { value: 'New', label: 'New' },
            { value: 'Used', label: 'Used' },
          ],
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 align-items-center',
          children: [
            e.jsx(j, {
              type: 'primary',
              onClick: () =>
                t({ q: n, min: i, max: c, brand: d, vram_min: y, condition: f, page: '1' }),
              children: 'Search',
            }),
            e.jsx(j, {
              onClick: () => {
                (a(''),
                  h(''),
                  g(''),
                  m(''),
                  v(''),
                  S(''),
                  t({
                    q: '',
                    min: '',
                    max: '',
                    brand: '',
                    vram_min: '',
                    condition: '',
                    page: '1',
                  }));
              },
              children: 'Clear all',
            }),
          ],
        }),
      ],
    })
  );
}
const Ae = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});
function Ie(t) {
  const s = Number(t || 0);
  return Ae.format(s);
}
function Ce(t) {
  if (!t) return '';
  try {
    return new Date(t).toLocaleDateString();
  } catch {
    return '';
  }
}
function Pe({
  src: t,
  alt: s = '',
  className: r,
  style: l,
  width: n,
  height: a,
  srcSet: i,
  sizes: h,
  fallbackSrc: c,
}) {
  const g = o.useRef(null),
    [d, m] = o.useState(!1),
    [y, v] = o.useState(!1);
  o.useEffect(() => {
    const S = g.current;
    if (!S) return;
    if (!('IntersectionObserver' in window)) {
      m(!0);
      return;
    }
    const p = new IntersectionObserver(
      (D) => {
        const N = D[0];
        N && N.isIntersecting && (m(!0), p.disconnect());
      },
      { rootMargin: '200px' },
    );
    return (p.observe(S), () => p.disconnect());
  }, []);
  const f = y && c ? c : t;
  return e.jsx('img', {
    ref: g,
    src: d ? f : void 0,
    srcSet: d ? i : void 0,
    sizes: d ? h : void 0,
    alt: s,
    className: r,
    style: { backgroundColor: '#f5f5f5', ...l },
    width: n,
    height: a,
    loading: 'lazy',
    onError: () => v(!0),
  });
}
function De({ gpu: t, onDetails: s }) {
  const r = (() => {
    if (!t.created_at) return !1;
    const l = new Date(t.created_at).getTime();
    return Date.now() - l < 6048e5;
  })();
  return e.jsx('div', {
    className: 'card card-rounded mb-3',
    children: e.jsxs('div', {
      className: 'row g-0',
      children: [
        t.image_path &&
          e.jsx('div', {
            className: 'col-4',
            children: e.jsx(Pe, {
              src: t.image_path,
              fallbackSrc: t.seller_avatar || void 0,
              srcSet: `${t.image_path} 1x, ${t.image_path} 2x`,
              sizes: '(max-width: 768px) 100vw, 33vw',
              className: 'img-fluid rounded-start',
              style: { height: 160, objectFit: 'cover' },
            }),
          }),
        e.jsx('div', {
          className: 'col',
          children: e.jsxs('div', {
            className: 'card-body',
            children: [
              e.jsxs('div', {
                className: 'd-flex justify-content-between align-items-start',
                children: [
                  e.jsxs('div', {
                    className: 'pe-2 flex-grow-1',
                    children: [
                      e.jsx('h5', {
                        className: 'card-title mb-1',
                        title: t.title,
                        style: {
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        },
                        children: t.title,
                      }),
                      e.jsxs('div', {
                        className: 'd-flex gap-1 flex-wrap',
                        children: [
                          r &&
                            e.jsx('span', {
                              className: 'badge bg-success-subtle text-success',
                              children: 'Just added',
                            }),
                          t.brand &&
                            e.jsx('span', {
                              className: 'badge bg-info-subtle text-info',
                              children: t.brand,
                            }),
                          t.vram_gb &&
                            t.vram_gb > 0 &&
                            e.jsxs('span', {
                              className: 'badge bg-warning-subtle text-warning',
                              children: [t.vram_gb, 'GB'],
                            }),
                          e.jsx('span', {
                            className: `badge ${t.condition === 'New' ? 'bg-success' : 'bg-secondary'}`,
                            children: t.condition,
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsx('div', {
                    className: 'ms-2 text-end',
                    style: { minWidth: 90 },
                    children: e.jsx('strong', { className: 'text-dark', children: Ie(t.price) }),
                  }),
                ],
              }),
              e.jsx('p', {
                className: 'card-text mt-2',
                children:
                  t.description && t.description.length > 120
                    ? e.jsxs(e.Fragment, {
                        children: [
                          t.description.slice(0, 120),
                          '...',
                          e.jsx('a', {
                            href: '#',
                            onClick: (l) => {
                              (l.preventDefault(),
                                l.currentTarget.previousSibling,
                                (l.currentTarget.parentElement.textContent = t.description || ''));
                            },
                            className: 'ms-1',
                            children: 'Read more',
                          }),
                        ],
                      })
                    : t.description || '',
              }),
              e.jsxs('p', {
                className: 'card-text d-flex align-items-center gap-2',
                children: [
                  t.seller_avatar &&
                    e.jsx('img', {
                      src: t.seller_avatar,
                      className: 'rounded-circle',
                      style: { width: 24, height: 24, objectFit: 'cover' },
                    }),
                  e.jsxs('small', {
                    className: 'text-muted',
                    children: ['Seller: ', t.seller_name || ''],
                  }),
                  t.created_at &&
                    e.jsxs('small', {
                      className: 'text-muted ms-auto',
                      children: ['Added: ', Ce(t.created_at)],
                    }),
                ],
              }),
              e.jsxs('div', {
                className: 'd-flex justify-content-between align-items-center',
                children: [
                  e.jsx('button', {
                    className: 'btn btn-sm btn-primary',
                    onClick: () => s(t.id),
                    children: 'Details',
                  }),
                  e.jsx('div', {
                    className: 'text-muted small',
                    title: `Seller: ${t.seller_name || ''}`,
                    children: t.seller_name || '',
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function ke(t, s = 'GPU Market — Buy & Sell Used GPUs') {
  if (typeof document > 'u') return;
  const r = document.title;
  return (
    (document.title = t),
    () => {
      document.title = r || s;
    }
  );
}
const Le = o.lazy(() =>
  _(() => import('./DetailsModal-BAOxp9XG.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
);
function W() {
  var M;
  const { getAll: t, setAll: s } = te(),
    r = t(),
    l = typeof location < 'u' && location.pathname === '/everything',
    [n, a] = o.useState(r.q || ''),
    [i, h] = o.useState(r.sort || (l ? 'price_desc' : 'date_new')),
    [c, g] = o.useState({
      min: r.min || '',
      max: r.max || '',
      brand: r.brand || '',
      vram_min: r.vram_min || '',
      condition: r.condition || '',
    }),
    [d, m] = o.useState(null),
    [y, v] = o.useState(!1),
    [f, S] = o.useState(Number(r.page || '1')),
    [p] = o.useState(12);
  o.useEffect(() => ke('GPU Market — Shop Graphics Cards'), []);
  const D = o.useMemo(() => {
      let x = 'newest';
      i === 'price_asc'
        ? (x = 'price_asc')
        : i === 'price_desc'
          ? (x = 'price_desc')
          : (i === 'date_new' ||
              i === 'featured' ||
              i === 'best' ||
              i === 'alpha_asc' ||
              i === 'alpha_desc' ||
              i === 'date_old') &&
            (x = 'newest');
      const w = new URLSearchParams();
      return (
        n && w.set('q', n),
        w.set('sort', x),
        Object.entries(c).forEach(([O, A]) => {
          A && w.set(O, String(A));
        }),
        w.set('page', String(f)),
        w.set('per', String(p)),
        w
      );
    }, [n, i, c, f, p]),
    {
      data: N,
      isLoading: k,
      isError: le,
      refetch: oe,
      isFetching: ce,
    } = ue({
      queryKey: ['search', n, i, c, f, p],
      queryFn: async () => (
        s({ q: n, sort: i, page: String(f), ...c }),
        (await F('/api/search?' + D.toString())).json()
      ),
      placeholderData: (x) => x,
      staleTime: 3e4,
      retry: 2,
    });
  o.useEffect(() => {
    const x = document.querySelector('.container');
    x && x.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [f]);
  const T = o.useRef(!1);
  function de() {
    T.current ||
      ((T.current = !0),
      _(() => import('./DetailsModal-BAOxp9XG.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
      _(() => import('./ImageUploader-DWnjEkzb.js'), __vite__mapDeps([5, 1, 2])));
  }
  return e.jsxs('div', {
    className: 'container py-3',
    children: [
      e.jsx('nav', {
        className: 'navbar navbar-light',
        children: e.jsxs('div', {
          className: 'container-fluid',
          children: [
            e.jsx('a', { className: 'navbar-brand', href: '#', children: 'GPU Market' }),
            e.jsxs('div', {
              className: 'd-flex align-items-center gap-2',
              children: [
                e.jsx('small', { className: 'text-muted', children: 'ReqID:' }),
                e.jsx('span', {
                  id: 'reqIdBadge',
                  className: 'badge text-bg-light',
                  children: '-',
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsxs('div', {
        className: 'd-flex gap-2 my-3',
        children: [
          e.jsx(X, { placeholder: 'Search GPUs...', value: n, onChange: (x) => a(x.target.value) }),
          e.jsx(C, {
            value: i,
            style: { width: 220 },
            onChange: (x) => h(x),
            options: [
              { value: 'featured', label: 'Featured' },
              { value: 'best', label: 'Best selling' },
              { value: 'alpha_asc', label: 'Alphabetically, A-Z' },
              { value: 'alpha_desc', label: 'Alphabetically, Z-A' },
              { value: 'price_asc', label: 'Price, low to high' },
              { value: 'price_desc', label: 'Price, high to low' },
              { value: 'date_old', label: 'Date, old to new' },
              { value: 'date_new', label: 'Date, new to old' },
            ],
          }),
          e.jsx(j, {
            onClick: () => {
              h(l ? 'price_desc' : 'date_new');
            },
            children: 'Reset sort',
          }),
          e.jsx(j, { type: 'primary', onClick: () => oe(), children: 'Search' }),
          e.jsx(j, { onClick: () => v(!0), className: 'd-md-none', children: 'Filters' }),
        ],
      }),
      e.jsxs('div', {
        className: 'row',
        children: [
          e.jsxs('div', {
            className: 'col-md-4',
            children: [
              e.jsx('h5', { children: 'Search & Filters' }),
              e.jsx(B, {
                onApply: (x) => {
                  (g((w) => ({ ...w, ...x })), S(1));
                },
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'col-md-8',
            children: [
              le &&
                e.jsx('div', {
                  className: 'my-4',
                  children: e.jsx(z, {
                    status: 'error',
                    title: 'Failed to load list',
                    subTitle: 'Please try again later.',
                  }),
                }),
              e.jsxs('div', {
                className: 'row',
                onMouseEnter: de,
                children: [
                  (k || ce) &&
                    e.jsx(e.Fragment, {
                      children: Array.from({ length: 4 }).map((x, w) =>
                        e.jsx(
                          'div',
                          {
                            className: 'col-md-6 mb-3',
                            children: e.jsx('div', {
                              className: 'card p-3',
                              children: e.jsx(ge, {}),
                            }),
                          },
                          w,
                        ),
                      ),
                    }),
                  !k &&
                    ((N == null ? void 0 : N.results) || []).map((x) =>
                      e.jsx(
                        'div',
                        {
                          className: 'col-md-6',
                          children: e.jsx(De, {
                            gpu: x,
                            onDetails: async (w) => {
                              const A = await (await F(`/api/gpus/${w}`)).json();
                              m(A);
                            },
                          }),
                        },
                        x.id,
                      ),
                    ),
                  !k &&
                    (((M = N == null ? void 0 : N.results) == null ? void 0 : M.length) || 0) ===
                      0 &&
                    e.jsx('div', {
                      className: 'col-12',
                      children: e.jsx('div', {
                        className: 'my-4',
                        children: e.jsx(z, {
                          status: 'info',
                          title: 'No results',
                          subTitle:
                            n || c.min || c.max || c.brand || c.vram_min || c.condition
                              ? 'Try adjusting filters or sorting options.'
                              : 'Browse by series from the top menu or apply filters to get started.',
                          extra:
                            n || c.min || c.max || c.brand || c.vram_min || c.condition
                              ? e.jsx('div', {
                                  className: 'd-flex gap-2 justify-content-center',
                                  children: e.jsx(j, {
                                    onClick: () => {
                                      (a(''),
                                        g({
                                          min: '',
                                          max: '',
                                          brand: '',
                                          vram_min: '',
                                          condition: '',
                                        }),
                                        S(1));
                                    },
                                    children: 'Clear all filters',
                                  }),
                                })
                              : e.jsxs('div', {
                                  className: 'd-flex gap-2 justify-content-center',
                                  children: [
                                    e.jsx(j, {
                                      href: '/?brand=NVIDIA&vram_min=12',
                                      children: 'NVIDIA 40 Series',
                                    }),
                                    e.jsx(j, {
                                      href: '/?brand=NVIDIA&vram_min=8',
                                      children: 'NVIDIA 30 Series',
                                    }),
                                    e.jsx(j, {
                                      href: '/?brand=AMD&vram_min=12',
                                      children: 'AMD 7000 Series',
                                    }),
                                    e.jsx(j, {
                                      href: '/?brand=AMD&vram_min=8',
                                      children: 'AMD 6000 Series',
                                    }),
                                  ],
                                }),
                        }),
                      }),
                    }),
                ],
              }),
              e.jsx('div', {
                className: 'd-flex justify-content-center mt-3',
                children: e.jsx(ye, {
                  current: f,
                  pageSize: p,
                  total: (N == null ? void 0 : N.total) || 0,
                  onChange: (x) => S(x),
                  showSizeChanger: !1,
                }),
              }),
            ],
          }),
        ],
      }),
      e.jsxs(ee, {
        open: y,
        onClose: () => v(!1),
        children: [
          e.jsx('h5', { className: 'mb-3', children: 'Filters' }),
          e.jsx(B, {
            onApply: (x) => {
              (v(!1), g((w) => ({ ...w, ...x })), S(1));
            },
          }),
        ],
      }),
      e.jsx(o.Suspense, {
        fallback: null,
        children: e.jsx(Le, { item: d, onClose: () => m(null) }),
      }),
    ],
  });
}
function Re() {
  const [t, s] = be.useMessage();
  function r(n, a = 'info') {
    const i =
      a === 'error' ? 'error' : a === 'warning' ? 'warning' : a === 'success' ? 'success' : 'info';
    t.open({ type: i, content: n, duration: 3 });
  }
  return { api: { push: r }, messages: s };
}
function Te({ messages: t }) {
  return e.jsx(e.Fragment, { children: t });
}
function I({ children: t }) {
  const s = fe(),
    r = K();
  return (
    o.useEffect(() => {
      if (!localStorage.getItem('token')) {
        const n = r.pathname + (r.search || '');
        s('/login', { replace: !0, state: { from: n } });
      }
    }, [s, r]),
    e.jsx(e.Fragment, { children: t })
  );
}
var Me = {};
const $ = (t) => {
    let s;
    const r = new Set(),
      l = (d, m) => {
        const y = typeof d == 'function' ? d(s) : d;
        if (!Object.is(y, s)) {
          const v = s;
          ((s = (m ?? (typeof y != 'object' || y === null)) ? y : Object.assign({}, s, y)),
            r.forEach((f) => f(s, v)));
        }
      },
      n = () => s,
      c = {
        setState: l,
        getState: n,
        getInitialState: () => g,
        subscribe: (d) => (r.add(d), () => r.delete(d)),
        destroy: () => {
          ((Me ? 'production' : void 0) !== 'production' &&
            console.warn(
              '[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.',
            ),
            r.clear());
        },
      },
      g = (s = t(l, n, c));
    return c;
  },
  Oe = (t) => (t ? $(t) : $);
var se = { exports: {} },
  re = {},
  ne = { exports: {} },
  ie = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var E = o;
function Ve(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var ze = typeof Object.is == 'function' ? Object.is : Ve,
  Ge = E.useState,
  Ue = E.useEffect,
  Fe = E.useLayoutEffect,
  Be = E.useDebugValue;
function We(t, s) {
  var r = s(),
    l = Ge({ inst: { value: r, getSnapshot: s } }),
    n = l[0].inst,
    a = l[1];
  return (
    Fe(
      function () {
        ((n.value = r), (n.getSnapshot = s), L(n) && a({ inst: n }));
      },
      [t, r, s],
    ),
    Ue(
      function () {
        return (
          L(n) && a({ inst: n }),
          t(function () {
            L(n) && a({ inst: n });
          })
        );
      },
      [t],
    ),
    Be(r),
    r
  );
}
function L(t) {
  var s = t.getSnapshot;
  t = t.value;
  try {
    var r = s();
    return !ze(t, r);
  } catch {
    return !0;
  }
}
function $e(t, s) {
  return s();
}
var qe =
  typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'
    ? $e
    : We;
ie.useSyncExternalStore = E.useSyncExternalStore !== void 0 ? E.useSyncExternalStore : qe;
ne.exports = ie;
var Qe = ne.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var P = o,
  He = Qe;
function Ye(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var Je = typeof Object.is == 'function' ? Object.is : Ye,
  Ke = He.useSyncExternalStore,
  Ze = P.useRef,
  Xe = P.useEffect,
  et = P.useMemo,
  tt = P.useDebugValue;
re.useSyncExternalStoreWithSelector = function (t, s, r, l, n) {
  var a = Ze(null);
  if (a.current === null) {
    var i = { hasValue: !1, value: null };
    a.current = i;
  } else i = a.current;
  a = et(
    function () {
      function c(v) {
        if (!g) {
          if (((g = !0), (d = v), (v = l(v)), n !== void 0 && i.hasValue)) {
            var f = i.value;
            if (n(f, v)) return (m = f);
          }
          return (m = v);
        }
        if (((f = m), Je(d, v))) return f;
        var S = l(v);
        return n !== void 0 && n(f, S) ? ((d = v), f) : ((d = v), (m = S));
      }
      var g = !1,
        d,
        m,
        y = r === void 0 ? null : r;
      return [
        function () {
          return c(s());
        },
        y === null
          ? void 0
          : function () {
              return c(y());
            },
      ];
    },
    [s, r, l, n],
  );
  var h = Ke(t, a[0], a[1]);
  return (
    Xe(
      function () {
        ((i.hasValue = !0), (i.value = h));
      },
      [h],
    ),
    tt(h),
    h
  );
};
se.exports = re;
var st = se.exports;
const rt = pe(st);
var ae = {};
const { useDebugValue: nt } = Z,
  { useSyncExternalStoreWithSelector: it } = rt;
let q = !1;
const at = (t) => t;
function lt(t, s = at, r) {
  (ae ? 'production' : void 0) !== 'production' &&
    r &&
    !q &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (q = !0));
  const l = it(t.subscribe, t.getState, t.getServerState || t.getInitialState, s, r);
  return (nt(l), l);
}
const Q = (t) => {
    (ae ? 'production' : void 0) !== 'production' &&
      typeof t != 'function' &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const s = typeof t == 'function' ? Oe(t) : t,
      r = (l, n) => lt(s, l, n);
    return (Object.assign(r, s), r);
  },
  ot = (t) => (t ? Q(t) : Q);
function H(t) {
  try {
    const s = t.split('.')[1] || '';
    return JSON.parse(atob(s));
  } catch {
    return null;
  }
}
const ct = ot((t) => ({
  token: null,
  user: null,
  init: () => {
    const s = localStorage.getItem('token');
    if (s) {
      const r = H(s);
      t({
        token: s,
        user: r ? { id: r.id, username: r.username, display_name: r.display_name } : null,
      });
    }
  },
  login: (s) => {
    localStorage.setItem('token', s);
    const r = H(s);
    t({
      token: s,
      user: r ? { id: r.id, username: r.username, display_name: r.display_name } : null,
    });
  },
  logout: () => {
    (localStorage.removeItem('token'), t({ token: null, user: null }));
  },
}));
function dt(t, s) {
  return `scroll:${t}${s}`;
}
function ut() {
  const t = K();
  o.useEffect(() => {
    const s = dt(t.pathname, t.search),
      r = sessionStorage.getItem(s);
    if (r) {
      const a = parseInt(r, 10);
      Number.isNaN(a) || setTimeout(() => window.scrollTo(0, a), 0);
    } else window.scrollTo(0, 0);
    function l() {
      sessionStorage.setItem(s, String(window.scrollY));
    }
    window.addEventListener('beforeunload', l);
    const n = () => {
      const a = sessionStorage.getItem(s),
        i = a ? parseInt(a, 10) : 0;
      setTimeout(() => window.scrollTo(0, Number.isNaN(i) ? 0 : i), 0);
    };
    return (
      window.addEventListener('popstate', n),
      () => {
        (window.removeEventListener('beforeunload', l),
          window.removeEventListener('popstate', n),
          l());
      }
    );
  }, [t.pathname, t.search]);
}
function mt() {
  return (
    (document.title = 'About Us — GPU Market'),
    e.jsxs('div', {
      className: 'container py-4',
      style: { maxWidth: 900 },
      children: [
        e.jsx('h1', { children: 'About GPU Market' }),
        e.jsx('p', {
          children:
            'GPU Market is a trusted marketplace for buying and selling new and used graphics cards. Our mission is to help enthusiasts and professionals upgrade affordably and safely.',
        }),
        e.jsx('h2', { children: 'What We Do' }),
        e.jsxs('ul', {
          children: [
            e.jsx('li', { children: 'Curated listings with clear specs and conditions' }),
            e.jsx('li', { children: 'Photo guidelines and safe upload processing' }),
            e.jsx('li', { children: 'Community-first pricing and transparency' }),
          ],
        }),
        e.jsx('h2', { children: 'Why Choose Us' }),
        e.jsxs('ul', {
          children: [
            e.jsx('li', { children: 'Verified profiles and seller reviews (coming soon)' }),
            e.jsx('li', { children: 'Clear return/issue-handling policy on disputes' }),
            e.jsx('li', { children: 'Responsive customer support' }),
          ],
        }),
        e.jsx('h2', { children: 'Contact' }),
        e.jsxs('p', {
          children: [
            'Questions? ',
            e.jsx('a', { href: '/contact', children: 'Contact us' }),
            '. For trade-ins, see',
            ' ',
            e.jsx('a', { href: '/sell-to-us', children: 'Sell to us' }),
            '.',
          ],
        }),
      ],
    })
  );
}
function ht() {
  return (
    (document.title = 'Privacy Policy — GPU Market'),
    e.jsxs('div', {
      className: 'container py-4',
      style: { maxWidth: 900 },
      children: [
        e.jsx('h1', { children: 'Privacy Policy' }),
        e.jsx('p', { children: 'Last updated: 2025-08-09' }),
        e.jsx('h2', { children: '1. Information We Collect' }),
        e.jsxs('ul', {
          children: [
            e.jsx('li', { children: 'Account data: username, display name' }),
            e.jsx('li', { children: 'Content: listing info and uploaded images' }),
            e.jsx('li', { children: 'Technical data: request ID, logs, metrics' }),
          ],
        }),
        e.jsx('h2', { children: '2. How We Use Information' }),
        e.jsxs('ul', {
          children: [
            e.jsx('li', { children: 'Provide and improve services' }),
            e.jsx('li', { children: 'Fraud prevention and security' }),
            e.jsx('li', { children: 'Legal compliance' }),
          ],
        }),
        e.jsx('h2', { children: '3. Cookies & Analytics' }),
        e.jsx('p', {
          children: 'We may use essential cookies and aggregated metrics to improve reliability.',
        }),
        e.jsx('h2', { children: '4. Data Sharing' }),
        e.jsx('p', {
          children:
            'No selling of personal data. We share with service providers as needed to operate.',
        }),
        e.jsx('h2', { children: '5. Data Retention' }),
        e.jsx('p', {
          children: 'We retain data for as long as necessary for the purposes described.',
        }),
        e.jsx('h2', { children: '6. Your Rights' }),
        e.jsx('p', {
          children: 'Contact us to access, correct, or delete your personal data where applicable.',
        }),
        e.jsx('h2', { children: '7. Contact' }),
        e.jsxs('p', {
          children: ['Questions? ', e.jsx('a', { href: '/contact', children: 'Contact us' }), '.'],
        }),
      ],
    })
  );
}
function xt() {
  return (
    (document.title = 'Terms of Service — GPU Market'),
    e.jsxs('div', {
      className: 'container py-4',
      style: { maxWidth: 900 },
      children: [
        e.jsx('h1', { children: 'Terms of Service' }),
        e.jsx('p', { children: 'Last updated: 2025-08-09' }),
        e.jsx('h2', { children: '1. Acceptance of Terms' }),
        e.jsx('p', { children: 'By accessing or using GPU Market, you agree to these Terms.' }),
        e.jsx('h2', { children: '2. Accounts & Security' }),
        e.jsxs('ul', {
          children: [
            e.jsx('li', { children: 'You must provide accurate registration information.' }),
            e.jsx('li', { children: 'You are responsible for safeguarding your credentials.' }),
          ],
        }),
        e.jsx('h2', { children: '3. Listings & Transactions' }),
        e.jsxs('ul', {
          children: [
            e.jsx('li', { children: 'All listings must be accurate and lawful.' }),
            e.jsx('li', { children: 'We may remove listings that violate policies.' }),
          ],
        }),
        e.jsx('h2', { children: '4. Prohibited Activities' }),
        e.jsxs('ul', {
          children: [
            e.jsx('li', { children: 'Fraud, counterfeit items, or misuse of the platform' }),
            e.jsx('li', { children: 'Upload of harmful code or illegal content' }),
          ],
        }),
        e.jsx('h2', { children: '5. Intellectual Property' }),
        e.jsx('p', { children: 'All site content is owned by GPU Market or its licensors.' }),
        e.jsx('h2', { children: '6. Disclaimers & Liability' }),
        e.jsx('p', {
          children: 'Service provided “as is”; we are not liable for indirect damages.',
        }),
        e.jsx('h2', { children: '7. Changes' }),
        e.jsx('p', {
          children: 'We may update these Terms; continued use constitutes acceptance.',
        }),
        e.jsx('h2', { children: '8. Contact' }),
        e.jsxs('p', {
          children: [
            'For questions about these Terms, please ',
            e.jsx('a', { href: '/contact', children: 'contact us' }),
            '.',
          ],
        }),
      ],
    })
  );
}
function ft() {
  return e.jsxs('div', {
    className: 'container py-5 text-center',
    children: [
      e.jsx('h1', { className: 'display-5', children: '500' }),
      e.jsx('p', { className: 'lead', children: 'Unexpected server error.' }),
      e.jsx('a', { className: 'btn btn-primary', href: '/', children: 'Go Home' }),
    ],
  });
}
const pt = o.lazy(() => _(() => import('./Profile-CkBj_o5F.js'), __vite__mapDeps([6, 1, 2, 4]))),
  jt = o.lazy(() => _(() => import('./Login-qu9XJ7-5.js'), __vite__mapDeps([7, 1, 2, 8, 9, 4]))),
  vt = o.lazy(() =>
    _(() => import('./Register-G7iru1yt.js'), __vite__mapDeps([10, 1, 2, 8, 9, 4])),
  ),
  gt = o.lazy(() => _(() => import('./MyListings-H1ILjpc9.js'), __vite__mapDeps([11, 1, 2, 4]))),
  yt = o.lazy(() => _(() => import('./Detail-CKZNOBjW.js'), __vite__mapDeps([12, 1, 2, 3, 4]))),
  bt = o.lazy(() => _(() => import('./Sell-BmERp_b2.js'), __vite__mapDeps([13, 1, 2, 8, 9, 4]))),
  wt = o.lazy(() => _(() => import('./Edit-Chn7W6El.js'), __vite__mapDeps([14, 1, 2, 8, 9, 4]))),
  _t = o.lazy(() => _(() => import('./NotFound-Bq8LLBzl.js'), __vite__mapDeps([15, 1, 2, 4]))),
  St = o.lazy(() =>
    _(() => import('./ProfileEdit-BY09EPPb.js'), __vite__mapDeps([16, 1, 2, 8, 4])),
  ),
  Nt = o.lazy(() =>
    _(() => import('./SellToUs-f7XL_Qfl.js'), __vite__mapDeps([17, 1, 2, 9, 8, 4])),
  ),
  Et = o.lazy(() => _(() => import('./Contact-qAX44P1o.js'), __vite__mapDeps([18, 1, 2, 9, 8, 4])));
function At() {
  const { api: t, messages: s } = Re(),
    { user: r, init: l, logout: n } = ct();
  (ut(),
    o.useEffect(() => {
      l();
      function c(g) {
        const d = g.detail || {};
        t.push(d.text || '', d.type || 'info');
      }
      return (
        window.addEventListener('app-toast', c),
        () => window.removeEventListener('app-toast', c)
      );
    }, []));
  const [a, i] = o.useState(!1),
    h = e.jsx(_e, {
      items: [
        {
          key: 'nvidia-40',
          label: e.jsx(u, { to: '/?brand=NVIDIA&vram_min=12', children: 'NVIDIA 40 Series' }),
        },
        {
          key: 'nvidia-30',
          label: e.jsx(u, { to: '/?brand=NVIDIA&vram_min=8', children: 'NVIDIA 30 Series' }),
        },
        {
          key: 'amd-7000',
          label: e.jsx(u, { to: '/?brand=AMD&vram_min=12', children: 'AMD 7000 Series' }),
        },
        {
          key: 'amd-6000',
          label: e.jsx(u, { to: '/?brand=AMD&vram_min=8', children: 'AMD 6000 Series' }),
        },
      ],
    });
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('nav', {
        className: 'navbar navbar-expand navbar-light bg-light',
        children: e.jsxs('div', {
          className: 'container-fluid',
          children: [
            e.jsx(u, { to: '/', className: 'navbar-brand', children: 'GPU Market' }),
            e.jsxs('div', {
              className: 'ms-auto d-none d-md-flex gap-2',
              children: [
                e.jsx(u, {
                  to: '/',
                  children: e.jsx(j, { type: 'text', size: 'small', children: 'Home' }),
                }),
                e.jsx(u, {
                  to: '/everything?sort=price_desc',
                  children: e.jsx(j, { type: 'text', size: 'small', children: 'Shop Everything' }),
                }),
                e.jsx(we, {
                  overlay: h,
                  trigger: ['click'],
                  children: e.jsx(j, { size: 'small', children: 'Shop Graphics Cards' }),
                }),
                e.jsx(u, {
                  to: '/sell',
                  children: e.jsx(j, { size: 'small', type: 'default', children: 'Sell' }),
                }),
                e.jsx(u, {
                  to: '/sell-to-us',
                  children: e.jsx(j, { size: 'small', type: 'default', children: 'Sell to us' }),
                }),
                e.jsx(u, {
                  to: '/my',
                  children: e.jsx(j, { size: 'small', type: 'default', children: 'My Listings' }),
                }),
                e.jsx(u, {
                  to: '/profile',
                  children: e.jsx(j, { size: 'small', type: 'default', children: 'My Profile' }),
                }),
                r &&
                  e.jsx(u, {
                    to: '/profile/edit',
                    children: e.jsx(j, {
                      size: 'small',
                      type: 'default',
                      children: 'Edit Profile',
                    }),
                  }),
                !r &&
                  e.jsx(u, {
                    to: '/login',
                    children: e.jsx(j, { size: 'small', type: 'primary', children: 'Login' }),
                  }),
                !r &&
                  e.jsx(u, {
                    to: '/register',
                    children: e.jsx(j, { size: 'small', type: 'primary', children: 'Register' }),
                  }),
                r &&
                  e.jsx('span', {
                    className: 'align-self-center small text-muted',
                    children: r.display_name || r.username,
                  }),
                r &&
                  e.jsx(j, {
                    size: 'small',
                    danger: !0,
                    onClick: () => {
                      (n(),
                        window.dispatchEvent(
                          new CustomEvent('app-toast', {
                            detail: { text: 'Logged out', type: 'info' },
                          }),
                        ));
                    },
                    children: 'Logout',
                  }),
              ],
            }),
            e.jsx('div', {
              className: 'ms-auto d-md-none',
              children: e.jsx(j, { size: 'small', onClick: () => i(!0), children: 'Menu' }),
            }),
          ],
        }),
      }),
      e.jsx(ee, {
        open: a,
        onClose: () => i(!1),
        afterOpenChange: (c) => {
          try {
            document.body.style.overflow = c ? 'hidden' : '';
          } catch {}
        },
        children: e.jsxs('div', {
          className: 'd-flex flex-column gap-2',
          children: [
            e.jsx(u, { to: '/', onClick: () => i(!1), children: 'Home' }),
            e.jsx(u, {
              to: '/everything?sort=price_desc',
              onClick: () => i(!1),
              children: 'Shop Everything',
            }),
            e.jsx('div', { className: 'fw-bold', children: 'Shop Graphics Cards' }),
            e.jsx(u, { to: '/?brand=NVIDIA', onClick: () => i(!1), children: 'NVIDIA' }),
            e.jsx(u, { to: '/?brand=AMD', onClick: () => i(!1), children: 'AMD' }),
            e.jsx(u, { to: '/sell', onClick: () => i(!1), children: 'Sell' }),
            e.jsx(u, { to: '/sell-to-us', onClick: () => i(!1), children: 'Sell to us' }),
            e.jsx(u, { to: '/my', onClick: () => i(!1), children: 'My Listings' }),
            e.jsx(u, { to: '/profile', onClick: () => i(!1), children: 'My Profile' }),
            !r && e.jsx(u, { to: '/login', onClick: () => i(!1), children: 'Login' }),
            !r && e.jsx(u, { to: '/register', onClick: () => i(!1), children: 'Register' }),
            r &&
              e.jsx('button', {
                className: 'btn btn-outline-danger btn-sm',
                onClick: () => {
                  (i(!1),
                    n(),
                    window.dispatchEvent(
                      new CustomEvent('app-toast', {
                        detail: { text: 'Logged out', type: 'info' },
                      }),
                    ));
                },
                children: 'Logout',
              }),
          ],
        }),
      }),
      e.jsx(o.Suspense, {
        fallback: e.jsx('div', { className: 'container py-3', children: 'Loading...' }),
        children: e.jsxs(je, {
          children: [
            e.jsx(b, { path: '/', element: e.jsx(W, {}) }),
            e.jsx(b, { path: '/everything', element: e.jsx(W, {}) }),
            e.jsx(b, { path: '/profile', element: e.jsx(pt, {}) }),
            e.jsx(b, { path: '/profile/edit', element: e.jsx(I, { children: e.jsx(St, {}) }) }),
            e.jsx(b, { path: '/g/:id', element: e.jsx(yt, {}) }),
            e.jsx(b, { path: '/sell', element: e.jsx(I, { children: e.jsx(bt, {}) }) }),
            e.jsx(b, { path: '/sell-to-us', element: e.jsx(Nt, {}) }),
            e.jsx(b, { path: '/contact', element: e.jsx(Et, {}) }),
            e.jsx(b, { path: '/edit/:id', element: e.jsx(I, { children: e.jsx(wt, {}) }) }),
            e.jsx(b, { path: '*', element: e.jsx(_t, {}) }),
            e.jsx(b, { path: '/about', element: e.jsx(mt, {}) }),
            e.jsx(b, { path: '/privacy', element: e.jsx(ht, {}) }),
            e.jsx(b, { path: '/terms', element: e.jsx(xt, {}) }),
            e.jsx(b, { path: '/500', element: e.jsx(ft, {}) }),
            e.jsx(b, { path: '/login', element: e.jsx(jt, {}) }),
            e.jsx(b, { path: '/register', element: e.jsx(vt, {}) }),
            e.jsx(b, { path: '/my', element: e.jsx(I, { children: e.jsx(gt, {}) }) }),
          ],
        }),
      }),
      e.jsx(Te, { messages: s }),
      e.jsx('footer', {
        className: 'border-top bg-white mt-4',
        children: e.jsxs('div', {
          className: 'container py-4 text-muted small',
          children: [
            e.jsxs('div', {
              className: 'row',
              children: [
                e.jsxs('div', {
                  className: 'col-6 col-md-3 mb-3',
                  children: [
                    e.jsx('div', { className: 'fw-bold mb-2', children: 'Useful Pages' }),
                    e.jsxs('div', {
                      className: 'd-flex flex-column gap-1',
                      children: [
                        e.jsx(u, { to: '/sell-to-us', children: 'Sell to us' }),
                        e.jsx(u, {
                          to: '/everything?sort=price_desc',
                          children: 'Shop Everything',
                        }),
                        e.jsx(u, { to: '/', children: 'Shop Graphics Cards' }),
                        e.jsx(u, { to: '/about', children: 'About Us' }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'col-6 col-md-3 mb-3',
                  children: [
                    e.jsx('div', { className: 'fw-bold mb-2', children: 'Policies' }),
                    e.jsxs('div', {
                      className: 'd-flex flex-column gap-1',
                      children: [
                        e.jsx(u, { to: '/terms', children: 'Terms of Service' }),
                        e.jsx(u, { to: '/privacy', children: 'Privacy Policy' }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'col-6 col-md-3 mb-3',
                  children: [
                    e.jsx('div', { className: 'fw-bold mb-2', children: 'Reviews' }),
                    e.jsxs('div', {
                      className: 'd-flex flex-column gap-1',
                      children: [
                        e.jsx('a', {
                          href: '#',
                          target: '_blank',
                          rel: 'noreferrer',
                          children: 'Trustpilot',
                        }),
                        e.jsx('a', {
                          href: '#',
                          target: '_blank',
                          rel: 'noreferrer',
                          children: 'Google Reviews',
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'col-6 col-md-3 mb-3',
                  children: [
                    e.jsx('div', { className: 'fw-bold mb-2', children: 'Follow us' }),
                    e.jsxs('div', {
                      className: 'd-flex flex-column gap-1',
                      children: [
                        e.jsx('a', {
                          href: '#',
                          target: '_blank',
                          rel: 'noreferrer',
                          children: 'Twitter',
                        }),
                        e.jsx('a', {
                          href: '#',
                          target: '_blank',
                          rel: 'noreferrer',
                          children: 'Instagram',
                        }),
                        e.jsx('a', {
                          href: '#',
                          target: '_blank',
                          rel: 'noreferrer',
                          children: 'TikTok',
                        }),
                      ],
                    }),
                    e.jsx('div', { className: 'fw-bold mt-3 mb-1', children: 'Payment' }),
                    e.jsx('div', {
                      className: 'text-secondary',
                      children: 'Visa / MasterCard / PayPal / Apple Pay',
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'd-flex justify-content-between pt-3 border-top mt-3',
              children: [
                e.jsxs('span', { children: ['© ', new Date().getFullYear(), ' GPU Market'] }),
                e.jsx('span', { children: 'All prices in GBP' }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
class It extends o.Component {
  constructor(s) {
    (super(s), (this.state = { hasError: !1 }));
  }
  static getDerivedStateFromError(s) {
    return { hasError: !0 };
  }
  componentDidCatch(s, r) {
    console.error('AppErrorBoundary', s, r);
  }
  render() {
    return this.state.hasError
      ? e.jsxs('div', {
          className: 'container py-5 text-center',
          children: [
            e.jsx('h3', { children: 'Something went wrong.' }),
            e.jsx('p', { className: 'text-muted', children: 'Please refresh the page.' }),
          ],
        })
      : this.props.children;
  }
}
const Ct = new me();
R.createRoot(document.getElementById('root')).render(
  e.jsx(Z.StrictMode, {
    children: e.jsx(It, {
      children: e.jsx(he, { client: Ct, children: e.jsx(ve, { children: e.jsx(At, {}) }) }),
    }),
  }),
);
export { De as G, _, F as a, Ie as f, ct as u };

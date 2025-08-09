const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/DetailsModal-lC04LiNd.js',
      'assets/react-query-BGeIQRPr.js',
      'assets/react-CTDr35rJ.js',
      'assets/DetailsView-BmDVwFjn.js',
      'assets/antd-mcI3qWux.js',
      'assets/ImageUploader-DWnjEkzb.js',
      'assets/Profile-DWRGJ9dJ.js',
      'assets/Login-DPcYcF4n.js',
      'assets/FormField-iyrhpl26.js',
      'assets/zod-SQF3v9p3.js',
      'assets/Register-1E2c2CZA.js',
      'assets/MyListings-CS_qDScW.js',
      'assets/Detail-DOjQl86v.js',
      'assets/Sell-CwgXdUZP.js',
      'assets/Edit-9_Y8cFyg.js',
      'assets/NotFound-DjWoEur9.js',
      'assets/ProfileEdit-CxJUTsmt.js',
      'assets/SellToUs-Bn5qSNzK.js',
      'assets/Contact-BTLTTHD0.js',
      'assets/Returns-CybxWZqr.js',
      'assets/B2B--j3nffuu.js',
      'assets/Raffles-DRqVSoUK.js',
      'assets/RaffleInfo-C2TNDJrv.js',
      'assets/RaffleWinners-D816uTx1.js',
      'assets/Cart-CvewBWYk.js',
    ]),
) => i.map((i) => d[i]);
import { j as e, u as ye, Q as ve, a as ge } from './react-query-BGeIQRPr.js';
import {
  c as be,
  r as c,
  u as ne,
  e as I,
  g as _e,
  R as ae,
  L as f,
  f as we,
  h as j,
  B as Se,
} from './react-CTDr35rJ.js';
import {
  I as ie,
  T as G,
  S as C,
  B as p,
  R as W,
  a as ke,
  P as Ee,
  D as le,
  s as Ne,
  b as Ae,
  c as Ce,
  d as M,
} from './antd-mcI3qWux.js';
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) o(r);
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === 'childList')
        for (const a of i.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && o(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const i = {};
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : r.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function o(r) {
    if (r.ep) return;
    r.ep = !0;
    const i = n(r);
    fetch(r.href, i);
  }
})();
var L = {},
  U = be;
((L.createRoot = U.createRoot), (L.hydrateRoot = U.hydrateRoot));
const Ie = 'modulepreload',
  De = function (t) {
    return '/' + t;
  },
  B = {},
  b = function (s, n, o) {
    let r = Promise.resolve();
    if (n && n.length > 0) {
      document.getElementsByTagName('link');
      const i = document.querySelector('meta[property=csp-nonce]'),
        a = (i == null ? void 0 : i.nonce) || (i == null ? void 0 : i.getAttribute('nonce'));
      r = Promise.all(
        n.map((m) => {
          if (((m = De(m)), m in B)) return;
          B[m] = !0;
          const u = m.endsWith('.css'),
            d = u ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${m}"]${d}`)) return;
          const l = document.createElement('link');
          if (
            ((l.rel = u ? 'stylesheet' : Ie),
            u || ((l.as = 'script'), (l.crossOrigin = '')),
            (l.href = m),
            a && l.setAttribute('nonce', a),
            document.head.appendChild(l),
            u)
          )
            return new Promise((h, _) => {
              (l.addEventListener('load', h),
                l.addEventListener('error', () => _(new Error(`Unable to preload CSS for ${m}`))));
            });
        }),
      );
    }
    return r
      .then(() => s())
      .catch((i) => {
        const a = new Event('vite:preloadError', { cancelable: !0 });
        if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented)) throw i;
      });
  };
var Z, X;
const Pe =
  (typeof import.meta < 'u' &&
    ((X = (Z = import.meta) == null ? void 0 : Z.env) == null ? void 0 : X.VITE_API_BASE)) ||
  window.location.origin;
async function F(t, s = {}) {
  const n = new Headers(s.headers || {}),
    o = localStorage.getItem('token');
  o && !n.has('Authorization') && n.set('Authorization', 'Bearer ' + o);
  let r;
  try {
    r = await fetch(t.startsWith('http') ? t : Pe + t, { ...s, headers: n });
  } catch (a) {
    throw (
      typeof window < 'u' &&
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: (a == null ? void 0 : a.message) || 'Network error', type: 'error' },
          }),
        ),
      a
    );
  }
  const i = r.headers.get('x-request-id');
  if (i) {
    const a = document.getElementById('reqIdBadge');
    a && (a.textContent = i);
  }
  if (
    (r.status === 401 || r.status === 403) &&
    o &&
    (localStorage.removeItem('token'), typeof window < 'u')
  ) {
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: { text: 'Session expired, please log in again', type: 'warning' },
      }),
    );
    try {
      const { pathname: a, search: m } = window.location;
      if (
        [
          (h) => h === '/sell',
          (h) => h.startsWith('/edit/'),
          (h) => h === '/my',
          (h) => h === '/profile/edit',
        ].some((h) => h(a)) &&
        !(a === '/login')
      ) {
        try {
          sessionStorage.setItem('from', a + (m || ''));
        } catch {}
        window.location.href = '/login';
      }
    } catch {}
  }
  return r;
}
function oe() {
  const t = c.useMemo(() => new URLSearchParams(location.search), [location.search]),
    s = c.useCallback(() => Object.fromEntries(t.entries()), [t]),
    n = c.useCallback((o) => {
      const r = new URLSearchParams(location.search);
      (Object.entries(o).forEach(([i, a]) => {
        a === void 0 || a === '' ? r.delete(i) : r.set(i, String(a));
      }),
        history.replaceState({}, '', `?${r.toString()}`));
    }, []);
  return { getAll: s, setAll: n };
}
function $({ onApply: t }) {
  const { getAll: s, setAll: n } = oe(),
    o = s(),
    [r, i] = c.useState(o.q || ''),
    [a, m] = c.useState(o.min || ''),
    [u, d] = c.useState(o.max || ''),
    [l, h] = c.useState(o.brand || ''),
    [_, g] = c.useState(o.vram_min || ''),
    [y, S] = c.useState(o.condition || '');
  return (
    c.useEffect(() => {
      n({ q: r, min: a, max: u, brand: l, vram_min: _, condition: y });
    }, [r, a, u, l, _, y, n]),
    e.jsxs('div', {
      children: [
        e.jsx(ie, {
          className: 'mb-2',
          placeholder: 'Search title or description',
          value: r,
          onChange: (v) => i(v.target.value),
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(G, {
              placeholder: 'Min price',
              value: a === '' ? void 0 : Number(a),
              onChange: (v) => m(v == null ? '' : String(v)),
              min: 0,
              style: { width: '100%' },
            }),
            e.jsx(G, {
              placeholder: 'Max price',
              value: u === '' ? void 0 : Number(u),
              onChange: (v) => d(v == null ? '' : String(v)),
              min: 0,
              style: { width: '100%' },
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(C, {
              value: l,
              style: { minWidth: 140 },
              onChange: (v) => h(v),
              options: [
                { value: '', label: 'Any brand' },
                { value: 'NVIDIA', label: 'NVIDIA' },
                { value: 'AMD', label: 'AMD' },
              ],
            }),
            e.jsx(C, {
              value: _,
              style: { minWidth: 140 },
              onChange: (v) => g(String(v)),
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
          value: y,
          onChange: (v) => S(v),
          options: [
            { value: '', label: 'Any condition' },
            { value: 'New', label: 'New' },
            { value: 'Used', label: 'Used' },
          ],
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 align-items-center',
          children: [
            e.jsx(p, {
              type: 'primary',
              onClick: () =>
                t({ q: r, min: a, max: u, brand: l, vram_min: _, condition: y, page: '1' }),
              children: 'Search',
            }),
            e.jsx(p, {
              onClick: () => {
                (i(''),
                  m(''),
                  d(''),
                  h(''),
                  g(''),
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
const Re = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});
function Me(t) {
  const s = Number(t || 0);
  return Re.format(s);
}
function Te(t) {
  if (!t) return '';
  try {
    return new Date(t).toLocaleDateString();
  } catch {
    return '';
  }
}
function Le({
  src: t,
  alt: s = '',
  className: n,
  style: o,
  width: r,
  height: i,
  srcSet: a,
  sizes: m,
  fallbackSrc: u,
}) {
  const d = c.useRef(null),
    [l, h] = c.useState(!1),
    [_, g] = c.useState(!1);
  c.useEffect(() => {
    const S = d.current;
    if (!S) return;
    if (!('IntersectionObserver' in window)) {
      h(!0);
      return;
    }
    const v = new IntersectionObserver(
      (P) => {
        const k = P[0];
        k && k.isIntersecting && (h(!0), v.disconnect());
      },
      { rootMargin: '200px' },
    );
    return (v.observe(S), () => v.disconnect());
  }, []);
  const y = _ && u ? u : t;
  return e.jsx('img', {
    ref: d,
    src: l ? y : void 0,
    srcSet: l ? a : void 0,
    sizes: l ? m : void 0,
    alt: s,
    className: n,
    style: { backgroundColor: '#f5f5f5', ...o },
    width: r,
    height: i,
    loading: 'lazy',
    onError: () => g(!0),
  });
}
function Oe({ gpu: t, onDetails: s }) {
  const n = (() => {
    if (!t.created_at) return !1;
    const o = new Date(t.created_at).getTime();
    return Date.now() - o < 6048e5;
  })();
  return e.jsx('div', {
    className: 'card card-rounded mb-3',
    children: e.jsxs('div', {
      className: 'row g-0',
      children: [
        t.image_path &&
          e.jsx('div', {
            className: 'col-4',
            children: e.jsx(Le, {
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
                          n &&
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
                    children: e.jsx('strong', { className: 'text-dark', children: Me(t.price) }),
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
                            onClick: (o) => {
                              (o.preventDefault(),
                                o.currentTarget.previousSibling,
                                (o.currentTarget.parentElement.textContent = t.description || ''));
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
                      children: ['Added: ', Te(t.created_at)],
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
function Ve(t, s = 'GPU Market — Buy & Sell Used GPUs') {
  if (typeof document > 'u') return;
  const n = document.title;
  return (
    (document.title = t),
    () => {
      document.title = n || s;
    }
  );
}
const ze = c.lazy(() =>
  b(() => import('./DetailsModal-lC04LiNd.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
);
function H() {
  var z;
  const { getAll: t, setAll: s } = oe(),
    n = t(),
    o = typeof location < 'u' && location.pathname === '/everything',
    [r, i] = c.useState(n.q || ''),
    [a, m] = c.useState(n.sort || (o ? 'price_desc' : 'date_new')),
    [u, d] = c.useState({
      min: n.min || '',
      max: n.max || '',
      brand: n.brand || '',
      vram_min: n.vram_min || '',
      condition: n.condition || '',
    }),
    [l, h] = c.useState(null),
    [_, g] = c.useState(!1),
    [y, S] = c.useState(Number(n.page || '1')),
    [v] = c.useState(12);
  c.useEffect(() => Ve('GPU Market — Shop Graphics Cards'), []);
  const P = c.useMemo(() => {
      let x = 'newest';
      a === 'price_asc'
        ? (x = 'price_asc')
        : a === 'price_desc'
          ? (x = 'price_desc')
          : (a === 'date_new' ||
              a === 'featured' ||
              a === 'best' ||
              a === 'alpha_asc' ||
              a === 'alpha_desc' ||
              a === 'date_old') &&
            (x = 'newest');
      const w = new URLSearchParams();
      return (
        r && w.set('q', r),
        w.set('sort', x),
        Object.entries(u).forEach(([q, N]) => {
          N && w.set(q, String(N));
        }),
        w.set('page', String(y)),
        w.set('per', String(v)),
        w
      );
    }, [r, a, u, y, v]),
    {
      data: k,
      isLoading: R,
      isError: fe,
      refetch: pe,
      isFetching: xe,
    } = ye({
      queryKey: ['search', r, a, u, y, v],
      queryFn: async () => (
        s({ q: r, sort: a, page: String(y), ...u }),
        (await F('/api/search?' + P.toString())).json()
      ),
      placeholderData: (x) => x,
      staleTime: 3e4,
      retry: 2,
    });
  c.useEffect(() => {
    const x = document.querySelector('.container');
    x && x.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [y]);
  const V = c.useRef(!1);
  function je() {
    V.current ||
      ((V.current = !0),
      b(() => import('./DetailsModal-lC04LiNd.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
      b(() => import('./ImageUploader-DWnjEkzb.js'), __vite__mapDeps([5, 1, 2])));
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
      o && e.jsx('h1', { className: 'h4 mt-3', children: 'All Products' }),
      e.jsxs('div', {
        className: 'd-flex gap-2 my-3',
        children: [
          e.jsx(ie, {
            id: 'globalSearchInput',
            placeholder: 'Search GPUs...',
            value: r,
            onChange: (x) => i(x.target.value),
          }),
          e.jsx(C, {
            value: a,
            style: { width: 220 },
            onChange: (x) => m(x),
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
          e.jsx(p, {
            onClick: () => {
              m(o ? 'price_desc' : 'date_new');
            },
            children: 'Reset sort',
          }),
          e.jsx(p, { type: 'primary', onClick: () => pe(), children: 'Search' }),
          e.jsx(p, { onClick: () => g(!0), className: 'd-md-none', children: 'Filters' }),
        ],
      }),
      e.jsxs('div', {
        className: 'row',
        children: [
          e.jsxs('div', {
            className: 'col-md-4',
            children: [
              e.jsx('h5', { children: 'Search & Filters' }),
              e.jsx($, {
                onApply: (x) => {
                  (d((w) => ({ ...w, ...x })), S(1));
                },
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'col-md-8',
            children: [
              fe &&
                e.jsx('div', {
                  className: 'my-4',
                  children: e.jsx(W, {
                    status: 'error',
                    title: 'Failed to load list',
                    subTitle: 'Please try again later.',
                  }),
                }),
              e.jsxs('div', {
                className: 'row',
                onMouseEnter: je,
                children: [
                  (R || xe) &&
                    e.jsx(e.Fragment, {
                      children: Array.from({ length: 4 }).map((x, w) =>
                        e.jsx(
                          'div',
                          {
                            className: 'col-md-6 mb-3',
                            children: e.jsx('div', {
                              className: 'card p-3',
                              children: e.jsx(ke, {}),
                            }),
                          },
                          w,
                        ),
                      ),
                    }),
                  !R &&
                    ((k == null ? void 0 : k.results) || []).map((x) =>
                      e.jsx(
                        'div',
                        {
                          className: 'col-md-6',
                          children: e.jsx(Oe, {
                            gpu: x,
                            onDetails: async (w) => {
                              const N = await (await F(`/api/gpus/${w}`)).json();
                              h(N);
                            },
                          }),
                        },
                        x.id,
                      ),
                    ),
                  !R &&
                    (((z = k == null ? void 0 : k.results) == null ? void 0 : z.length) || 0) ===
                      0 &&
                    e.jsx('div', {
                      className: 'col-12',
                      children: e.jsx('div', {
                        className: 'my-4',
                        children: e.jsx(W, {
                          status: 'info',
                          title: 'No results',
                          subTitle:
                            r || u.min || u.max || u.brand || u.vram_min || u.condition
                              ? 'Try adjusting filters or sorting options.'
                              : 'Browse by series from the top menu or apply filters to get started.',
                          extra:
                            r || u.min || u.max || u.brand || u.vram_min || u.condition
                              ? e.jsx('div', {
                                  className: 'd-flex gap-2 justify-content-center',
                                  children: e.jsx(p, {
                                    onClick: () => {
                                      (i(''),
                                        d({
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
                                    e.jsx(p, {
                                      href: '/?brand=NVIDIA&vram_min=12',
                                      children: 'NVIDIA 40 Series',
                                    }),
                                    e.jsx(p, {
                                      href: '/?brand=NVIDIA&vram_min=8',
                                      children: 'NVIDIA 30 Series',
                                    }),
                                    e.jsx(p, {
                                      href: '/?brand=AMD&vram_min=12',
                                      children: 'AMD 7000 Series',
                                    }),
                                    e.jsx(p, {
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
                children: e.jsx(Ee, {
                  current: y,
                  pageSize: v,
                  total: (k == null ? void 0 : k.total) || 0,
                  onChange: (x) => S(x),
                  showSizeChanger: !1,
                }),
              }),
            ],
          }),
        ],
      }),
      e.jsxs(le, {
        open: _,
        onClose: () => g(!1),
        children: [
          e.jsx('h5', { className: 'mb-3', children: 'Filters' }),
          e.jsx($, {
            onApply: (x) => {
              (g(!1), d((w) => ({ ...w, ...x })), S(1));
            },
          }),
        ],
      }),
      e.jsx(c.Suspense, {
        fallback: null,
        children: e.jsx(ze, { item: l, onClose: () => h(null) }),
      }),
    ],
  });
}
function qe() {
  const [t, s] = Ne.useMessage();
  function n(r, i = 'info') {
    const a =
      i === 'error' ? 'error' : i === 'warning' ? 'warning' : i === 'success' ? 'success' : 'info';
    t.open({ type: a, content: r, duration: 3 });
  }
  return { api: { push: n }, messages: s };
}
function Ge({ messages: t }) {
  return e.jsx(e.Fragment, { children: t });
}
function A({ children: t }) {
  const s = ne(),
    n = I();
  return (
    c.useEffect(() => {
      if (!localStorage.getItem('token')) {
        const r = n.pathname + (n.search || '');
        s('/login', { replace: !0, state: { from: r } });
      }
    }, [s, n]),
    e.jsx(e.Fragment, { children: t })
  );
}
var We = {};
const Q = (t) => {
    let s;
    const n = new Set(),
      o = (l, h) => {
        const _ = typeof l == 'function' ? l(s) : l;
        if (!Object.is(_, s)) {
          const g = s;
          ((s = (h ?? (typeof _ != 'object' || _ === null)) ? _ : Object.assign({}, s, _)),
            n.forEach((y) => y(s, g)));
        }
      },
      r = () => s,
      u = {
        setState: o,
        getState: r,
        getInitialState: () => d,
        subscribe: (l) => (n.add(l), () => n.delete(l)),
        destroy: () => {
          ((We ? 'production' : void 0) !== 'production' &&
            console.warn(
              '[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.',
            ),
            n.clear());
        },
      },
      d = (s = t(o, r, u));
    return u;
  },
  Ue = (t) => (t ? Q(t) : Q);
var ce = { exports: {} },
  de = {},
  ue = { exports: {} },
  he = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var E = c;
function Be(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var Fe = typeof Object.is == 'function' ? Object.is : Be,
  $e = E.useState,
  He = E.useEffect,
  Qe = E.useLayoutEffect,
  Ye = E.useDebugValue;
function Je(t, s) {
  var n = s(),
    o = $e({ inst: { value: n, getSnapshot: s } }),
    r = o[0].inst,
    i = o[1];
  return (
    Qe(
      function () {
        ((r.value = n), (r.getSnapshot = s), T(r) && i({ inst: r }));
      },
      [t, n, s],
    ),
    He(
      function () {
        return (
          T(r) && i({ inst: r }),
          t(function () {
            T(r) && i({ inst: r });
          })
        );
      },
      [t],
    ),
    Ye(n),
    n
  );
}
function T(t) {
  var s = t.getSnapshot;
  t = t.value;
  try {
    var n = s();
    return !Fe(t, n);
  } catch {
    return !0;
  }
}
function Ke(t, s) {
  return s();
}
var Ze =
  typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'
    ? Ke
    : Je;
he.useSyncExternalStore = E.useSyncExternalStore !== void 0 ? E.useSyncExternalStore : Ze;
ue.exports = he;
var Xe = ue.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var D = c,
  et = Xe;
function tt(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var st = typeof Object.is == 'function' ? Object.is : tt,
  rt = et.useSyncExternalStore,
  nt = D.useRef,
  at = D.useEffect,
  it = D.useMemo,
  lt = D.useDebugValue;
de.useSyncExternalStoreWithSelector = function (t, s, n, o, r) {
  var i = nt(null);
  if (i.current === null) {
    var a = { hasValue: !1, value: null };
    i.current = a;
  } else a = i.current;
  i = it(
    function () {
      function u(g) {
        if (!d) {
          if (((d = !0), (l = g), (g = o(g)), r !== void 0 && a.hasValue)) {
            var y = a.value;
            if (r(y, g)) return (h = y);
          }
          return (h = g);
        }
        if (((y = h), st(l, g))) return y;
        var S = o(g);
        return r !== void 0 && r(y, S) ? ((l = g), y) : ((l = g), (h = S));
      }
      var d = !1,
        l,
        h,
        _ = n === void 0 ? null : n;
      return [
        function () {
          return u(s());
        },
        _ === null
          ? void 0
          : function () {
              return u(_());
            },
      ];
    },
    [s, n, o, r],
  );
  var m = rt(t, i[0], i[1]);
  return (
    at(
      function () {
        ((a.hasValue = !0), (a.value = m));
      },
      [m],
    ),
    lt(m),
    m
  );
};
ce.exports = de;
var ot = ce.exports;
const ct = _e(ot);
var me = {};
const { useDebugValue: dt } = ae,
  { useSyncExternalStoreWithSelector: ut } = ct;
let Y = !1;
const ht = (t) => t;
function mt(t, s = ht, n) {
  (me ? 'production' : void 0) !== 'production' &&
    n &&
    !Y &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (Y = !0));
  const o = ut(t.subscribe, t.getState, t.getServerState || t.getInitialState, s, n);
  return (dt(o), o);
}
const J = (t) => {
    (me ? 'production' : void 0) !== 'production' &&
      typeof t != 'function' &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const s = typeof t == 'function' ? Ue(t) : t,
      n = (o, r) => mt(s, o, r);
    return (Object.assign(n, s), n);
  },
  ft = (t) => (t ? J(t) : J);
function K(t) {
  try {
    const s = t.split('.')[1] || '';
    return JSON.parse(atob(s));
  } catch {
    return null;
  }
}
const pt = ft((t) => ({
  token: null,
  user: null,
  init: () => {
    const s = localStorage.getItem('token');
    if (s) {
      const n = K(s);
      t({
        token: s,
        user: n ? { id: n.id, username: n.username, display_name: n.display_name } : null,
      });
    }
  },
  login: (s) => {
    localStorage.setItem('token', s);
    const n = K(s);
    t({
      token: s,
      user: n ? { id: n.id, username: n.username, display_name: n.display_name } : null,
    });
  },
  logout: () => {
    (localStorage.removeItem('token'), t({ token: null, user: null }));
  },
}));
function xt(t, s) {
  return `scroll:${t}${s}`;
}
function jt() {
  const t = I();
  c.useEffect(() => {
    const s = xt(t.pathname, t.search),
      n = sessionStorage.getItem(s);
    if (n) {
      const i = parseInt(n, 10);
      Number.isNaN(i) || setTimeout(() => window.scrollTo(0, i), 0);
    } else window.scrollTo(0, 0);
    function o() {
      sessionStorage.setItem(s, String(window.scrollY));
    }
    window.addEventListener('beforeunload', o);
    const r = () => {
      const i = sessionStorage.getItem(s),
        a = i ? parseInt(i, 10) : 0;
      setTimeout(() => window.scrollTo(0, Number.isNaN(a) ? 0 : a), 0);
    };
    return (
      window.addEventListener('popstate', r),
      () => {
        (window.removeEventListener('beforeunload', o),
          window.removeEventListener('popstate', r),
          o());
      }
    );
  }, [t.pathname, t.search]);
}
var ee, te, se, re;
const O = {
  contactWhatsApp:
    (typeof import.meta < 'u' &&
      ((te = (ee = import.meta) == null ? void 0 : ee.env) == null
        ? void 0
        : te.VITE_CONTACT_WHATSAPP)) ||
    null,
  contactEmail:
    (typeof import.meta < 'u' &&
      ((re = (se = import.meta) == null ? void 0 : se.env) == null
        ? void 0
        : re.VITE_CONTACT_EMAIL)) ||
    null,
};
function yt() {
  return (
    (document.title = 'About Us — GPU Market'),
    e.jsxs('div', {
      className: 'container py-4 content-prose',
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
        e.jsxs('ul', {
          children: [
            e.jsxs('li', {
              children: [
                'WhatsApp:',
                ' ',
                e.jsx('a', {
                  href: `https://wa.me/${O.contactWhatsApp || '447747310027'}`,
                  target: '_blank',
                  rel: 'noreferrer',
                  children: '+44 7747310027',
                }),
              ],
            }),
            e.jsxs('li', {
              children: [
                'Email:',
                ' ',
                e.jsx('a', {
                  href: `mailto:${O.contactEmail || 'x1657217402@gmail.com'}`,
                  children: 'x1657217402@gmail.com',
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function vt() {
  return (
    (document.title = 'Privacy Policy — GPU Market'),
    e.jsxs('div', {
      className: 'container py-4 content-prose',
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
        e.jsxs('ul', {
          children: [
            e.jsxs('li', {
              children: [
                'WhatsApp:',
                ' ',
                e.jsx('a', {
                  href: 'https://wa.me/447747310027',
                  target: '_blank',
                  rel: 'noreferrer',
                  children: '+44 7747310027',
                }),
              ],
            }),
            e.jsxs('li', {
              children: [
                'Email: ',
                e.jsx('a', {
                  href: 'mailto:x1657217402@gmail.com',
                  children: 'x1657217402@gmail.com',
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function gt() {
  return (
    (document.title = 'Terms of Service — GPU Market'),
    e.jsxs('div', {
      className: 'container py-4 content-prose',
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
        e.jsx('h2', { children: '8. Warranty & Support' }),
        e.jsxs('ul', {
          children: [
            e.jsx('li', {
              children:
                'Marketplace items may include remaining manufacturer warranty if explicitly stated in the listing. Proof of purchase may be required by the manufacturer.',
            }),
            e.jsx('li', {
              children:
                'We provide an arrival guarantee: if the item arrives DOA (dead on arrival), contact us within 48 hours for priority handling.',
            }),
            e.jsx('li', {
              children:
                'Basic assistance is available via the Contact page for troubleshooting and case-by-case resolution. We do not offer on-site repair services.',
            }),
          ],
        }),
        e.jsx('h2', { children: '9. Contact' }),
        e.jsxs('p', {
          children: [
            'For questions about these Terms, please ',
            e.jsx('a', { href: '/contact', children: 'contact us' }),
            '.',
          ],
        }),
        e.jsxs('ul', {
          children: [
            e.jsxs('li', {
              children: [
                'WhatsApp:',
                ' ',
                e.jsx('a', {
                  href: 'https://wa.me/447747310027',
                  target: '_blank',
                  rel: 'noreferrer',
                  children: '+44 7747310027',
                }),
              ],
            }),
            e.jsxs('li', {
              children: [
                'Email: ',
                e.jsx('a', {
                  href: 'mailto:x1657217402@gmail.com',
                  children: 'x1657217402@gmail.com',
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function bt() {
  return e.jsxs('div', {
    className: 'container py-5 text-center',
    children: [
      e.jsx('h1', { className: 'display-5', children: '500' }),
      e.jsx('p', { className: 'lead', children: 'Unexpected server error.' }),
      e.jsx('a', { className: 'btn btn-primary', href: '/', children: 'Go Home' }),
    ],
  });
}
function _t() {
  const s = `https://wa.me/${O.contactWhatsApp || '447747310027'}?text=Hi%20:)`,
    { pathname: n } = I();
  return ['/login', '/register', '/500'].includes(n)
    ? null
    : (c.useEffect(() => {
        const r = (m) => {
          document.documentElement.style.setProperty('--fab-bottom', `${m}px`);
        };
        r(16);
        const i = window.visualViewport;
        if (!i) return;
        const a = () => {
          const m = window.innerHeight - i.height;
          r(m > 120 ? 80 : 16);
        };
        return (
          i.addEventListener('resize', a),
          i.addEventListener('scroll', a),
          () => {
            (i.removeEventListener('resize', a), i.removeEventListener('scroll', a));
          }
        );
      }, []),
      e.jsx('a', {
        className: 'whatsapp-fab',
        href: s,
        target: '_blank',
        rel: 'noreferrer',
        'aria-label': 'Chat on WhatsApp',
        title: 'Chat on WhatsApp',
        children: e.jsxs('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 32 32',
          width: '24',
          height: '24',
          'aria-hidden': !0,
          focusable: 'false',
          fill: 'currentColor',
          children: [
            e.jsx('path', {
              d: 'M19.11 17.26c-.29-.14-1.68-.82-1.94-.91-.26-.1-.45-.14-.64.14-.19.29-.73.91-.89 1.1-.16.19-.33.21-.62.07-.29-.14-1.22-.45-2.32-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.12-.59.12-.12.29-.31.43-.47.14-.16.19-.26.29-.45.1-.19.05-.34-.02-.48-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.49-.64-.49-.16 0-.34-.02-.52-.02-.19 0-.48.07-.73.34-.26.29-.99.97-.99 2.37 0 1.4 1.02 2.75 1.17 2.94.14.19 2.01 3.06 4.87 4.29.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.09 1.68-.69 1.92-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z',
            }),
            e.jsx('path', {
              d: 'M26.69 5.33C24.07 2.69 20.64 1.23 17 1.23 9.4 1.23 3.23 7.4 3.23 15c0 2.43.64 4.8 1.86 6.89L3 29l7.3-1.92c2.04 1.11 4.35 1.7 6.7 1.7h0c7.6 0 13.77-6.17 13.77-13.77 0-3.64-1.46-7.07-4.08-9.69zM17 26.02h0c-2.12 0-4.19-.57-5.99-1.64l-.43-.26-4.33 1.14 1.16-4.22-.28-.43C5.02 18.75 4.5 16.9 4.5 15 4.5 8.1 10.1 2.5 17 2.5c3.5 0 6.79 1.36 9.27 3.84 2.47 2.47 3.83 5.76 3.83 9.27 0 7.9-6.6 13.41-13.1 13.41z',
            }),
          ],
        }),
      }));
}
const wt = c.lazy(() => b(() => import('./Profile-DWRGJ9dJ.js'), __vite__mapDeps([6, 1, 2, 4]))),
  St = c.lazy(() => b(() => import('./Login-DPcYcF4n.js'), __vite__mapDeps([7, 1, 2, 8, 9, 4]))),
  kt = c.lazy(() =>
    b(() => import('./Register-1E2c2CZA.js'), __vite__mapDeps([10, 1, 2, 8, 9, 4])),
  ),
  Et = c.lazy(() => b(() => import('./MyListings-CS_qDScW.js'), __vite__mapDeps([11, 1, 2, 4]))),
  Nt = c.lazy(() => b(() => import('./Detail-DOjQl86v.js'), __vite__mapDeps([12, 1, 2, 3, 4]))),
  At = c.lazy(() => b(() => import('./Sell-CwgXdUZP.js'), __vite__mapDeps([13, 1, 2, 8, 9, 4]))),
  Ct = c.lazy(() => b(() => import('./Edit-9_Y8cFyg.js'), __vite__mapDeps([14, 1, 2, 8, 9, 4]))),
  It = c.lazy(() => b(() => import('./NotFound-DjWoEur9.js'), __vite__mapDeps([15, 1, 2, 4]))),
  Dt = c.lazy(() =>
    b(() => import('./ProfileEdit-CxJUTsmt.js'), __vite__mapDeps([16, 1, 2, 8, 4])),
  ),
  Pt = c.lazy(() =>
    b(() => import('./SellToUs-Bn5qSNzK.js'), __vite__mapDeps([17, 1, 2, 9, 8, 4])),
  ),
  Rt = c.lazy(() => b(() => import('./Contact-BTLTTHD0.js'), __vite__mapDeps([18, 1, 2, 9, 8, 4]))),
  Mt = c.lazy(() => b(() => import('./Returns-CybxWZqr.js'), __vite__mapDeps([19, 1, 2]))),
  Tt = c.lazy(() => b(() => import('./B2B--j3nffuu.js'), __vite__mapDeps([20, 1, 2]))),
  Lt = c.lazy(() => b(() => import('./Raffles-DRqVSoUK.js'), __vite__mapDeps([21, 1, 2]))),
  Ot = c.lazy(() => b(() => import('./RaffleInfo-C2TNDJrv.js'), __vite__mapDeps([22, 1, 2]))),
  Vt = c.lazy(() => b(() => import('./RaffleWinners-D816uTx1.js'), __vite__mapDeps([23, 1, 2]))),
  zt = c.lazy(() => b(() => import('./Cart-CvewBWYk.js'), __vite__mapDeps([24, 1, 2])));
function qt() {
  const { api: t, messages: s } = qe(),
    n = ne(),
    o = I(),
    { user: r, init: i, logout: a } = pt();
  (jt(),
    c.useEffect(() => {
      i();
      function d(l) {
        const h = l.detail || {};
        t.push(h.text || '', h.type || 'info');
      }
      return (
        window.addEventListener('app-toast', d),
        () => window.removeEventListener('app-toast', d)
      );
    }, []));
  const [m, u] = c.useState(!1);
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('a', { href: '#main', className: 'skip-link', children: 'Skip to content' }),
      e.jsx('div', {
        className: 'w-100 py-1 text-center text-white',
        style: { background: '#2f7f82' },
        children: e.jsx('a', {
          href: '#reviews',
          className: 'text-white text-decoration-none',
          children: 'See Our Excellent Reviews →',
        }),
      }),
      e.jsxs('div', {
        className: 'container py-3 d-none d-md-flex justify-content-between align-items-center',
        children: [
          e.jsx(p, {
            type: 'text',
            'aria-label': 'Search',
            icon: e.jsx(Ae, { style: { fontSize: 22, color: '#111' } }),
            onClick: () => {
              var d;
              o.pathname !== '/' && o.pathname !== '/everything'
                ? (n('/everything'),
                  setTimeout(() => {
                    var l;
                    return (l = document.getElementById('globalSearchInput')) == null
                      ? void 0
                      : l.focus();
                  }, 0))
                : (d = document.getElementById('globalSearchInput')) == null || d.focus();
            },
          }),
          e.jsxs(f, {
            to: '/',
            className: 'd-flex align-items-center gap-2 text-decoration-none',
            children: [
              e.jsx('span', {
                className: 'rounded',
                style: { width: 64, height: 64, background: '#2f7f82', display: 'inline-block' },
              }),
              e.jsx('span', { className: 'h4 mb-0 text-dark', children: 'GPU Market' }),
            ],
          }),
          e.jsx(p, {
            type: 'text',
            'aria-label': 'Cart',
            icon: e.jsx(Ce, { style: { fontSize: 22, color: '#111' } }),
            onClick: () => n('/cart'),
          }),
        ],
      }),
      e.jsx('nav', {
        className: 'navbar navbar-expand navbar-light bg-light',
        children: e.jsxs('div', {
          className: 'container-fluid',
          children: [
            e.jsxs('div', {
              className: 'mx-auto d-none d-md-flex gap-3',
              children: [
                e.jsx(f, {
                  to: '/',
                  children: e.jsx(p, {
                    type: 'text',
                    size: 'small',
                    style: { borderBottom: o.pathname === '/' ? '2px solid #222' : 'none' },
                    children: 'Home',
                  }),
                }),
                e.jsx(M, {
                  trigger: ['click'],
                  menu: {
                    items: [
                      { key: 'everything', label: 'Shop Everything' },
                      {
                        type: 'group',
                        label: 'Computer Components',
                        children: [
                          { key: 'q:Graphics Cards (GPUs)', label: 'Graphics Cards (GPUs)' },
                          { key: 'q:RAM', label: 'RAM' },
                          { key: 'q:Processors (CPUs)', label: 'Processors (CPUs)' },
                          { key: 'q:Storage', label: 'Storage' },
                          { key: 'q:Motherboards', label: 'Motherboards' },
                          { key: 'q:PSUs', label: 'PSUs' },
                        ],
                      },
                      {
                        type: 'group',
                        label: 'Other Electronics',
                        children: [
                          { key: 'q:Smart Watches', label: 'Smart Watches' },
                          { key: 'q:Phones', label: 'Phones' },
                          { key: 'q:Laptops', label: 'Laptops' },
                          { key: 'q:Cameras', label: 'Cameras' },
                          { key: 'q:Home Tech', label: 'Home Tech' },
                          { key: 'q:Monitors', label: 'Monitors' },
                          { key: 'q:Tablets', label: 'Tablets' },
                          { key: 'q:Faulty Stock', label: 'Faulty Stock' },
                        ],
                      },
                    ],
                    onClick: (d) => {
                      if (d.key === 'everything') {
                        n('/everything?sort=price_desc');
                        return;
                      }
                      if (d.key.startsWith('q:')) {
                        const l = encodeURIComponent(d.key.slice(2));
                        n(`/everything?sort=price_desc&q=${l}`);
                      }
                    },
                  },
                  children: e.jsx(p, {
                    type: 'text',
                    size: 'small',
                    style: {
                      borderBottom: o.pathname === '/everything' ? '2px solid #222' : 'none',
                    },
                    children: 'Shop Everything',
                  }),
                }),
                e.jsx(M, {
                  trigger: ['click'],
                  menu: {
                    items: [
                      { key: 'all-gpus', label: 'All Graphics Cards' },
                      {
                        type: 'group',
                        label: 'Nvidia Graphics Cards',
                        children: [
                          { key: 'nv-all', label: 'All Nvidia Graphics Cards' },
                          { key: 'nv-40', label: 'Nvidia 40 Series' },
                          { key: 'nv-30', label: 'Nvidia 30 Series' },
                          { key: 'nv-20', label: 'Nvidia 20 Series' },
                          { key: 'nv-16', label: 'Nvidia 16 Series' },
                          { key: 'nv-10', label: 'Nvidia 10 Series' },
                          { key: 'nv-other', label: 'Other Nvidia Graphics Cards' },
                          { key: 'nv-faulty', label: 'Faulty Stock' },
                        ],
                      },
                      {
                        type: 'group',
                        label: 'AMD Graphics Cards',
                        children: [
                          { key: 'amd-all', label: 'All AMD Graphics Cards' },
                          { key: 'amd-7000', label: 'AMD Radeon 7000 Series' },
                          { key: 'amd-6000', label: 'AMD Radeon 6000 Series' },
                          { key: 'amd-5000', label: 'AMD Radeon 5000 Series' },
                          { key: 'amd-500', label: 'AMD Radeon 500 Series' },
                          { key: 'amd-400', label: 'AMD Radeon 400 Series' },
                          { key: 'amd-vega', label: 'AMD Radeon Vega Series' },
                          { key: 'amd-other', label: 'Other AMD Graphics Cards' },
                          { key: 'amd-faulty', label: 'Faulty Stock' },
                        ],
                      },
                    ],
                    onClick: (d) => {
                      const l = (h) => n(h);
                      if (d.key === 'all-gpus') return l('/');
                      if (d.key === 'nv-all') return l('/?brand=NVIDIA');
                      if (d.key === 'nv-40') return l('/?brand=NVIDIA&vram_min=12');
                      if (d.key === 'nv-30') return l('/?brand=NVIDIA&vram_min=8');
                      if (d.key === 'nv-20') return l('/?brand=NVIDIA&q=20 Series');
                      if (d.key === 'nv-16') return l('/?brand=NVIDIA&q=16 Series');
                      if (d.key === 'nv-10') return l('/?brand=NVIDIA&q=10 Series');
                      if (d.key === 'nv-other') return l('/?brand=NVIDIA&q=Other');
                      if (d.key === 'nv-faulty') return l('/?brand=NVIDIA&q=Faulty');
                      if (d.key === 'amd-all') return l('/?brand=AMD');
                      if (d.key === 'amd-7000') return l('/?brand=AMD&vram_min=12');
                      if (d.key === 'amd-6000') return l('/?brand=AMD&vram_min=8');
                      if (d.key === 'amd-5000') return l('/?brand=AMD&q=5000 Series');
                      if (d.key === 'amd-500') return l('/?brand=AMD&q=500 Series');
                      if (d.key === 'amd-400') return l('/?brand=AMD&q=400 Series');
                      if (d.key === 'amd-vega') return l('/?brand=AMD&q=Vega');
                      if (d.key === 'amd-other') return l('/?brand=AMD&q=Other');
                      if (d.key === 'amd-faulty') return l('/?brand=AMD&q=Faulty');
                    },
                  },
                  children: e.jsx(p, {
                    type: 'text',
                    size: 'small',
                    children: 'Shop Graphics Cards',
                  }),
                }),
                e.jsx(f, {
                  to: '/sell',
                  children: e.jsx(p, { size: 'small', type: 'default', children: 'Sell' }),
                }),
                e.jsx(f, {
                  to: '/sell-to-us',
                  children: e.jsx(p, { size: 'small', type: 'default', children: 'Sell to us' }),
                }),
                e.jsx(f, {
                  to: '/b2b',
                  children: e.jsx(p, {
                    size: 'small',
                    type: 'text',
                    children: 'Enterprise Hardware (B2B)',
                  }),
                }),
                e.jsx(f, {
                  to: '/my',
                  children: e.jsx(p, { size: 'small', type: 'default', children: 'My Listings' }),
                }),
                e.jsx(f, {
                  to: '/profile',
                  children: e.jsx(p, { size: 'small', type: 'default', children: 'My Profile' }),
                }),
                e.jsx(M, {
                  trigger: ['click'],
                  menu: {
                    items: [
                      { key: 'raffles', label: 'Current Raffle' },
                      { key: 'raffle-info', label: 'Raffle Information' },
                      { key: 'raffle-winners', label: 'Raffle Winners' },
                    ],
                    onClick: (d) => {
                      (d.key === 'raffles' && n('/raffles'),
                        d.key === 'raffle-info' && n('/raffles/info'),
                        d.key === 'raffle-winners' && n('/raffles/winners'));
                    },
                  },
                  children: e.jsx(p, { type: 'text', size: 'small', children: 'Raffles' }),
                }),
                r &&
                  e.jsx(f, {
                    to: '/profile/edit',
                    children: e.jsx(p, {
                      size: 'small',
                      type: 'default',
                      children: 'Edit Profile',
                    }),
                  }),
                !r &&
                  e.jsx(f, {
                    to: '/login',
                    children: e.jsx(p, { size: 'small', type: 'primary', children: 'Login' }),
                  }),
                !r &&
                  e.jsx(f, {
                    to: '/register',
                    children: e.jsx(p, { size: 'small', type: 'primary', children: 'Register' }),
                  }),
                r &&
                  e.jsx('span', {
                    className: 'align-self-center small text-muted',
                    children: r.display_name || r.username,
                  }),
                r &&
                  e.jsx(p, {
                    size: 'small',
                    danger: !0,
                    onClick: () => {
                      (a(),
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
              children: e.jsx(p, { size: 'small', onClick: () => u(!0), children: 'Menu' }),
            }),
          ],
        }),
      }),
      e.jsx(le, {
        open: m,
        onClose: () => u(!1),
        afterOpenChange: (d) => {
          try {
            document.body.style.overflow = d ? 'hidden' : '';
          } catch {}
        },
        children: e.jsxs('div', {
          className: 'd-flex flex-column gap-2',
          children: [
            e.jsx(f, { to: '/', onClick: () => u(!1), children: 'Home' }),
            e.jsx(f, {
              to: '/everything?sort=price_desc',
              onClick: () => u(!1),
              children: 'Shop Everything',
            }),
            e.jsx('div', { className: 'fw-bold', children: 'Shop Graphics Cards' }),
            e.jsx(f, { to: '/?brand=NVIDIA', onClick: () => u(!1), children: 'NVIDIA' }),
            e.jsx(f, { to: '/?brand=AMD', onClick: () => u(!1), children: 'AMD' }),
            e.jsx(f, { to: '/sell', onClick: () => u(!1), children: 'Sell' }),
            e.jsx(f, { to: '/sell-to-us', onClick: () => u(!1), children: 'Sell to us' }),
            e.jsx(f, { to: '/my', onClick: () => u(!1), children: 'My Listings' }),
            e.jsx(f, { to: '/profile', onClick: () => u(!1), children: 'My Profile' }),
            !r && e.jsx(f, { to: '/login', onClick: () => u(!1), children: 'Login' }),
            !r && e.jsx(f, { to: '/register', onClick: () => u(!1), children: 'Register' }),
            r &&
              e.jsx('button', {
                className: 'btn btn-outline-danger btn-sm',
                onClick: () => {
                  (u(!1),
                    a(),
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
      e.jsx(c.Suspense, {
        fallback: e.jsx('div', { className: 'container py-3', children: 'Loading...' }),
        children: e.jsxs(we, {
          children: [
            e.jsx(j, { path: '/', element: e.jsx(H, {}) }),
            e.jsx(j, { path: '/everything', element: e.jsx(H, {}) }),
            e.jsx(j, { path: '/profile', element: e.jsx(wt, {}) }),
            e.jsx(j, { path: '/profile/edit', element: e.jsx(A, { children: e.jsx(Dt, {}) }) }),
            e.jsx(j, { path: '/g/:id', element: e.jsx(Nt, {}) }),
            e.jsx(j, { path: '/sell', element: e.jsx(A, { children: e.jsx(At, {}) }) }),
            e.jsx(j, { path: '/sell-to-us', element: e.jsx(Pt, {}) }),
            e.jsx(j, { path: '/contact', element: e.jsx(Rt, {}) }),
            e.jsx(j, { path: '/b2b', element: e.jsx(Tt, {}) }),
            e.jsx(j, { path: '/raffles', element: e.jsx(Lt, {}) }),
            e.jsx(j, { path: '/raffles/info', element: e.jsx(Ot, {}) }),
            e.jsx(j, { path: '/raffles/winners', element: e.jsx(Vt, {}) }),
            e.jsx(j, { path: '/cart', element: e.jsx(zt, {}) }),
            e.jsx(j, { path: '/edit/:id', element: e.jsx(A, { children: e.jsx(Ct, {}) }) }),
            e.jsx(j, { path: '*', element: e.jsx(It, {}) }),
            e.jsx(j, { path: '/about', element: e.jsx(yt, {}) }),
            e.jsx(j, { path: '/privacy', element: e.jsx(vt, {}) }),
            e.jsx(j, { path: '/terms', element: e.jsx(gt, {}) }),
            e.jsx(j, { path: '/returns', element: e.jsx(Mt, {}) }),
            e.jsx(j, { path: '/500', element: e.jsx(bt, {}) }),
            e.jsx(j, { path: '/login', element: e.jsx(St, {}) }),
            e.jsx(j, { path: '/register', element: e.jsx(kt, {}) }),
            e.jsx(j, { path: '/my', element: e.jsx(A, { children: e.jsx(Et, {}) }) }),
          ],
        }),
      }),
      e.jsx(Ge, { messages: s }),
      e.jsx('footer', {
        className: 'border-top bg-white mt-4',
        id: 'main',
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
                        e.jsx(f, { to: '/sell-to-us', children: 'Sell to us' }),
                        e.jsx(f, {
                          to: '/everything?sort=price_desc',
                          children: 'Shop Everything',
                        }),
                        e.jsx(f, { to: '/', children: 'Shop Graphics Cards' }),
                        e.jsx(f, { to: '/about', children: 'About Us' }),
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
                        e.jsx(f, { to: '/terms', children: 'Terms of Service' }),
                        e.jsx(f, { to: '/privacy', children: 'Privacy Policy' }),
                        e.jsx(f, { to: '/returns', children: 'Returns & Refunds' }),
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
      e.jsx(_t, {}),
    ],
  });
}
class Gt extends c.Component {
  constructor(s) {
    (super(s), (this.state = { hasError: !1 }));
  }
  static getDerivedStateFromError(s) {
    return { hasError: !0 };
  }
  componentDidCatch(s, n) {
    console.error('AppErrorBoundary', s, n);
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
const Wt = new ve();
L.createRoot(document.getElementById('root')).render(
  e.jsx(ae.StrictMode, {
    children: e.jsx(Gt, {
      children: e.jsx(ge, { client: Wt, children: e.jsx(Se, { children: e.jsx(qt, {}) }) }),
    }),
  }),
);
export { Oe as G, b as _, F as a, O as c, Me as f, pt as u };

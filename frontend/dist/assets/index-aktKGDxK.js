const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/DetailsModal-BlnPmAfN.js',
      'assets/react-query-BGeIQRPr.js',
      'assets/react-CTDr35rJ.js',
      'assets/DetailsView-D3r_n-T0.js',
      'assets/antd-n40S5sxn.js',
      'assets/ImageUploader-DWnjEkzb.js',
      'assets/Profile-BEaAkLu5.js',
      'assets/Login-1gZuE8A9.js',
      'assets/FormField-iyrhpl26.js',
      'assets/zod-SQF3v9p3.js',
      'assets/Register-BO1RYHAi.js',
      'assets/MyListings-Ci-kEXP9.js',
      'assets/Detail-Dq917BP-.js',
      'assets/Sell-MnPY1_db.js',
      'assets/Edit-jegaVGNc.js',
      'assets/NotFound-Bq8LLBzl.js',
      'assets/ProfileEdit-C0svmWmd.js',
      'assets/SellToUs-CsfYInoF.js',
      'assets/Contact-CnIiPCU1.js',
      'assets/Returns-CybxWZqr.js',
    ]),
) => i.map((i) => d[i]);
import { j as e, u as fe, Q as je, a as ve } from './react-query-BGeIQRPr.js';
import {
  c as ge,
  r as o,
  u as ye,
  e as M,
  g as be,
  R as re,
  L as u,
  f as we,
  h as b,
  B as _e,
} from './react-CTDr35rJ.js';
import {
  I as ne,
  T as W,
  S as I,
  B as j,
  R as G,
  a as Se,
  P as Ee,
  D as ie,
  s as Ne,
  b as Ae,
  M as Ce,
} from './antd-n40S5sxn.js';
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) l(i);
  new MutationObserver((i) => {
    for (const a of i)
      if (a.type === 'childList')
        for (const n of a.addedNodes) n.tagName === 'LINK' && n.rel === 'modulepreload' && l(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(i) {
    const a = {};
    return (
      i.integrity && (a.integrity = i.integrity),
      i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (a.credentials = 'include')
        : i.crossOrigin === 'anonymous'
          ? (a.credentials = 'omit')
          : (a.credentials = 'same-origin'),
      a
    );
  }
  function l(i) {
    if (i.ep) return;
    i.ep = !0;
    const a = r(i);
    fetch(i.href, a);
  }
})();
var T = {},
  U = ge;
((T.createRoot = U.createRoot), (T.hydrateRoot = U.hydrateRoot));
const Ie = 'modulepreload',
  Pe = function (t) {
    return '/' + t;
  },
  F = {},
  w = function (s, r, l) {
    let i = Promise.resolve();
    if (r && r.length > 0) {
      document.getElementsByTagName('link');
      const a = document.querySelector('meta[property=csp-nonce]'),
        n = (a == null ? void 0 : a.nonce) || (a == null ? void 0 : a.getAttribute('nonce'));
      i = Promise.all(
        r.map((h) => {
          if (((h = Pe(h)), h in F)) return;
          F[h] = !0;
          const c = h.endsWith('.css'),
            g = c ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${h}"]${g}`)) return;
          const d = document.createElement('link');
          if (
            ((d.rel = c ? 'stylesheet' : Ie),
            c || ((d.as = 'script'), (d.crossOrigin = '')),
            (d.href = h),
            n && d.setAttribute('nonce', n),
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
    return i
      .then(() => s())
      .catch((a) => {
        const n = new Event('vite:preloadError', { cancelable: !0 });
        if (((n.payload = a), window.dispatchEvent(n), !n.defaultPrevented)) throw a;
      });
  };
var K, Z;
const ke =
  (typeof import.meta < 'u' &&
    ((Z = (K = import.meta) == null ? void 0 : K.env) == null ? void 0 : Z.VITE_API_BASE)) ||
  window.location.origin;
async function B(t, s = {}) {
  const r = new Headers(s.headers || {}),
    l = localStorage.getItem('token');
  l && !r.has('Authorization') && r.set('Authorization', 'Bearer ' + l);
  let i;
  try {
    i = await fetch(t.startsWith('http') ? t : ke + t, { ...s, headers: r });
  } catch (n) {
    throw (
      typeof window < 'u' &&
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: (n == null ? void 0 : n.message) || 'Network error', type: 'error' },
          }),
        ),
      n
    );
  }
  const a = i.headers.get('x-request-id');
  if (a) {
    const n = document.getElementById('reqIdBadge');
    n && (n.textContent = a);
  }
  if (
    (i.status === 401 || i.status === 403) &&
    l &&
    (localStorage.removeItem('token'), typeof window < 'u')
  ) {
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: { text: 'Session expired, please log in again', type: 'warning' },
      }),
    );
    try {
      const { pathname: n, search: h } = window.location;
      if (
        [
          (m) => m === '/sell',
          (m) => m.startsWith('/edit/'),
          (m) => m === '/my',
          (m) => m === '/profile/edit',
        ].some((m) => m(n)) &&
        !(n === '/login')
      ) {
        try {
          sessionStorage.setItem('from', n + (h || ''));
        } catch {}
        window.location.href = '/login';
      }
    } catch {}
  }
  return i;
}
function ae() {
  const t = o.useMemo(() => new URLSearchParams(location.search), [location.search]),
    s = o.useCallback(() => Object.fromEntries(t.entries()), [t]),
    r = o.useCallback((l) => {
      const i = new URLSearchParams(location.search);
      (Object.entries(l).forEach(([a, n]) => {
        n === void 0 || n === '' ? i.delete(a) : i.set(a, String(n));
      }),
        history.replaceState({}, '', `?${i.toString()}`));
    }, []);
  return { getAll: s, setAll: r };
}
function $({ onApply: t }) {
  const { getAll: s, setAll: r } = ae(),
    l = s(),
    [i, a] = o.useState(l.q || ''),
    [n, h] = o.useState(l.min || ''),
    [c, g] = o.useState(l.max || ''),
    [d, m] = o.useState(l.brand || ''),
    [y, v] = o.useState(l.vram_min || ''),
    [x, S] = o.useState(l.condition || '');
  return (
    o.useEffect(() => {
      r({ q: i, min: n, max: c, brand: d, vram_min: y, condition: x });
    }, [i, n, c, d, y, x, r]),
    e.jsxs('div', {
      children: [
        e.jsx(ne, {
          className: 'mb-2',
          placeholder: 'Search title or description',
          value: i,
          onChange: (f) => a(f.target.value),
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(W, {
              placeholder: 'Min price',
              value: n === '' ? void 0 : Number(n),
              onChange: (f) => h(f == null ? '' : String(f)),
              min: 0,
              style: { width: '100%' },
            }),
            e.jsx(W, {
              placeholder: 'Max price',
              value: c === '' ? void 0 : Number(c),
              onChange: (f) => g(f == null ? '' : String(f)),
              min: 0,
              style: { width: '100%' },
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(I, {
              value: d,
              style: { minWidth: 140 },
              onChange: (f) => m(f),
              options: [
                { value: '', label: 'Any brand' },
                { value: 'NVIDIA', label: 'NVIDIA' },
                { value: 'AMD', label: 'AMD' },
              ],
            }),
            e.jsx(I, {
              value: y,
              style: { minWidth: 140 },
              onChange: (f) => v(String(f)),
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
        e.jsx(I, {
          className: 'mb-2',
          value: x,
          onChange: (f) => S(f),
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
                t({ q: i, min: n, max: c, brand: d, vram_min: y, condition: x, page: '1' }),
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
const De = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});
function Le(t) {
  const s = Number(t || 0);
  return De.format(s);
}
function Te(t) {
  if (!t) return '';
  try {
    return new Date(t).toLocaleDateString();
  } catch {
    return '';
  }
}
function Re({
  src: t,
  alt: s = '',
  className: r,
  style: l,
  width: i,
  height: a,
  srcSet: n,
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
    const f = new IntersectionObserver(
      (k) => {
        const E = k[0];
        E && E.isIntersecting && (m(!0), f.disconnect());
      },
      { rootMargin: '200px' },
    );
    return (f.observe(S), () => f.disconnect());
  }, []);
  const x = y && c ? c : t;
  return e.jsx('img', {
    ref: g,
    src: d ? x : void 0,
    srcSet: d ? n : void 0,
    sizes: d ? h : void 0,
    alt: s,
    className: r,
    style: { backgroundColor: '#f5f5f5', ...l },
    width: i,
    height: a,
    loading: 'lazy',
    onError: () => v(!0),
  });
}
function Me({ gpu: t, onDetails: s }) {
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
            children: e.jsx(Re, {
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
                    children: e.jsx('strong', { className: 'text-dark', children: Le(t.price) }),
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
function Oe(t, s = 'GPU Market — Buy & Sell Used GPUs') {
  if (typeof document > 'u') return;
  const r = document.title;
  return (
    (document.title = t),
    () => {
      document.title = r || s;
    }
  );
}
const Ve = o.lazy(() =>
  w(() => import('./DetailsModal-BlnPmAfN.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
);
function q() {
  var V;
  const { getAll: t, setAll: s } = ae(),
    r = t(),
    l = typeof location < 'u' && location.pathname === '/everything',
    [i, a] = o.useState(r.q || ''),
    [n, h] = o.useState(r.sort || (l ? 'price_desc' : 'date_new')),
    [c, g] = o.useState({
      min: r.min || '',
      max: r.max || '',
      brand: r.brand || '',
      vram_min: r.vram_min || '',
      condition: r.condition || '',
    }),
    [d, m] = o.useState(null),
    [y, v] = o.useState(!1),
    [x, S] = o.useState(Number(r.page || '1')),
    [f] = o.useState(12);
  o.useEffect(() => Oe('GPU Market — Shop Graphics Cards'), []);
  const k = o.useMemo(() => {
      let p = 'newest';
      n === 'price_asc'
        ? (p = 'price_asc')
        : n === 'price_desc'
          ? (p = 'price_desc')
          : (n === 'date_new' ||
              n === 'featured' ||
              n === 'best' ||
              n === 'alpha_asc' ||
              n === 'alpha_desc' ||
              n === 'date_old') &&
            (p = 'newest');
      const _ = new URLSearchParams();
      return (
        i && _.set('q', i),
        _.set('sort', p),
        Object.entries(c).forEach(([z, A]) => {
          A && _.set(z, String(A));
        }),
        _.set('page', String(x)),
        _.set('per', String(f)),
        _
      );
    }, [i, n, c, x, f]),
    {
      data: E,
      isLoading: D,
      isError: he,
      refetch: me,
      isFetching: pe,
    } = fe({
      queryKey: ['search', i, n, c, x, f],
      queryFn: async () => (
        s({ q: i, sort: n, page: String(x), ...c }),
        (await B('/api/search?' + k.toString())).json()
      ),
      placeholderData: (p) => p,
      staleTime: 3e4,
      retry: 2,
    });
  o.useEffect(() => {
    const p = document.querySelector('.container');
    p && p.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [x]);
  const O = o.useRef(!1);
  function xe() {
    O.current ||
      ((O.current = !0),
      w(() => import('./DetailsModal-BlnPmAfN.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
      w(() => import('./ImageUploader-DWnjEkzb.js'), __vite__mapDeps([5, 1, 2])));
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
          e.jsx(ne, {
            placeholder: 'Search GPUs...',
            value: i,
            onChange: (p) => a(p.target.value),
          }),
          e.jsx(I, {
            value: n,
            style: { width: 220 },
            onChange: (p) => h(p),
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
          e.jsx(j, { type: 'primary', onClick: () => me(), children: 'Search' }),
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
              e.jsx($, {
                onApply: (p) => {
                  (g((_) => ({ ..._, ...p })), S(1));
                },
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'col-md-8',
            children: [
              he &&
                e.jsx('div', {
                  className: 'my-4',
                  children: e.jsx(G, {
                    status: 'error',
                    title: 'Failed to load list',
                    subTitle: 'Please try again later.',
                  }),
                }),
              e.jsxs('div', {
                className: 'row',
                onMouseEnter: xe,
                children: [
                  (D || pe) &&
                    e.jsx(e.Fragment, {
                      children: Array.from({ length: 4 }).map((p, _) =>
                        e.jsx(
                          'div',
                          {
                            className: 'col-md-6 mb-3',
                            children: e.jsx('div', {
                              className: 'card p-3',
                              children: e.jsx(Se, {}),
                            }),
                          },
                          _,
                        ),
                      ),
                    }),
                  !D &&
                    ((E == null ? void 0 : E.results) || []).map((p) =>
                      e.jsx(
                        'div',
                        {
                          className: 'col-md-6',
                          children: e.jsx(Me, {
                            gpu: p,
                            onDetails: async (_) => {
                              const A = await (await B(`/api/gpus/${_}`)).json();
                              m(A);
                            },
                          }),
                        },
                        p.id,
                      ),
                    ),
                  !D &&
                    (((V = E == null ? void 0 : E.results) == null ? void 0 : V.length) || 0) ===
                      0 &&
                    e.jsx('div', {
                      className: 'col-12',
                      children: e.jsx('div', {
                        className: 'my-4',
                        children: e.jsx(G, {
                          status: 'info',
                          title: 'No results',
                          subTitle:
                            i || c.min || c.max || c.brand || c.vram_min || c.condition
                              ? 'Try adjusting filters or sorting options.'
                              : 'Browse by series from the top menu or apply filters to get started.',
                          extra:
                            i || c.min || c.max || c.brand || c.vram_min || c.condition
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
                children: e.jsx(Ee, {
                  current: x,
                  pageSize: f,
                  total: (E == null ? void 0 : E.total) || 0,
                  onChange: (p) => S(p),
                  showSizeChanger: !1,
                }),
              }),
            ],
          }),
        ],
      }),
      e.jsxs(ie, {
        open: y,
        onClose: () => v(!1),
        children: [
          e.jsx('h5', { className: 'mb-3', children: 'Filters' }),
          e.jsx($, {
            onApply: (p) => {
              (v(!1), g((_) => ({ ..._, ...p })), S(1));
            },
          }),
        ],
      }),
      e.jsx(o.Suspense, {
        fallback: null,
        children: e.jsx(Ve, { item: d, onClose: () => m(null) }),
      }),
    ],
  });
}
function ze() {
  const [t, s] = Ne.useMessage();
  function r(i, a = 'info') {
    const n =
      a === 'error' ? 'error' : a === 'warning' ? 'warning' : a === 'success' ? 'success' : 'info';
    t.open({ type: n, content: i, duration: 3 });
  }
  return { api: { push: r }, messages: s };
}
function We({ messages: t }) {
  return e.jsx(e.Fragment, { children: t });
}
function C({ children: t }) {
  const s = ye(),
    r = M();
  return (
    o.useEffect(() => {
      if (!localStorage.getItem('token')) {
        const i = r.pathname + (r.search || '');
        s('/login', { replace: !0, state: { from: i } });
      }
    }, [s, r]),
    e.jsx(e.Fragment, { children: t })
  );
}
var Ge = {};
const H = (t) => {
    let s;
    const r = new Set(),
      l = (d, m) => {
        const y = typeof d == 'function' ? d(s) : d;
        if (!Object.is(y, s)) {
          const v = s;
          ((s = (m ?? (typeof y != 'object' || y === null)) ? y : Object.assign({}, s, y)),
            r.forEach((x) => x(s, v)));
        }
      },
      i = () => s,
      c = {
        setState: l,
        getState: i,
        getInitialState: () => g,
        subscribe: (d) => (r.add(d), () => r.delete(d)),
        destroy: () => {
          ((Ge ? 'production' : void 0) !== 'production' &&
            console.warn(
              '[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.',
            ),
            r.clear());
        },
      },
      g = (s = t(l, i, c));
    return c;
  },
  Ue = (t) => (t ? H(t) : H);
var le = { exports: {} },
  oe = {},
  ce = { exports: {} },
  de = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var N = o;
function Fe(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var Be = typeof Object.is == 'function' ? Object.is : Fe,
  $e = N.useState,
  qe = N.useEffect,
  He = N.useLayoutEffect,
  Qe = N.useDebugValue;
function Ye(t, s) {
  var r = s(),
    l = $e({ inst: { value: r, getSnapshot: s } }),
    i = l[0].inst,
    a = l[1];
  return (
    He(
      function () {
        ((i.value = r), (i.getSnapshot = s), L(i) && a({ inst: i }));
      },
      [t, r, s],
    ),
    qe(
      function () {
        return (
          L(i) && a({ inst: i }),
          t(function () {
            L(i) && a({ inst: i });
          })
        );
      },
      [t],
    ),
    Qe(r),
    r
  );
}
function L(t) {
  var s = t.getSnapshot;
  t = t.value;
  try {
    var r = s();
    return !Be(t, r);
  } catch {
    return !0;
  }
}
function Je(t, s) {
  return s();
}
var Ke =
  typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'
    ? Je
    : Ye;
de.useSyncExternalStore = N.useSyncExternalStore !== void 0 ? N.useSyncExternalStore : Ke;
ce.exports = de;
var Ze = ce.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var P = o,
  Xe = Ze;
function et(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var tt = typeof Object.is == 'function' ? Object.is : et,
  st = Xe.useSyncExternalStore,
  rt = P.useRef,
  nt = P.useEffect,
  it = P.useMemo,
  at = P.useDebugValue;
oe.useSyncExternalStoreWithSelector = function (t, s, r, l, i) {
  var a = rt(null);
  if (a.current === null) {
    var n = { hasValue: !1, value: null };
    a.current = n;
  } else n = a.current;
  a = it(
    function () {
      function c(v) {
        if (!g) {
          if (((g = !0), (d = v), (v = l(v)), i !== void 0 && n.hasValue)) {
            var x = n.value;
            if (i(x, v)) return (m = x);
          }
          return (m = v);
        }
        if (((x = m), tt(d, v))) return x;
        var S = l(v);
        return i !== void 0 && i(x, S) ? ((d = v), x) : ((d = v), (m = S));
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
    [s, r, l, i],
  );
  var h = st(t, a[0], a[1]);
  return (
    nt(
      function () {
        ((n.hasValue = !0), (n.value = h));
      },
      [h],
    ),
    at(h),
    h
  );
};
le.exports = oe;
var lt = le.exports;
const ot = be(lt);
var ue = {};
const { useDebugValue: ct } = re,
  { useSyncExternalStoreWithSelector: dt } = ot;
let Q = !1;
const ut = (t) => t;
function ht(t, s = ut, r) {
  (ue ? 'production' : void 0) !== 'production' &&
    r &&
    !Q &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (Q = !0));
  const l = dt(t.subscribe, t.getState, t.getServerState || t.getInitialState, s, r);
  return (ct(l), l);
}
const Y = (t) => {
    (ue ? 'production' : void 0) !== 'production' &&
      typeof t != 'function' &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const s = typeof t == 'function' ? Ue(t) : t,
      r = (l, i) => ht(s, l, i);
    return (Object.assign(r, s), r);
  },
  mt = (t) => (t ? Y(t) : Y);
function J(t) {
  try {
    const s = t.split('.')[1] || '';
    return JSON.parse(atob(s));
  } catch {
    return null;
  }
}
const pt = mt((t) => ({
  token: null,
  user: null,
  init: () => {
    const s = localStorage.getItem('token');
    if (s) {
      const r = J(s);
      t({
        token: s,
        user: r ? { id: r.id, username: r.username, display_name: r.display_name } : null,
      });
    }
  },
  login: (s) => {
    localStorage.setItem('token', s);
    const r = J(s);
    t({
      token: s,
      user: r ? { id: r.id, username: r.username, display_name: r.display_name } : null,
    });
  },
  logout: () => {
    (localStorage.removeItem('token'), t({ token: null, user: null }));
  },
}));
function xt(t, s) {
  return `scroll:${t}${s}`;
}
function ft() {
  const t = M();
  o.useEffect(() => {
    const s = xt(t.pathname, t.search),
      r = sessionStorage.getItem(s);
    if (r) {
      const a = parseInt(r, 10);
      Number.isNaN(a) || setTimeout(() => window.scrollTo(0, a), 0);
    } else window.scrollTo(0, 0);
    function l() {
      sessionStorage.setItem(s, String(window.scrollY));
    }
    window.addEventListener('beforeunload', l);
    const i = () => {
      const a = sessionStorage.getItem(s),
        n = a ? parseInt(a, 10) : 0;
      setTimeout(() => window.scrollTo(0, Number.isNaN(n) ? 0 : n), 0);
    };
    return (
      window.addEventListener('popstate', i),
      () => {
        (window.removeEventListener('beforeunload', l),
          window.removeEventListener('popstate', i),
          l());
      }
    );
  }, [t.pathname, t.search]);
}
var X, ee, te, se;
const R = {
  contactWhatsApp:
    (typeof import.meta < 'u' &&
      ((ee = (X = import.meta) == null ? void 0 : X.env) == null
        ? void 0
        : ee.VITE_CONTACT_WHATSAPP)) ||
    null,
  contactEmail:
    (typeof import.meta < 'u' &&
      ((se = (te = import.meta) == null ? void 0 : te.env) == null
        ? void 0
        : se.VITE_CONTACT_EMAIL)) ||
    null,
};
function jt() {
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
                  href: `https://wa.me/${R.contactWhatsApp || '447747310027'}`,
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
                  href: `mailto:${R.contactEmail || 'x1657217402@gmail.com'}`,
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
function yt() {
  return e.jsxs('div', {
    className: 'container py-5 text-center',
    children: [
      e.jsx('h1', { className: 'display-5', children: '500' }),
      e.jsx('p', { className: 'lead', children: 'Unexpected server error.' }),
      e.jsx('a', { className: 'btn btn-primary', href: '/', children: 'Go Home' }),
    ],
  });
}
function bt() {
  const s = `https://wa.me/${R.contactWhatsApp || '447747310027'}?text=Hi%20:)`,
    { pathname: r } = M();
  return ['/login', '/register', '/500'].includes(r)
    ? null
    : (o.useEffect(() => {
        const i = (h) => {
          document.documentElement.style.setProperty('--fab-bottom', `${h}px`);
        };
        i(16);
        const a = window.visualViewport;
        if (!a) return;
        const n = () => {
          const h = window.innerHeight - a.height;
          i(h > 120 ? 80 : 16);
        };
        return (
          a.addEventListener('resize', n),
          a.addEventListener('scroll', n),
          () => {
            (a.removeEventListener('resize', n), a.removeEventListener('scroll', n));
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
const wt = o.lazy(() => w(() => import('./Profile-BEaAkLu5.js'), __vite__mapDeps([6, 1, 2, 4]))),
  _t = o.lazy(() => w(() => import('./Login-1gZuE8A9.js'), __vite__mapDeps([7, 1, 2, 8, 9, 4]))),
  St = o.lazy(() =>
    w(() => import('./Register-BO1RYHAi.js'), __vite__mapDeps([10, 1, 2, 8, 9, 4])),
  ),
  Et = o.lazy(() => w(() => import('./MyListings-Ci-kEXP9.js'), __vite__mapDeps([11, 1, 2, 4]))),
  Nt = o.lazy(() => w(() => import('./Detail-Dq917BP-.js'), __vite__mapDeps([12, 1, 2, 3, 4]))),
  At = o.lazy(() => w(() => import('./Sell-MnPY1_db.js'), __vite__mapDeps([13, 1, 2, 8, 9, 4]))),
  Ct = o.lazy(() => w(() => import('./Edit-jegaVGNc.js'), __vite__mapDeps([14, 1, 2, 8, 9, 4]))),
  It = o.lazy(() => w(() => import('./NotFound-Bq8LLBzl.js'), __vite__mapDeps([15, 1, 2, 4]))),
  Pt = o.lazy(() =>
    w(() => import('./ProfileEdit-C0svmWmd.js'), __vite__mapDeps([16, 1, 2, 8, 4])),
  ),
  kt = o.lazy(() =>
    w(() => import('./SellToUs-CsfYInoF.js'), __vite__mapDeps([17, 1, 2, 9, 8, 4])),
  ),
  Dt = o.lazy(() => w(() => import('./Contact-CnIiPCU1.js'), __vite__mapDeps([18, 1, 2, 9, 8, 4]))),
  Lt = o.lazy(() => w(() => import('./Returns-CybxWZqr.js'), __vite__mapDeps([19, 1, 2])));
function Tt() {
  const { api: t, messages: s } = ze(),
    { user: r, init: l, logout: i } = pt();
  (ft(),
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
  const [a, n] = o.useState(!1),
    h = e.jsx(Ce, {
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
      e.jsx('a', { href: '#main', className: 'skip-link', children: 'Skip to content' }),
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
                e.jsx(Ae, {
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
                      (i(),
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
              children: e.jsx(j, { size: 'small', onClick: () => n(!0), children: 'Menu' }),
            }),
          ],
        }),
      }),
      e.jsx(ie, {
        open: a,
        onClose: () => n(!1),
        afterOpenChange: (c) => {
          try {
            document.body.style.overflow = c ? 'hidden' : '';
          } catch {}
        },
        children: e.jsxs('div', {
          className: 'd-flex flex-column gap-2',
          children: [
            e.jsx(u, { to: '/', onClick: () => n(!1), children: 'Home' }),
            e.jsx(u, {
              to: '/everything?sort=price_desc',
              onClick: () => n(!1),
              children: 'Shop Everything',
            }),
            e.jsx('div', { className: 'fw-bold', children: 'Shop Graphics Cards' }),
            e.jsx(u, { to: '/?brand=NVIDIA', onClick: () => n(!1), children: 'NVIDIA' }),
            e.jsx(u, { to: '/?brand=AMD', onClick: () => n(!1), children: 'AMD' }),
            e.jsx(u, { to: '/sell', onClick: () => n(!1), children: 'Sell' }),
            e.jsx(u, { to: '/sell-to-us', onClick: () => n(!1), children: 'Sell to us' }),
            e.jsx(u, { to: '/my', onClick: () => n(!1), children: 'My Listings' }),
            e.jsx(u, { to: '/profile', onClick: () => n(!1), children: 'My Profile' }),
            !r && e.jsx(u, { to: '/login', onClick: () => n(!1), children: 'Login' }),
            !r && e.jsx(u, { to: '/register', onClick: () => n(!1), children: 'Register' }),
            r &&
              e.jsx('button', {
                className: 'btn btn-outline-danger btn-sm',
                onClick: () => {
                  (n(!1),
                    i(),
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
        children: e.jsxs(we, {
          children: [
            e.jsx(b, { path: '/', element: e.jsx(q, {}) }),
            e.jsx(b, { path: '/everything', element: e.jsx(q, {}) }),
            e.jsx(b, { path: '/profile', element: e.jsx(wt, {}) }),
            e.jsx(b, { path: '/profile/edit', element: e.jsx(C, { children: e.jsx(Pt, {}) }) }),
            e.jsx(b, { path: '/g/:id', element: e.jsx(Nt, {}) }),
            e.jsx(b, { path: '/sell', element: e.jsx(C, { children: e.jsx(At, {}) }) }),
            e.jsx(b, { path: '/sell-to-us', element: e.jsx(kt, {}) }),
            e.jsx(b, { path: '/contact', element: e.jsx(Dt, {}) }),
            e.jsx(b, { path: '/edit/:id', element: e.jsx(C, { children: e.jsx(Ct, {}) }) }),
            e.jsx(b, { path: '*', element: e.jsx(It, {}) }),
            e.jsx(b, { path: '/about', element: e.jsx(jt, {}) }),
            e.jsx(b, { path: '/privacy', element: e.jsx(vt, {}) }),
            e.jsx(b, { path: '/terms', element: e.jsx(gt, {}) }),
            e.jsx(b, { path: '/returns', element: e.jsx(Lt, {}) }),
            e.jsx(b, { path: '/500', element: e.jsx(yt, {}) }),
            e.jsx(b, { path: '/login', element: e.jsx(_t, {}) }),
            e.jsx(b, { path: '/register', element: e.jsx(St, {}) }),
            e.jsx(b, { path: '/my', element: e.jsx(C, { children: e.jsx(Et, {}) }) }),
          ],
        }),
      }),
      e.jsx(We, { messages: s }),
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
                        e.jsx(u, { to: '/returns', children: 'Returns & Refunds' }),
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
      e.jsx(bt, {}),
    ],
  });
}
class Rt extends o.Component {
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
const Mt = new je();
T.createRoot(document.getElementById('root')).render(
  e.jsx(re.StrictMode, {
    children: e.jsx(Rt, {
      children: e.jsx(ve, { client: Mt, children: e.jsx(_e, { children: e.jsx(Tt, {}) }) }),
    }),
  }),
);
export { Me as G, w as _, B as a, R as c, Le as f, pt as u };

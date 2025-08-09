const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/DetailsModal-Bd05p2ET.js',
      'assets/react-query-BGeIQRPr.js',
      'assets/react-CTDr35rJ.js',
      'assets/DetailsView-CNdAgkdP.js',
      'assets/antd-n40S5sxn.js',
      'assets/ImageUploader-DWnjEkzb.js',
      'assets/Profile-CU7matqf.js',
      'assets/Login-Bmq7E44B.js',
      'assets/FormField-iyrhpl26.js',
      'assets/zod-SQF3v9p3.js',
      'assets/Register-CG94LnDZ.js',
      'assets/MyListings-BgblfaqE.js',
      'assets/Detail-Da_iDBBw.js',
      'assets/Sell-C4byLGCt.js',
      'assets/Edit-CQCD3esS.js',
      'assets/NotFound-Bq8LLBzl.js',
      'assets/ProfileEdit-B62bD3S_.js',
      'assets/SellToUs-BIIDQw1A.js',
      'assets/Contact-DrcU2V_Y.js',
    ]),
) => i.map((i) => d[i]);
import { j as e, u as me, Q as he, a as fe } from './react-query-BGeIQRPr.js';
import {
  c as xe,
  r as o,
  u as pe,
  e as Z,
  g as ve,
  R as X,
  L as u,
  f as je,
  h as b,
  B as ge,
} from './react-CTDr35rJ.js';
import {
  I as ee,
  T as z,
  S as P,
  B as v,
  R as G,
  a as ye,
  P as be,
  D as te,
  s as _e,
  b as we,
  M as Se,
} from './antd-n40S5sxn.js';
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) l(n);
  new MutationObserver((n) => {
    for (const i of n)
      if (i.type === 'childList')
        for (const a of i.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && l(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(n) {
    const i = {};
    return (
      n.integrity && (i.integrity = n.integrity),
      n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : n.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function l(n) {
    if (n.ep) return;
    n.ep = !0;
    const i = r(n);
    fetch(n.href, i);
  }
})();
var T = {},
  U = xe;
((T.createRoot = U.createRoot), (T.hydrateRoot = U.hydrateRoot));
const Ne = 'modulepreload',
  Ee = function (t) {
    return '/' + t;
  },
  B = {},
  w = function (s, r, l) {
    let n = Promise.resolve();
    if (r && r.length > 0) {
      document.getElementsByTagName('link');
      const i = document.querySelector('meta[property=csp-nonce]'),
        a = (i == null ? void 0 : i.nonce) || (i == null ? void 0 : i.getAttribute('nonce'));
      n = Promise.all(
        r.map((h) => {
          if (((h = Ee(h)), h in B)) return;
          B[h] = !0;
          const c = h.endsWith('.css'),
            g = c ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${h}"]${g}`)) return;
          const d = document.createElement('link');
          if (
            ((d.rel = c ? 'stylesheet' : Ne),
            c || ((d.as = 'script'), (d.crossOrigin = '')),
            (d.href = h),
            a && d.setAttribute('nonce', a),
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
      .catch((i) => {
        const a = new Event('vite:preloadError', { cancelable: !0 });
        if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented)) throw i;
      });
  };
var K, Y;
const Ae =
  (typeof import.meta < 'u' &&
    ((Y = (K = import.meta) == null ? void 0 : K.env) == null ? void 0 : Y.VITE_API_BASE)) ||
  window.location.origin;
async function F(t, s = {}) {
  const r = new Headers(s.headers || {}),
    l = localStorage.getItem('token');
  l && !r.has('Authorization') && r.set('Authorization', 'Bearer ' + l);
  let n;
  try {
    n = await fetch(t.startsWith('http') ? t : Ae + t, { ...s, headers: r });
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
  const i = n.headers.get('x-request-id');
  if (i) {
    const a = document.getElementById('reqIdBadge');
    a && (a.textContent = i);
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
      const { pathname: a, search: h } = window.location;
      if (
        [
          (m) => m === '/sell',
          (m) => m.startsWith('/edit/'),
          (m) => m === '/my',
          (m) => m === '/profile/edit',
        ].some((m) => m(a)) &&
        !(a === '/login')
      ) {
        try {
          sessionStorage.setItem('from', a + (h || ''));
        } catch {}
        window.location.href = '/login';
      }
    } catch {}
  }
  return n;
}
function se() {
  const t = o.useMemo(() => new URLSearchParams(location.search), [location.search]),
    s = o.useCallback(() => Object.fromEntries(t.entries()), [t]),
    r = o.useCallback((l) => {
      const n = new URLSearchParams(location.search);
      (Object.entries(l).forEach(([i, a]) => {
        a === void 0 || a === '' ? n.delete(i) : n.set(i, String(a));
      }),
        history.replaceState({}, '', `?${n.toString()}`));
    }, []);
  return { getAll: s, setAll: r };
}
function $({ onApply: t }) {
  const { getAll: s, setAll: r } = se(),
    l = s(),
    [n, i] = o.useState(l.q || ''),
    [a, h] = o.useState(l.min || ''),
    [c, g] = o.useState(l.max || ''),
    [d, m] = o.useState(l.brand || ''),
    [y, j] = o.useState(l.vram_min || ''),
    [x, S] = o.useState(l.condition || '');
  return (
    o.useEffect(() => {
      r({ q: n, min: a, max: c, brand: d, vram_min: y, condition: x });
    }, [n, a, c, d, y, x, r]),
    e.jsxs('div', {
      children: [
        e.jsx(ee, {
          className: 'mb-2',
          placeholder: 'Search title or description',
          value: n,
          onChange: (p) => i(p.target.value),
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(z, {
              placeholder: 'Min price',
              value: a === '' ? void 0 : Number(a),
              onChange: (p) => h(p == null ? '' : String(p)),
              min: 0,
              style: { width: '100%' },
            }),
            e.jsx(z, {
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
            e.jsx(P, {
              value: d,
              style: { minWidth: 140 },
              onChange: (p) => m(p),
              options: [
                { value: '', label: 'Any brand' },
                { value: 'NVIDIA', label: 'NVIDIA' },
                { value: 'AMD', label: 'AMD' },
              ],
            }),
            e.jsx(P, {
              value: y,
              style: { minWidth: 140 },
              onChange: (p) => j(String(p)),
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
        e.jsx(P, {
          className: 'mb-2',
          value: x,
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
            e.jsx(v, {
              type: 'primary',
              onClick: () =>
                t({ q: n, min: a, max: c, brand: d, vram_min: y, condition: x, page: '1' }),
              children: 'Search',
            }),
            e.jsx(v, {
              onClick: () => {
                (i(''),
                  h(''),
                  g(''),
                  m(''),
                  j(''),
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
const Ie = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});
function Pe(t) {
  const s = Number(t || 0);
  return Ie.format(s);
}
function De(t) {
  if (!t) return '';
  try {
    return new Date(t).toLocaleDateString();
  } catch {
    return '';
  }
}
function Ce({
  src: t,
  alt: s = '',
  className: r,
  style: l,
  width: n,
  height: i,
  srcSet: a,
  sizes: h,
  fallbackSrc: c,
}) {
  const g = o.useRef(null),
    [d, m] = o.useState(!1),
    [y, j] = o.useState(!1);
  o.useEffect(() => {
    const S = g.current;
    if (!S) return;
    if (!('IntersectionObserver' in window)) {
      m(!0);
      return;
    }
    const p = new IntersectionObserver(
      (k) => {
        const N = k[0];
        N && N.isIntersecting && (m(!0), p.disconnect());
      },
      { rootMargin: '200px' },
    );
    return (p.observe(S), () => p.disconnect());
  }, []);
  const x = y && c ? c : t;
  return e.jsx('img', {
    ref: g,
    src: d ? x : void 0,
    srcSet: d ? a : void 0,
    sizes: d ? h : void 0,
    alt: s,
    className: r,
    style: { backgroundColor: '#f5f5f5', ...l },
    width: n,
    height: i,
    loading: 'lazy',
    onError: () => j(!0),
  });
}
function ke({ gpu: t, onDetails: s }) {
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
            children: e.jsx(Ce, {
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
                    children: e.jsx('strong', { className: 'text-dark', children: Pe(t.price) }),
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
                      children: ['Added: ', De(t.created_at)],
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
function D(t, s = 'GPU Market — Buy & Sell Used GPUs') {
  if (typeof document > 'u') return;
  const r = document.title;
  return (
    (document.title = t || s),
    () => {
      document.title = r || s;
    }
  );
}
const Le = o.lazy(() =>
  w(() => import('./DetailsModal-Bd05p2ET.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
);
function q() {
  var O;
  const { getAll: t, setAll: s } = se(),
    r = t(),
    l = typeof location < 'u' && location.pathname === '/everything',
    [n, i] = o.useState(r.q || ''),
    [a, h] = o.useState(r.sort || (l ? 'price_desc' : 'date_new')),
    [c, g] = o.useState({
      min: r.min || '',
      max: r.max || '',
      brand: r.brand || '',
      vram_min: r.vram_min || '',
      condition: r.condition || '',
    }),
    [d, m] = o.useState(null),
    [y, j] = o.useState(!1),
    [x, S] = o.useState(Number(r.page || '1')),
    [p] = o.useState(12);
  o.useEffect(() => D('GPU Market — Shop Graphics Cards'), []);
  const k = o.useMemo(() => {
      let f = 'newest';
      a === 'price_asc'
        ? (f = 'price_asc')
        : a === 'price_desc'
          ? (f = 'price_desc')
          : (a === 'date_new' ||
              a === 'featured' ||
              a === 'best' ||
              a === 'alpha_asc' ||
              a === 'alpha_desc' ||
              a === 'date_old') &&
            (f = 'newest');
      const _ = new URLSearchParams();
      return (
        n && _.set('q', n),
        _.set('sort', f),
        Object.entries(c).forEach(([V, A]) => {
          A && _.set(V, String(A));
        }),
        _.set('page', String(x)),
        _.set('per', String(p)),
        _
      );
    }, [n, a, c, x, p]),
    {
      data: N,
      isLoading: L,
      isError: oe,
      refetch: ce,
      isFetching: de,
    } = me({
      queryKey: ['search', n, a, c, x, p],
      queryFn: async () => (
        s({ q: n, sort: a, page: String(x), ...c }),
        (await F('/api/search?' + k.toString())).json()
      ),
      placeholderData: (f) => f,
      staleTime: 3e4,
      retry: 2,
    });
  o.useEffect(() => {
    const f = document.querySelector('.container');
    f && f.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [x]);
  const M = o.useRef(!1);
  function ue() {
    M.current ||
      ((M.current = !0),
      w(() => import('./DetailsModal-Bd05p2ET.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
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
          e.jsx(ee, {
            placeholder: 'Search GPUs...',
            value: n,
            onChange: (f) => i(f.target.value),
          }),
          e.jsx(P, {
            value: a,
            style: { width: 220 },
            onChange: (f) => h(f),
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
          e.jsx(v, { type: 'primary', onClick: () => ce(), children: 'Search' }),
          e.jsx(v, { onClick: () => j(!0), className: 'd-md-none', children: 'Filters' }),
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
                onApply: (f) => {
                  (g((_) => ({ ..._, ...f })), S(1));
                },
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'col-md-8',
            children: [
              oe &&
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
                onMouseEnter: ue,
                children: [
                  (L || de) &&
                    e.jsx(e.Fragment, {
                      children: Array.from({ length: 4 }).map((f, _) =>
                        e.jsx(
                          'div',
                          {
                            className: 'col-md-6 mb-3',
                            children: e.jsx('div', {
                              className: 'card p-3',
                              children: e.jsx(ye, {}),
                            }),
                          },
                          _,
                        ),
                      ),
                    }),
                  !L &&
                    ((N == null ? void 0 : N.results) || []).map((f) =>
                      e.jsx(
                        'div',
                        {
                          className: 'col-md-6',
                          children: e.jsx(ke, {
                            gpu: f,
                            onDetails: async (_) => {
                              const A = await (await F(`/api/gpus/${_}`)).json();
                              m(A);
                            },
                          }),
                        },
                        f.id,
                      ),
                    ),
                  !L &&
                    (((O = N == null ? void 0 : N.results) == null ? void 0 : O.length) || 0) ===
                      0 &&
                    e.jsx('div', {
                      className: 'col-12',
                      children: e.jsx('div', {
                        className: 'my-4',
                        children: e.jsx(G, {
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
                                  children: e.jsx(v, {
                                    onClick: () => {
                                      (i(''),
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
                                    e.jsx(v, {
                                      href: '/?brand=NVIDIA&vram_min=12',
                                      children: 'NVIDIA 40 Series',
                                    }),
                                    e.jsx(v, {
                                      href: '/?brand=NVIDIA&vram_min=8',
                                      children: 'NVIDIA 30 Series',
                                    }),
                                    e.jsx(v, {
                                      href: '/?brand=AMD&vram_min=12',
                                      children: 'AMD 7000 Series',
                                    }),
                                    e.jsx(v, {
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
                children: e.jsx(be, {
                  current: x,
                  pageSize: p,
                  total: (N == null ? void 0 : N.total) || 0,
                  onChange: (f) => S(f),
                  showSizeChanger: !1,
                }),
              }),
            ],
          }),
        ],
      }),
      e.jsxs(te, {
        open: y,
        onClose: () => j(!1),
        children: [
          e.jsx('h5', { className: 'mb-3', children: 'Filters' }),
          e.jsx($, {
            onApply: (f) => {
              (j(!1), g((_) => ({ ..._, ...f })), S(1));
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
  const [t, s] = _e.useMessage();
  function r(n, i = 'info') {
    const a =
      i === 'error' ? 'error' : i === 'warning' ? 'warning' : i === 'success' ? 'success' : 'info';
    t.open({ type: a, content: n, duration: 3 });
  }
  return { api: { push: r }, messages: s };
}
function Te({ messages: t }) {
  return e.jsx(e.Fragment, { children: t });
}
function I({ children: t }) {
  const s = pe(),
    r = Z();
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
const W = (t) => {
    let s;
    const r = new Set(),
      l = (d, m) => {
        const y = typeof d == 'function' ? d(s) : d;
        if (!Object.is(y, s)) {
          const j = s;
          ((s = (m ?? (typeof y != 'object' || y === null)) ? y : Object.assign({}, s, y)),
            r.forEach((x) => x(s, j)));
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
  Oe = (t) => (t ? W(t) : W);
var re = { exports: {} },
  ne = {},
  ae = { exports: {} },
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
  Be = E.useLayoutEffect,
  Fe = E.useDebugValue;
function $e(t, s) {
  var r = s(),
    l = Ge({ inst: { value: r, getSnapshot: s } }),
    n = l[0].inst,
    i = l[1];
  return (
    Be(
      function () {
        ((n.value = r), (n.getSnapshot = s), R(n) && i({ inst: n }));
      },
      [t, r, s],
    ),
    Ue(
      function () {
        return (
          R(n) && i({ inst: n }),
          t(function () {
            R(n) && i({ inst: n });
          })
        );
      },
      [t],
    ),
    Fe(r),
    r
  );
}
function R(t) {
  var s = t.getSnapshot;
  t = t.value;
  try {
    var r = s();
    return !ze(t, r);
  } catch {
    return !0;
  }
}
function qe(t, s) {
  return s();
}
var We =
  typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'
    ? qe
    : $e;
ie.useSyncExternalStore = E.useSyncExternalStore !== void 0 ? E.useSyncExternalStore : We;
ae.exports = ie;
var Qe = ae.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var C = o,
  He = Qe;
function Je(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var Ke = typeof Object.is == 'function' ? Object.is : Je,
  Ye = He.useSyncExternalStore,
  Ze = C.useRef,
  Xe = C.useEffect,
  et = C.useMemo,
  tt = C.useDebugValue;
ne.useSyncExternalStoreWithSelector = function (t, s, r, l, n) {
  var i = Ze(null);
  if (i.current === null) {
    var a = { hasValue: !1, value: null };
    i.current = a;
  } else a = i.current;
  i = et(
    function () {
      function c(j) {
        if (!g) {
          if (((g = !0), (d = j), (j = l(j)), n !== void 0 && a.hasValue)) {
            var x = a.value;
            if (n(x, j)) return (m = x);
          }
          return (m = j);
        }
        if (((x = m), Ke(d, j))) return x;
        var S = l(j);
        return n !== void 0 && n(x, S) ? ((d = j), x) : ((d = j), (m = S));
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
  var h = Ye(t, i[0], i[1]);
  return (
    Xe(
      function () {
        ((a.hasValue = !0), (a.value = h));
      },
      [h],
    ),
    tt(h),
    h
  );
};
re.exports = ne;
var st = re.exports;
const rt = ve(st);
var le = {};
const { useDebugValue: nt } = X,
  { useSyncExternalStoreWithSelector: at } = rt;
let Q = !1;
const it = (t) => t;
function lt(t, s = it, r) {
  (le ? 'production' : void 0) !== 'production' &&
    r &&
    !Q &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (Q = !0));
  const l = at(t.subscribe, t.getState, t.getServerState || t.getInitialState, s, r);
  return (nt(l), l);
}
const H = (t) => {
    (le ? 'production' : void 0) !== 'production' &&
      typeof t != 'function' &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const s = typeof t == 'function' ? Oe(t) : t,
      r = (l, n) => lt(s, l, n);
    return (Object.assign(r, s), r);
  },
  ot = (t) => (t ? H(t) : H);
function J(t) {
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
function dt(t, s) {
  return `scroll:${t}${s}`;
}
function ut() {
  const t = Z();
  o.useEffect(() => {
    const s = dt(t.pathname, t.search),
      r = sessionStorage.getItem(s);
    if (r) {
      const i = parseInt(r, 10);
      Number.isNaN(i) || setTimeout(() => window.scrollTo(0, i), 0);
    } else window.scrollTo(0, 0);
    function l() {
      sessionStorage.setItem(s, String(window.scrollY));
    }
    window.addEventListener('beforeunload', l);
    const n = () => {
      const i = sessionStorage.getItem(s),
        a = i ? parseInt(i, 10) : 0;
      setTimeout(() => window.scrollTo(0, Number.isNaN(a) ? 0 : a), 0);
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
    o.useEffect(() => D('About — GPU Market'), []),
    e.jsxs('div', {
      className: 'container py-4',
      children: [
        e.jsx('h3', { children: 'About' }),
        e.jsx('p', {
          className: 'text-muted',
          children: 'GPU Market is a minimal marketplace demo for buying and selling used GPUs.',
        }),
      ],
    })
  );
}
function ht() {
  return (
    o.useEffect(() => D('Privacy — GPU Market'), []),
    e.jsxs('div', {
      className: 'container py-4',
      children: [
        e.jsx('h3', { children: 'Privacy Policy' }),
        e.jsx('p', {
          className: 'text-muted',
          children:
            'We respect your privacy. This demo does not collect personal data beyond what is necessary for authentication.',
        }),
      ],
    })
  );
}
function ft() {
  return (
    o.useEffect(() => D('Terms — GPU Market'), []),
    e.jsxs('div', {
      className: 'container py-4',
      children: [
        e.jsx('h3', { children: 'Terms' }),
        e.jsx('p', {
          className: 'text-muted',
          children: 'Use this demo at your own risk. No warranties provided.',
        }),
      ],
    })
  );
}
function xt() {
  return e.jsxs('div', {
    className: 'container py-5 text-center',
    children: [
      e.jsx('h1', { className: 'display-5', children: '500' }),
      e.jsx('p', { className: 'lead', children: 'Unexpected server error.' }),
      e.jsx('a', { className: 'btn btn-primary', href: '/', children: 'Go Home' }),
    ],
  });
}
const pt = o.lazy(() => w(() => import('./Profile-CU7matqf.js'), __vite__mapDeps([6, 1, 2, 4]))),
  vt = o.lazy(() => w(() => import('./Login-Bmq7E44B.js'), __vite__mapDeps([7, 1, 2, 8, 9, 4]))),
  jt = o.lazy(() =>
    w(() => import('./Register-CG94LnDZ.js'), __vite__mapDeps([10, 1, 2, 8, 9, 4])),
  ),
  gt = o.lazy(() => w(() => import('./MyListings-BgblfaqE.js'), __vite__mapDeps([11, 1, 2, 4]))),
  yt = o.lazy(() => w(() => import('./Detail-Da_iDBBw.js'), __vite__mapDeps([12, 1, 2, 3, 4]))),
  bt = o.lazy(() => w(() => import('./Sell-C4byLGCt.js'), __vite__mapDeps([13, 1, 2, 8, 9, 4]))),
  _t = o.lazy(() => w(() => import('./Edit-CQCD3esS.js'), __vite__mapDeps([14, 1, 2, 8, 9, 4]))),
  wt = o.lazy(() => w(() => import('./NotFound-Bq8LLBzl.js'), __vite__mapDeps([15, 1, 2, 4]))),
  St = o.lazy(() =>
    w(() => import('./ProfileEdit-B62bD3S_.js'), __vite__mapDeps([16, 1, 2, 8, 4])),
  ),
  Nt = o.lazy(() =>
    w(() => import('./SellToUs-BIIDQw1A.js'), __vite__mapDeps([17, 1, 2, 9, 8, 4])),
  ),
  Et = o.lazy(() => w(() => import('./Contact-DrcU2V_Y.js'), __vite__mapDeps([18, 1, 2, 9, 8, 4])));
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
  const [i, a] = o.useState(!1),
    h = e.jsx(Se, {
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
                  children: e.jsx(v, { type: 'text', size: 'small', children: 'Home' }),
                }),
                e.jsx(u, {
                  to: '/everything?sort=price_desc',
                  children: e.jsx(v, { type: 'text', size: 'small', children: 'Shop Everything' }),
                }),
                e.jsx(we, {
                  overlay: h,
                  trigger: ['click'],
                  children: e.jsx(v, { size: 'small', children: 'Shop Graphics Cards' }),
                }),
                e.jsx(u, {
                  to: '/sell',
                  children: e.jsx(v, { size: 'small', type: 'default', children: 'Sell' }),
                }),
                e.jsx(u, {
                  to: '/sell-to-us',
                  children: e.jsx(v, { size: 'small', type: 'default', children: 'Sell to us' }),
                }),
                e.jsx(u, {
                  to: '/my',
                  children: e.jsx(v, { size: 'small', type: 'default', children: 'My Listings' }),
                }),
                e.jsx(u, {
                  to: '/profile',
                  children: e.jsx(v, { size: 'small', type: 'default', children: 'My Profile' }),
                }),
                r &&
                  e.jsx(u, {
                    to: '/profile/edit',
                    children: e.jsx(v, {
                      size: 'small',
                      type: 'default',
                      children: 'Edit Profile',
                    }),
                  }),
                !r &&
                  e.jsx(u, {
                    to: '/login',
                    children: e.jsx(v, { size: 'small', type: 'primary', children: 'Login' }),
                  }),
                !r &&
                  e.jsx(u, {
                    to: '/register',
                    children: e.jsx(v, { size: 'small', type: 'primary', children: 'Register' }),
                  }),
                r &&
                  e.jsx('span', {
                    className: 'align-self-center small text-muted',
                    children: r.display_name || r.username,
                  }),
                r &&
                  e.jsx(v, {
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
              children: e.jsx(v, { size: 'small', onClick: () => a(!0), children: 'Menu' }),
            }),
          ],
        }),
      }),
      e.jsx(te, {
        open: i,
        onClose: () => a(!1),
        afterOpenChange: (c) => {
          try {
            document.body.style.overflow = c ? 'hidden' : '';
          } catch {}
        },
        children: e.jsxs('div', {
          className: 'd-flex flex-column gap-2',
          children: [
            e.jsx(u, { to: '/', onClick: () => a(!1), children: 'Home' }),
            e.jsx(u, {
              to: '/everything?sort=price_desc',
              onClick: () => a(!1),
              children: 'Shop Everything',
            }),
            e.jsx('div', { className: 'fw-bold', children: 'Shop Graphics Cards' }),
            e.jsx(u, { to: '/?brand=NVIDIA', onClick: () => a(!1), children: 'NVIDIA' }),
            e.jsx(u, { to: '/?brand=AMD', onClick: () => a(!1), children: 'AMD' }),
            e.jsx(u, { to: '/sell', onClick: () => a(!1), children: 'Sell' }),
            e.jsx(u, { to: '/sell-to-us', onClick: () => a(!1), children: 'Sell to us' }),
            e.jsx(u, { to: '/my', onClick: () => a(!1), children: 'My Listings' }),
            e.jsx(u, { to: '/profile', onClick: () => a(!1), children: 'My Profile' }),
            !r && e.jsx(u, { to: '/login', onClick: () => a(!1), children: 'Login' }),
            !r && e.jsx(u, { to: '/register', onClick: () => a(!1), children: 'Register' }),
            r &&
              e.jsx('button', {
                className: 'btn btn-outline-danger btn-sm',
                onClick: () => {
                  (a(!1),
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
            e.jsx(b, { path: '/', element: e.jsx(q, {}) }),
            e.jsx(b, { path: '/everything', element: e.jsx(q, {}) }),
            e.jsx(b, { path: '/profile', element: e.jsx(pt, {}) }),
            e.jsx(b, { path: '/profile/edit', element: e.jsx(I, { children: e.jsx(St, {}) }) }),
            e.jsx(b, { path: '/g/:id', element: e.jsx(yt, {}) }),
            e.jsx(b, { path: '/sell', element: e.jsx(I, { children: e.jsx(bt, {}) }) }),
            e.jsx(b, { path: '/sell-to-us', element: e.jsx(Nt, {}) }),
            e.jsx(b, { path: '/contact', element: e.jsx(Et, {}) }),
            e.jsx(b, { path: '/edit/:id', element: e.jsx(I, { children: e.jsx(_t, {}) }) }),
            e.jsx(b, { path: '*', element: e.jsx(wt, {}) }),
            e.jsx(b, { path: '/about', element: e.jsx(mt, {}) }),
            e.jsx(b, { path: '/privacy', element: e.jsx(ht, {}) }),
            e.jsx(b, { path: '/terms', element: e.jsx(ft, {}) }),
            e.jsx(b, { path: '/500', element: e.jsx(xt, {}) }),
            e.jsx(b, { path: '/login', element: e.jsx(vt, {}) }),
            e.jsx(b, { path: '/register', element: e.jsx(jt, {}) }),
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
const Pt = new he();
T.createRoot(document.getElementById('root')).render(
  e.jsx(X.StrictMode, {
    children: e.jsx(It, {
      children: e.jsx(fe, { client: Pt, children: e.jsx(ge, { children: e.jsx(At, {}) }) }),
    }),
  }),
);
export { ke as G, w as _, F as a, Pe as f, ct as u };

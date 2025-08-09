const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/DetailsModal-BFVnBG7i.js',
      'assets/react-query-BGeIQRPr.js',
      'assets/react-CTDr35rJ.js',
      'assets/DetailsView-BPm4qC7b.js',
      'assets/antd-CoNf2jvZ.js',
      'assets/ImageUploader-DWnjEkzb.js',
      'assets/Profile-4cK1hX9A.js',
      'assets/Login-Cxq0Seiq.js',
      'assets/FormField-iyrhpl26.js',
      'assets/zod-SQF3v9p3.js',
      'assets/Register-CKyjGJVN.js',
      'assets/MyListings-DjTgtO25.js',
      'assets/Detail-qzmbOig-.js',
      'assets/Sell-D42Hz9bE.js',
      'assets/Edit-CG4i2ekk.js',
      'assets/NotFound-Cq2vGEz7.js',
      'assets/ProfileEdit-DIQNbjUr.js',
      'assets/SellToUs-Csnnurlo.js',
      'assets/Contact-ChCBADa-.js',
      'assets/Returns-CybxWZqr.js',
      'assets/B2B--j3nffuu.js',
      'assets/Raffles-DRqVSoUK.js',
      'assets/RaffleInfo-C2TNDJrv.js',
      'assets/RaffleWinners-D816uTx1.js',
      'assets/Cart-CvewBWYk.js',
    ]),
) => i.map((i) => d[i]);
import { j as e, u as be, Q as we, a as Se } from './react-query-BGeIQRPr.js';
import {
  c as ne,
  r as o,
  u as ae,
  e as I,
  g as _e,
  R as ie,
  L as p,
  f as Ne,
  h as g,
  B as ke,
} from './react-CTDr35rJ.js';
import {
  I as le,
  T as U,
  S as C,
  B as x,
  R as W,
  a as oe,
  P as Ee,
  D as ce,
  s as Ae,
  b as de,
  c as Ce,
  d as Ie,
  e as T,
} from './antd-CoNf2jvZ.js';
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) d(n);
  new MutationObserver((n) => {
    for (const i of n)
      if (i.type === 'childList')
        for (const a of i.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && d(a);
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
  function d(n) {
    if (n.ep) return;
    n.ep = !0;
    const i = r(n);
    fetch(n.href, i);
  }
})();
var M = {},
  F = ne;
((M.createRoot = F.createRoot), (M.hydrateRoot = F.hydrateRoot));
const Pe = 'modulepreload',
  De = function (t) {
    return '/' + t;
  },
  B = {},
  w = function (s, r, d) {
    let n = Promise.resolve();
    if (r && r.length > 0) {
      document.getElementsByTagName('link');
      const i = document.querySelector('meta[property=csp-nonce]'),
        a = (i == null ? void 0 : i.nonce) || (i == null ? void 0 : i.getAttribute('nonce'));
      n = Promise.all(
        r.map((f) => {
          if (((f = De(f)), f in B)) return;
          B[f] = !0;
          const u = f.endsWith('.css'),
            j = u ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${f}"]${j}`)) return;
          const h = document.createElement('link');
          if (
            ((h.rel = u ? 'stylesheet' : Pe),
            u || ((h.as = 'script'), (h.crossOrigin = '')),
            (h.href = f),
            a && h.setAttribute('nonce', a),
            document.head.appendChild(h),
            u)
          )
            return new Promise((l, c) => {
              (h.addEventListener('load', l),
                h.addEventListener('error', () => c(new Error(`Unable to preload CSS for ${f}`))));
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
var Z, X;
const Re =
  (typeof import.meta < 'u' &&
    ((X = (Z = import.meta) == null ? void 0 : Z.env) == null ? void 0 : X.VITE_API_BASE)) ||
  window.location.origin;
async function O(t, s = {}) {
  const r = new Headers(s.headers || {}),
    d = localStorage.getItem('token');
  d && !r.has('Authorization') && r.set('Authorization', 'Bearer ' + d);
  let n;
  try {
    n = await fetch(t.startsWith('http') ? t : Re + t, { ...s, headers: r });
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
    d &&
    (localStorage.removeItem('token'), typeof window < 'u')
  ) {
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: { text: 'Session expired, please log in again', type: 'warning' },
      }),
    );
    try {
      const { pathname: a, search: f } = window.location;
      if (
        [
          (l) => l === '/sell',
          (l) => l.startsWith('/edit/'),
          (l) => l === '/my',
          (l) => l === '/profile/edit',
        ].some((l) => l(a)) &&
        !(a === '/login')
      ) {
        try {
          sessionStorage.setItem('from', a + (f || ''));
        } catch {}
        window.location.href = '/login';
      }
    } catch {}
  }
  return n;
}
function ue() {
  const t = o.useMemo(() => new URLSearchParams(location.search), [location.search]),
    s = o.useCallback(() => Object.fromEntries(t.entries()), [t]),
    r = o.useCallback((d) => {
      const n = new URLSearchParams(location.search);
      (Object.entries(d).forEach(([i, a]) => {
        a === void 0 || a === '' ? n.delete(i) : n.set(i, String(a));
      }),
        history.replaceState({}, '', `?${n.toString()}`));
    }, []);
  return { getAll: s, setAll: r };
}
function $({ onApply: t }) {
  const { getAll: s, setAll: r } = ue(),
    d = s(),
    [n, i] = o.useState(d.q || ''),
    [a, f] = o.useState(d.min || ''),
    [u, j] = o.useState(d.max || ''),
    [h, l] = o.useState(d.brand || ''),
    [c, m] = o.useState(d.vram_min || ''),
    [y, S] = o.useState(d.condition || '');
  return (
    o.useEffect(() => {
      r({ q: n, min: a, max: u, brand: h, vram_min: c, condition: y });
    }, [n, a, u, h, c, y, r]),
    e.jsxs('div', {
      children: [
        e.jsx(le, {
          className: 'mb-2',
          placeholder: 'Search title or description',
          value: n,
          onChange: (b) => i(b.target.value),
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(U, {
              placeholder: 'Min price',
              value: a === '' ? void 0 : Number(a),
              onChange: (b) => f(b == null ? '' : String(b)),
              min: 0,
              style: { width: '100%' },
            }),
            e.jsx(U, {
              placeholder: 'Max price',
              value: u === '' ? void 0 : Number(u),
              onChange: (b) => j(b == null ? '' : String(b)),
              min: 0,
              style: { width: '100%' },
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(C, {
              value: h,
              style: { minWidth: 140 },
              onChange: (b) => l(b),
              options: [
                { value: '', label: 'Any brand' },
                { value: 'NVIDIA', label: 'NVIDIA' },
                { value: 'AMD', label: 'AMD' },
              ],
            }),
            e.jsx(C, {
              value: c,
              style: { minWidth: 140 },
              onChange: (b) => m(String(b)),
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
          onChange: (b) => S(b),
          options: [
            { value: '', label: 'Any condition' },
            { value: 'New', label: 'New' },
            { value: 'Used', label: 'Used' },
          ],
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 align-items-center',
          children: [
            e.jsx(x, {
              type: 'primary',
              onClick: () =>
                t({ q: n, min: a, max: u, brand: h, vram_min: c, condition: y, page: '1' }),
              children: 'Search',
            }),
            e.jsx(x, {
              onClick: () => {
                (i(''),
                  f(''),
                  j(''),
                  l(''),
                  m(''),
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
const Te = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});
function Le(t) {
  const s = Number(t || 0);
  return Te.format(s);
}
function Me(t) {
  if (!t) return '';
  try {
    return new Date(t).toLocaleDateString();
  } catch {
    return '';
  }
}
function Oe({
  src: t,
  alt: s = '',
  className: r,
  style: d,
  width: n,
  height: i,
  srcSet: a,
  sizes: f,
  fallbackSrc: u,
}) {
  const j = o.useRef(null),
    [h, l] = o.useState(!1),
    [c, m] = o.useState(!1);
  o.useEffect(() => {
    const S = j.current;
    if (!S) return;
    if (!('IntersectionObserver' in window)) {
      l(!0);
      return;
    }
    const b = new IntersectionObserver(
      (D) => {
        const N = D[0];
        N && N.isIntersecting && (l(!0), b.disconnect());
      },
      { rootMargin: '200px' },
    );
    return (b.observe(S), () => b.disconnect());
  }, []);
  const y = c && u ? u : t;
  return e.jsx('img', {
    ref: j,
    src: h ? y : void 0,
    srcSet: h ? a : void 0,
    sizes: h ? f : void 0,
    alt: s,
    className: r,
    style: { backgroundColor: '#f5f5f5', ...d },
    width: n,
    height: i,
    loading: 'lazy',
    onError: () => m(!0),
  });
}
function Ve({ gpu: t, onDetails: s }) {
  const r = (() => {
    if (!t.created_at) return !1;
    const d = new Date(t.created_at).getTime();
    return Date.now() - d < 6048e5;
  })();
  return e.jsx('div', {
    className: 'card card-rounded mb-3',
    children: e.jsxs('div', {
      className: 'row g-0',
      children: [
        t.image_path &&
          e.jsx('div', {
            className: 'col-4',
            children: e.jsx(Oe, {
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
                            onClick: (d) => {
                              (d.preventDefault(),
                                d.currentTarget.previousSibling,
                                (d.currentTarget.parentElement.textContent = t.description || ''));
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
                      children: ['Added: ', Me(t.created_at)],
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
function ze(t, s = 'GPU Market — Buy & Sell Used GPUs') {
  if (typeof document > 'u') return;
  const r = document.title;
  return (
    (document.title = t),
    () => {
      document.title = r || s;
    }
  );
}
const qe = o.lazy(() =>
  w(() => import('./DetailsModal-BFVnBG7i.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
);
function H() {
  var q;
  const { getAll: t, setAll: s } = ue(),
    r = t(),
    d = typeof location < 'u' && location.pathname === '/everything',
    [n, i] = o.useState(r.q || ''),
    [a, f] = o.useState(r.sort || (d ? 'price_desc' : 'date_new')),
    [u, j] = o.useState({
      min: r.min || '',
      max: r.max || '',
      brand: r.brand || '',
      vram_min: r.vram_min || '',
      condition: r.condition || '',
    }),
    [h, l] = o.useState(null),
    [c, m] = o.useState(!1),
    [y, S] = o.useState(Number(r.page || '1')),
    [b] = o.useState(12);
  o.useEffect(() => ze('GPU Market — Shop Graphics Cards'), []);
  const D = o.useMemo(() => {
      let v = 'newest';
      a === 'price_asc'
        ? (v = 'price_asc')
        : a === 'price_desc'
          ? (v = 'price_desc')
          : (a === 'date_new' ||
              a === 'featured' ||
              a === 'best' ||
              a === 'alpha_asc' ||
              a === 'alpha_desc' ||
              a === 'date_old') &&
            (v = 'newest');
      const _ = new URLSearchParams();
      return (
        n && _.set('q', n),
        _.set('sort', v),
        Object.entries(u).forEach(([G, E]) => {
          E && _.set(G, String(E));
        }),
        _.set('page', String(y)),
        _.set('per', String(b)),
        _
      );
    }, [n, a, u, y, b]),
    {
      data: N,
      isLoading: R,
      isError: je,
      refetch: ye,
      isFetching: ve,
    } = be({
      queryKey: ['search', n, a, u, y, b],
      queryFn: async () => (
        s({ q: n, sort: a, page: String(y), ...u }),
        (await O('/api/search?' + D.toString())).json()
      ),
      placeholderData: (v) => v,
      staleTime: 3e4,
      retry: 2,
    });
  o.useEffect(() => {
    const v = document.querySelector('.container');
    v && v.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [y]);
  const z = o.useRef(!1);
  function ge() {
    z.current ||
      ((z.current = !0),
      w(() => import('./DetailsModal-BFVnBG7i.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
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
      d && e.jsx('h1', { className: 'h4 mt-3', children: 'All Products' }),
      e.jsxs('div', {
        className: 'd-flex gap-2 my-3',
        children: [
          e.jsx(le, {
            id: 'globalSearchInput',
            placeholder: 'Search GPUs...',
            value: n,
            onChange: (v) => i(v.target.value),
          }),
          e.jsx(C, {
            value: a,
            style: { width: 220 },
            onChange: (v) => f(v),
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
          e.jsx(x, {
            onClick: () => {
              f(d ? 'price_desc' : 'date_new');
            },
            children: 'Reset sort',
          }),
          e.jsx(x, { type: 'primary', onClick: () => ye(), children: 'Search' }),
          e.jsx(x, { onClick: () => m(!0), className: 'd-md-none', children: 'Filters' }),
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
                onApply: (v) => {
                  (j((_) => ({ ..._, ...v })), S(1));
                },
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'col-md-8',
            children: [
              je &&
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
                onMouseEnter: ge,
                children: [
                  (R || ve) &&
                    e.jsx(e.Fragment, {
                      children: Array.from({ length: 4 }).map((v, _) =>
                        e.jsx(
                          'div',
                          {
                            className: 'col-md-6 mb-3',
                            children: e.jsx('div', {
                              className: 'card p-3',
                              children: e.jsx(oe, {}),
                            }),
                          },
                          _,
                        ),
                      ),
                    }),
                  !R &&
                    ((N == null ? void 0 : N.results) || []).map((v) =>
                      e.jsx(
                        'div',
                        {
                          className: 'col-md-6',
                          children: e.jsx(Ve, {
                            gpu: v,
                            onDetails: async (_) => {
                              const E = await (await O(`/api/gpus/${_}`)).json();
                              l(E);
                            },
                          }),
                        },
                        v.id,
                      ),
                    ),
                  !R &&
                    (((q = N == null ? void 0 : N.results) == null ? void 0 : q.length) || 0) ===
                      0 &&
                    e.jsx('div', {
                      className: 'col-12',
                      children: e.jsx('div', {
                        className: 'my-4',
                        children: e.jsx(W, {
                          status: 'info',
                          title: 'No results',
                          subTitle:
                            n || u.min || u.max || u.brand || u.vram_min || u.condition
                              ? 'Try adjusting filters or sorting options.'
                              : 'Browse by series from the top menu or apply filters to get started.',
                          extra:
                            n || u.min || u.max || u.brand || u.vram_min || u.condition
                              ? e.jsx('div', {
                                  className: 'd-flex gap-2 justify-content-center',
                                  children: e.jsx(x, {
                                    onClick: () => {
                                      (i(''),
                                        j({
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
                                    e.jsx(x, {
                                      href: '/?brand=NVIDIA&vram_min=12',
                                      children: 'NVIDIA 40 Series',
                                    }),
                                    e.jsx(x, {
                                      href: '/?brand=NVIDIA&vram_min=8',
                                      children: 'NVIDIA 30 Series',
                                    }),
                                    e.jsx(x, {
                                      href: '/?brand=AMD&vram_min=12',
                                      children: 'AMD 7000 Series',
                                    }),
                                    e.jsx(x, {
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
                  pageSize: b,
                  total: (N == null ? void 0 : N.total) || 0,
                  onChange: (v) => S(v),
                  showSizeChanger: !1,
                }),
              }),
            ],
          }),
        ],
      }),
      e.jsxs(ce, {
        open: c,
        onClose: () => m(!1),
        children: [
          e.jsx('h5', { className: 'mb-3', children: 'Filters' }),
          e.jsx($, {
            onApply: (v) => {
              (m(!1), j((_) => ({ ..._, ...v })), S(1));
            },
          }),
        ],
      }),
      e.jsx(o.Suspense, {
        fallback: null,
        children: e.jsx(qe, { item: h, onClose: () => l(null) }),
      }),
    ],
  });
}
function Ge() {
  const [t, s] = Ae.useMessage();
  function r(n, i = 'info') {
    const a =
      i === 'error' ? 'error' : i === 'warning' ? 'warning' : i === 'success' ? 'success' : 'info';
    t.open({ type: a, content: n, duration: 3 });
  }
  return { api: { push: r }, messages: s };
}
function Ue({ messages: t }) {
  return e.jsx(e.Fragment, { children: t });
}
function A({ children: t }) {
  const s = ae(),
    r = I();
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
var We = {};
const Q = (t) => {
    let s;
    const r = new Set(),
      d = (h, l) => {
        const c = typeof h == 'function' ? h(s) : h;
        if (!Object.is(c, s)) {
          const m = s;
          ((s = (l ?? (typeof c != 'object' || c === null)) ? c : Object.assign({}, s, c)),
            r.forEach((y) => y(s, m)));
        }
      },
      n = () => s,
      u = {
        setState: d,
        getState: n,
        getInitialState: () => j,
        subscribe: (h) => (r.add(h), () => r.delete(h)),
        destroy: () => {
          ((We ? 'production' : void 0) !== 'production' &&
            console.warn(
              '[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.',
            ),
            r.clear());
        },
      },
      j = (s = t(d, n, u));
    return u;
  },
  Fe = (t) => (t ? Q(t) : Q);
var he = { exports: {} },
  me = {},
  fe = { exports: {} },
  pe = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var k = o;
function Be(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var $e = typeof Object.is == 'function' ? Object.is : Be,
  He = k.useState,
  Qe = k.useEffect,
  Ye = k.useLayoutEffect,
  Ke = k.useDebugValue;
function Je(t, s) {
  var r = s(),
    d = He({ inst: { value: r, getSnapshot: s } }),
    n = d[0].inst,
    i = d[1];
  return (
    Ye(
      function () {
        ((n.value = r), (n.getSnapshot = s), L(n) && i({ inst: n }));
      },
      [t, r, s],
    ),
    Qe(
      function () {
        return (
          L(n) && i({ inst: n }),
          t(function () {
            L(n) && i({ inst: n });
          })
        );
      },
      [t],
    ),
    Ke(r),
    r
  );
}
function L(t) {
  var s = t.getSnapshot;
  t = t.value;
  try {
    var r = s();
    return !$e(t, r);
  } catch {
    return !0;
  }
}
function Ze(t, s) {
  return s();
}
var Xe =
  typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'
    ? Ze
    : Je;
pe.useSyncExternalStore = k.useSyncExternalStore !== void 0 ? k.useSyncExternalStore : Xe;
fe.exports = pe;
var et = fe.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var P = o,
  tt = et;
function st(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var rt = typeof Object.is == 'function' ? Object.is : st,
  nt = tt.useSyncExternalStore,
  at = P.useRef,
  it = P.useEffect,
  lt = P.useMemo,
  ot = P.useDebugValue;
me.useSyncExternalStoreWithSelector = function (t, s, r, d, n) {
  var i = at(null);
  if (i.current === null) {
    var a = { hasValue: !1, value: null };
    i.current = a;
  } else a = i.current;
  i = lt(
    function () {
      function u(m) {
        if (!j) {
          if (((j = !0), (h = m), (m = d(m)), n !== void 0 && a.hasValue)) {
            var y = a.value;
            if (n(y, m)) return (l = y);
          }
          return (l = m);
        }
        if (((y = l), rt(h, m))) return y;
        var S = d(m);
        return n !== void 0 && n(y, S) ? ((h = m), y) : ((h = m), (l = S));
      }
      var j = !1,
        h,
        l,
        c = r === void 0 ? null : r;
      return [
        function () {
          return u(s());
        },
        c === null
          ? void 0
          : function () {
              return u(c());
            },
      ];
    },
    [s, r, d, n],
  );
  var f = nt(t, i[0], i[1]);
  return (
    it(
      function () {
        ((a.hasValue = !0), (a.value = f));
      },
      [f],
    ),
    ot(f),
    f
  );
};
he.exports = me;
var ct = he.exports;
const dt = _e(ct);
var xe = {};
const { useDebugValue: ut } = ie,
  { useSyncExternalStoreWithSelector: ht } = dt;
let Y = !1;
const mt = (t) => t;
function ft(t, s = mt, r) {
  (xe ? 'production' : void 0) !== 'production' &&
    r &&
    !Y &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (Y = !0));
  const d = ht(t.subscribe, t.getState, t.getServerState || t.getInitialState, s, r);
  return (ut(d), d);
}
const K = (t) => {
    (xe ? 'production' : void 0) !== 'production' &&
      typeof t != 'function' &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const s = typeof t == 'function' ? Fe(t) : t,
      r = (d, n) => ft(s, d, n);
    return (Object.assign(r, s), r);
  },
  pt = (t) => (t ? K(t) : K);
function J(t) {
  try {
    const s = t.split('.')[1] || '';
    return JSON.parse(atob(s));
  } catch {
    return null;
  }
}
const xt = pt((t) => ({
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
function jt(t, s) {
  return `scroll:${t}${s}`;
}
function yt() {
  const t = I();
  o.useEffect(() => {
    const s = jt(t.pathname, t.search),
      r = sessionStorage.getItem(s);
    if (r) {
      const i = parseInt(r, 10);
      Number.isNaN(i) || setTimeout(() => window.scrollTo(0, i), 0);
    } else window.scrollTo(0, 0);
    function d() {
      sessionStorage.setItem(s, String(window.scrollY));
    }
    window.addEventListener('beforeunload', d);
    const n = () => {
      const i = sessionStorage.getItem(s),
        a = i ? parseInt(i, 10) : 0;
      setTimeout(() => window.scrollTo(0, Number.isNaN(a) ? 0 : a), 0);
    };
    return (
      window.addEventListener('popstate', n),
      () => {
        (window.removeEventListener('beforeunload', d),
          window.removeEventListener('popstate', n),
          d());
      }
    );
  }, [t.pathname, t.search]);
}
var ee, te, se, re;
const V = {
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
function vt() {
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
                  href: `https://wa.me/${V.contactWhatsApp || '447747310027'}`,
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
                  href: `mailto:${V.contactEmail || 'x1657217402@gmail.com'}`,
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
function bt() {
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
function wt() {
  return e.jsxs('div', {
    className: 'container py-5 text-center',
    children: [
      e.jsx('h1', { className: 'display-5', children: '500' }),
      e.jsx('p', { className: 'lead', children: 'Unexpected server error.' }),
      e.jsx('a', { className: 'btn btn-primary', href: '/', children: 'Go Home' }),
    ],
  });
}
function St() {
  const s = `https://wa.me/${V.contactWhatsApp || '447747310027'}?text=Hi%20:)`,
    { pathname: r } = I();
  return ['/login', '/register', '/500'].includes(r)
    ? null
    : (o.useEffect(() => {
        const n = (f) => {
          document.documentElement.style.setProperty('--fab-bottom', `${f}px`);
        };
        n(16);
        const i = window.visualViewport;
        if (!i) return;
        const a = () => {
          const f = window.innerHeight - i.height;
          n(f > 120 ? 80 : 16);
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
function _t({ open: t, onClose: s }) {
  const [r, d] = o.useState(''),
    [n, i] = o.useState([]),
    [a, f] = o.useState(!1),
    u = o.useRef(null),
    [j, h] = o.useState(t);
  (o.useEffect(() => h(t), [t]),
    o.useEffect(() => {
      if (!j) return;
      const c = (m) => {
        m.key === 'Escape' && s();
      };
      return (
        window.addEventListener('keydown', c),
        (document.body.style.overflow = 'hidden'),
        setTimeout(() => {
          var m;
          return (m = u.current) == null ? void 0 : m.focus();
        }, 0),
        () => {
          (window.removeEventListener('keydown', c), (document.body.style.overflow = ''));
        }
      );
    }, [j, s]),
    o.useEffect(() => {
      if (!j) return;
      const c = setTimeout(async () => {
        if (!r) {
          i([]);
          return;
        }
        f(!0);
        try {
          const m = new URLSearchParams({ q: r, sort: 'newest', page: '1', per: '10' }),
            S = await (await O('/api/search?' + m.toString())).json();
          i(S.results || []);
        } finally {
          f(!1);
        }
      }, 300);
      return () => clearTimeout(c);
    }, [r, j]));
  const l = o.useMemo(() => {
    const c = n.slice(0, 5).map((y) => y.title);
    return Array.from(new Set(c));
  }, [n]);
  return j
    ? ne.createPortal(
        e.jsx('div', {
          role: 'dialog',
          'aria-modal': 'true',
          className: 'position-fixed top-0 start-0 end-0 bottom-0',
          style: { background: 'rgba(0,0,0,0.35)', zIndex: 1050 },
          onClick: s,
          children: e.jsxs('div', {
            className: 'bg-white shadow rounded-3',
            style: { maxWidth: 960, margin: '6rem auto', padding: '12px 12px 0 12px' },
            onClick: (c) => c.stopPropagation(),
            children: [
              e.jsxs('div', {
                className: 'd-flex align-items-center border rounded px-2',
                style: { height: 56 },
                children: [
                  e.jsx(de, { style: { fontSize: 18 } }),
                  e.jsx('input', {
                    ref: u,
                    value: r,
                    onChange: (c) => d(c.target.value),
                    placeholder: 'Search',
                    className: 'form-control border-0 shadow-0',
                    style: { fontSize: 18 },
                  }),
                  r &&
                    e.jsx('button', {
                      className: 'btn btn-link',
                      onClick: () => d(''),
                      'aria-label': 'Clear',
                      children: '×',
                    }),
                  e.jsx('button', {
                    className: 'btn btn-link',
                    onClick: s,
                    'aria-label': 'Close',
                    children: e.jsx(Ce, {}),
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'row py-3',
                style: { minHeight: 180 },
                children: [
                  a &&
                    e.jsx('div', {
                      className: 'd-flex justify-content-center align-items-center',
                      style: { minHeight: 160 },
                      children: e.jsx(oe, {}),
                    }),
                  !a &&
                    e.jsxs(e.Fragment, {
                      children: [
                        e.jsxs('div', {
                          className: 'col-6 border-end',
                          children: [
                            e.jsx('div', {
                              className: 'text-muted small mb-2',
                              children: 'SUGGESTIONS',
                            }),
                            l.map((c, m) =>
                              e.jsx(
                                'a',
                                {
                                  href: `/everything?sort=price_desc&q=${encodeURIComponent(c)}`,
                                  className: 'd-block py-2 text-decoration-none',
                                  children: c,
                                },
                                m,
                              ),
                            ),
                            !l.length &&
                              e.jsx('div', {
                                className: 'text-muted',
                                children: 'Type to see suggestions…',
                              }),
                          ],
                        }),
                        e.jsxs('div', {
                          className: 'col-6',
                          children: [
                            e.jsx('div', {
                              className: 'text-muted small mb-2',
                              children: 'PRODUCTS',
                            }),
                            n
                              .slice(0, 5)
                              .map((c) =>
                                e.jsxs(
                                  'a',
                                  {
                                    href: `/g/${c.id}`,
                                    className:
                                      'd-flex align-items-center gap-2 py-2 text-decoration-none',
                                    children: [
                                      e.jsx('img', {
                                        alt: c.title,
                                        src: c.image_path || '/placeholder.webp',
                                        width: 48,
                                        height: 48,
                                        style: { objectFit: 'cover', borderRadius: 4 },
                                      }),
                                      e.jsx('span', { children: c.title }),
                                    ],
                                  },
                                  c.id,
                                ),
                              ),
                            !n.length &&
                              e.jsx('div', {
                                className: 'text-muted',
                                children: 'No products yet.',
                              }),
                          ],
                        }),
                      ],
                    }),
                ],
              }),
              e.jsxs('div', {
                className: 'border-top py-2 d-flex justify-content-between align-items-center',
                children: [
                  e.jsxs('span', {
                    className: 'text-muted',
                    children: ['Search for “', r || '…', '”'],
                  }),
                  e.jsx('a', {
                    className: 'text-decoration-none',
                    href: `/everything?sort=price_desc&q=${encodeURIComponent(r)}`,
                    children: '→',
                  }),
                ],
              }),
            ],
          }),
        }),
        document.body,
      )
    : null;
}
const Nt = o.lazy(() => w(() => import('./Profile-4cK1hX9A.js'), __vite__mapDeps([6, 1, 2, 4]))),
  kt = o.lazy(() => w(() => import('./Login-Cxq0Seiq.js'), __vite__mapDeps([7, 1, 2, 8, 9, 4]))),
  Et = o.lazy(() =>
    w(() => import('./Register-CKyjGJVN.js'), __vite__mapDeps([10, 1, 2, 8, 9, 4])),
  ),
  At = o.lazy(() => w(() => import('./MyListings-DjTgtO25.js'), __vite__mapDeps([11, 1, 2, 4]))),
  Ct = o.lazy(() => w(() => import('./Detail-qzmbOig-.js'), __vite__mapDeps([12, 1, 2, 3, 4]))),
  It = o.lazy(() => w(() => import('./Sell-D42Hz9bE.js'), __vite__mapDeps([13, 1, 2, 8, 9, 4]))),
  Pt = o.lazy(() => w(() => import('./Edit-CG4i2ekk.js'), __vite__mapDeps([14, 1, 2, 8, 9, 4]))),
  Dt = o.lazy(() => w(() => import('./NotFound-Cq2vGEz7.js'), __vite__mapDeps([15, 1, 2, 4]))),
  Rt = o.lazy(() =>
    w(() => import('./ProfileEdit-DIQNbjUr.js'), __vite__mapDeps([16, 1, 2, 8, 4])),
  ),
  Tt = o.lazy(() =>
    w(() => import('./SellToUs-Csnnurlo.js'), __vite__mapDeps([17, 1, 2, 9, 8, 4])),
  ),
  Lt = o.lazy(() => w(() => import('./Contact-ChCBADa-.js'), __vite__mapDeps([18, 1, 2, 9, 8, 4]))),
  Mt = o.lazy(() => w(() => import('./Returns-CybxWZqr.js'), __vite__mapDeps([19, 1, 2]))),
  Ot = o.lazy(() => w(() => import('./B2B--j3nffuu.js'), __vite__mapDeps([20, 1, 2]))),
  Vt = o.lazy(() => w(() => import('./Raffles-DRqVSoUK.js'), __vite__mapDeps([21, 1, 2]))),
  zt = o.lazy(() => w(() => import('./RaffleInfo-C2TNDJrv.js'), __vite__mapDeps([22, 1, 2]))),
  qt = o.lazy(() => w(() => import('./RaffleWinners-D816uTx1.js'), __vite__mapDeps([23, 1, 2]))),
  Gt = o.lazy(() => w(() => import('./Cart-CvewBWYk.js'), __vite__mapDeps([24, 1, 2])));
function Ut() {
  const { api: t, messages: s } = Ge(),
    r = ae(),
    d = I(),
    { user: n, init: i, logout: a } = xt();
  (yt(),
    o.useEffect(() => {
      i();
      function l(c) {
        const m = c.detail || {};
        t.push(m.text || '', m.type || 'info');
      }
      return (
        window.addEventListener('app-toast', l),
        () => window.removeEventListener('app-toast', l)
      );
    }, []));
  const [f, u] = o.useState(!1),
    [j, h] = o.useState(!1);
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
          e.jsx(x, {
            className: 'nav-icon-btn',
            type: 'text',
            'aria-label': 'Search',
            icon: e.jsx(de, { style: { fontSize: 22, color: '#111' } }),
            onClick: () => {
              (d.pathname !== '/' && d.pathname !== '/everything' && r('/everything'), h(!0));
            },
          }),
          e.jsx(p, {
            to: '/',
            className: 'd-flex align-items-center gap-2 text-decoration-none',
            children: e.jsx('img', { src: '/logo.svg', alt: 'GPU-MARKET', width: 64, height: 64 }),
          }),
          e.jsx(x, {
            className: 'nav-icon-btn',
            type: 'text',
            'aria-label': 'Cart',
            icon: e.jsx(Ie, { style: { fontSize: 22, color: '#111' } }),
            onClick: () => r('/cart'),
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
                e.jsx(p, {
                  to: '/',
                  children: e.jsx(x, {
                    type: 'text',
                    size: 'small',
                    style: { borderBottom: d.pathname === '/' ? '2px solid #222' : 'none' },
                    children: 'Home',
                  }),
                }),
                e.jsx(T, {
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
                    onClick: (l) => {
                      if (l.key === 'everything') {
                        r('/everything?sort=price_desc');
                        return;
                      }
                      if (l.key.startsWith('q:')) {
                        const c = encodeURIComponent(l.key.slice(2));
                        r(`/everything?sort=price_desc&q=${c}`);
                      }
                    },
                  },
                  children: e.jsx(x, {
                    type: 'text',
                    size: 'small',
                    style: {
                      borderBottom: d.pathname === '/everything' ? '2px solid #222' : 'none',
                    },
                    children: 'Shop Everything',
                  }),
                }),
                e.jsx(T, {
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
                    onClick: (l) => {
                      const c = (m) => r(m);
                      if (l.key === 'all-gpus') return c('/');
                      if (l.key === 'nv-all') return c('/?brand=NVIDIA');
                      if (l.key === 'nv-40') return c('/?brand=NVIDIA&vram_min=12');
                      if (l.key === 'nv-30') return c('/?brand=NVIDIA&vram_min=8');
                      if (l.key === 'nv-20') return c('/?brand=NVIDIA&q=20 Series');
                      if (l.key === 'nv-16') return c('/?brand=NVIDIA&q=16 Series');
                      if (l.key === 'nv-10') return c('/?brand=NVIDIA&q=10 Series');
                      if (l.key === 'nv-other') return c('/?brand=NVIDIA&q=Other');
                      if (l.key === 'nv-faulty') return c('/?brand=NVIDIA&q=Faulty');
                      if (l.key === 'amd-all') return c('/?brand=AMD');
                      if (l.key === 'amd-7000') return c('/?brand=AMD&vram_min=12');
                      if (l.key === 'amd-6000') return c('/?brand=AMD&vram_min=8');
                      if (l.key === 'amd-5000') return c('/?brand=AMD&q=5000 Series');
                      if (l.key === 'amd-500') return c('/?brand=AMD&q=500 Series');
                      if (l.key === 'amd-400') return c('/?brand=AMD&q=400 Series');
                      if (l.key === 'amd-vega') return c('/?brand=AMD&q=Vega');
                      if (l.key === 'amd-other') return c('/?brand=AMD&q=Other');
                      if (l.key === 'amd-faulty') return c('/?brand=AMD&q=Faulty');
                    },
                  },
                  children: e.jsx(x, {
                    type: 'text',
                    size: 'small',
                    children: 'Shop Graphics Cards',
                  }),
                }),
                e.jsx(p, {
                  to: '/sell',
                  children: e.jsx(x, { size: 'small', type: 'default', children: 'Sell' }),
                }),
                e.jsx(p, {
                  to: '/sell-to-us',
                  children: e.jsx(x, { size: 'small', type: 'default', children: 'Sell to us' }),
                }),
                e.jsx(p, {
                  to: '/b2b',
                  children: e.jsx(x, {
                    size: 'small',
                    type: 'text',
                    children: 'Enterprise Hardware (B2B)',
                  }),
                }),
                e.jsx(p, {
                  to: '/my',
                  children: e.jsx(x, { size: 'small', type: 'default', children: 'My Listings' }),
                }),
                e.jsx(p, {
                  to: '/profile',
                  children: e.jsx(x, { size: 'small', type: 'default', children: 'My Profile' }),
                }),
                e.jsx(T, {
                  trigger: ['click'],
                  menu: {
                    items: [
                      { key: 'raffles', label: 'Current Raffle' },
                      { key: 'raffle-info', label: 'Raffle Information' },
                      { key: 'raffle-winners', label: 'Raffle Winners' },
                    ],
                    onClick: (l) => {
                      (l.key === 'raffles' && r('/raffles'),
                        l.key === 'raffle-info' && r('/raffles/info'),
                        l.key === 'raffle-winners' && r('/raffles/winners'));
                    },
                  },
                  children: e.jsx(x, { type: 'text', size: 'small', children: 'Raffles' }),
                }),
                n &&
                  e.jsx(p, {
                    to: '/profile/edit',
                    children: e.jsx(x, {
                      size: 'small',
                      type: 'default',
                      children: 'Edit Profile',
                    }),
                  }),
                !n &&
                  e.jsx(p, {
                    to: '/login',
                    children: e.jsx(x, { size: 'small', type: 'primary', children: 'Login' }),
                  }),
                !n &&
                  e.jsx(p, {
                    to: '/register',
                    children: e.jsx(x, { size: 'small', type: 'primary', children: 'Register' }),
                  }),
                n &&
                  e.jsx('span', {
                    className: 'align-self-center small text-muted',
                    children: n.display_name || n.username,
                  }),
                n &&
                  e.jsx(x, {
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
              children: e.jsx(x, { size: 'small', onClick: () => u(!0), children: 'Menu' }),
            }),
          ],
        }),
      }),
      e.jsx(ce, {
        open: f,
        onClose: () => u(!1),
        afterOpenChange: (l) => {
          try {
            document.body.style.overflow = l ? 'hidden' : '';
          } catch {}
        },
        children: e.jsxs('div', {
          className: 'd-flex flex-column gap-2',
          children: [
            e.jsx(p, { to: '/', onClick: () => u(!1), children: 'Home' }),
            e.jsx(p, {
              to: '/everything?sort=price_desc',
              onClick: () => u(!1),
              children: 'Shop Everything',
            }),
            e.jsx('div', { className: 'fw-bold', children: 'Shop Graphics Cards' }),
            e.jsx(p, { to: '/?brand=NVIDIA', onClick: () => u(!1), children: 'NVIDIA' }),
            e.jsx(p, { to: '/?brand=AMD', onClick: () => u(!1), children: 'AMD' }),
            e.jsx(p, { to: '/sell', onClick: () => u(!1), children: 'Sell' }),
            e.jsx(p, { to: '/sell-to-us', onClick: () => u(!1), children: 'Sell to us' }),
            e.jsx(p, { to: '/my', onClick: () => u(!1), children: 'My Listings' }),
            e.jsx(p, { to: '/profile', onClick: () => u(!1), children: 'My Profile' }),
            !n && e.jsx(p, { to: '/login', onClick: () => u(!1), children: 'Login' }),
            !n && e.jsx(p, { to: '/register', onClick: () => u(!1), children: 'Register' }),
            n &&
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
      e.jsx(o.Suspense, {
        fallback: e.jsx('div', { className: 'container py-3', children: 'Loading...' }),
        children: e.jsxs(Ne, {
          children: [
            e.jsx(g, { path: '/', element: e.jsx(H, {}) }),
            e.jsx(g, { path: '/everything', element: e.jsx(H, {}) }),
            e.jsx(g, { path: '/profile', element: e.jsx(Nt, {}) }),
            e.jsx(g, { path: '/profile/edit', element: e.jsx(A, { children: e.jsx(Rt, {}) }) }),
            e.jsx(g, { path: '/g/:id', element: e.jsx(Ct, {}) }),
            e.jsx(g, { path: '/sell', element: e.jsx(A, { children: e.jsx(It, {}) }) }),
            e.jsx(g, { path: '/sell-to-us', element: e.jsx(Tt, {}) }),
            e.jsx(g, { path: '/contact', element: e.jsx(Lt, {}) }),
            e.jsx(g, { path: '/b2b', element: e.jsx(Ot, {}) }),
            e.jsx(g, { path: '/raffles', element: e.jsx(Vt, {}) }),
            e.jsx(g, { path: '/raffles/info', element: e.jsx(zt, {}) }),
            e.jsx(g, { path: '/raffles/winners', element: e.jsx(qt, {}) }),
            e.jsx(g, { path: '/cart', element: e.jsx(Gt, {}) }),
            e.jsx(g, { path: '/edit/:id', element: e.jsx(A, { children: e.jsx(Pt, {}) }) }),
            e.jsx(g, { path: '*', element: e.jsx(Dt, {}) }),
            e.jsx(g, { path: '/about', element: e.jsx(vt, {}) }),
            e.jsx(g, { path: '/privacy', element: e.jsx(gt, {}) }),
            e.jsx(g, { path: '/terms', element: e.jsx(bt, {}) }),
            e.jsx(g, { path: '/returns', element: e.jsx(Mt, {}) }),
            e.jsx(g, { path: '/500', element: e.jsx(wt, {}) }),
            e.jsx(g, { path: '/login', element: e.jsx(kt, {}) }),
            e.jsx(g, { path: '/register', element: e.jsx(Et, {}) }),
            e.jsx(g, { path: '/my', element: e.jsx(A, { children: e.jsx(At, {}) }) }),
          ],
        }),
      }),
      e.jsx(_t, { open: j, onClose: () => h(!1) }),
      e.jsx(Ue, { messages: s }),
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
                        e.jsx(p, { to: '/sell-to-us', children: 'Sell to us' }),
                        e.jsx(p, {
                          to: '/everything?sort=price_desc',
                          children: 'Shop Everything',
                        }),
                        e.jsx(p, { to: '/', children: 'Shop Graphics Cards' }),
                        e.jsx(p, { to: '/about', children: 'About Us' }),
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
                        e.jsx(p, { to: '/terms', children: 'Terms of Service' }),
                        e.jsx(p, { to: '/privacy', children: 'Privacy Policy' }),
                        e.jsx(p, { to: '/returns', children: 'Returns & Refunds' }),
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
      e.jsx(St, {}),
    ],
  });
}
class Wt extends o.Component {
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
const Ft = new we();
M.createRoot(document.getElementById('root')).render(
  e.jsx(ie.StrictMode, {
    children: e.jsx(Wt, {
      children: e.jsx(Se, { client: Ft, children: e.jsx(ke, { children: e.jsx(Ut, {}) }) }),
    }),
  }),
);
export { Ve as G, w as _, O as a, V as c, Le as f, xt as u };

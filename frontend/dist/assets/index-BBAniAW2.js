const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/DetailsModal-BF3kI1s_.js',
      'assets/react-query-BGeIQRPr.js',
      'assets/react-CTDr35rJ.js',
      'assets/DetailsView-Dwy162kI.js',
      'assets/antd-n40S5sxn.js',
      'assets/ImageUploader-DWnjEkzb.js',
      'assets/Profile-CNKs9qiu.js',
      'assets/Login-D7cBCC4z.js',
      'assets/FormField-iyrhpl26.js',
      'assets/zod-SQF3v9p3.js',
      'assets/Register-D3B6cT-W.js',
      'assets/MyListings-hcw7AVd2.js',
      'assets/Detail-CZr2vykS.js',
      'assets/Sell-fgyAY8xk.js',
      'assets/Edit-KPhRq8Io.js',
      'assets/NotFound-Bq8LLBzl.js',
      'assets/ProfileEdit-Do9usDKL.js',
      'assets/SellToUs-DbDTbtSX.js',
      'assets/Contact-COJtQgoL.js',
    ]),
) => i.map((i) => d[i]);
import { j as e, u as me, Q as he, a as fe } from './react-query-BGeIQRPr.js';
import {
  c as pe,
  r as o,
  u as xe,
  e as Y,
  g as ve,
  R as Z,
  L as d,
  f as je,
  h as y,
  B as ge,
} from './react-CTDr35rJ.js';
import {
  I as X,
  T as z,
  S as I,
  B as b,
  R as V,
  a as ye,
  P as be,
  D as ee,
  s as _e,
  b as we,
  M as Se,
} from './antd-n40S5sxn.js';
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) l(r);
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === 'childList')
        for (const a of i.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && l(a);
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
  function l(r) {
    if (r.ep) return;
    r.ep = !0;
    const i = n(r);
    fetch(r.href, i);
  }
})();
var L = {},
  G = pe;
((L.createRoot = G.createRoot), (L.hydrateRoot = G.hydrateRoot));
const Ne = 'modulepreload',
  Ee = function (t) {
    return '/' + t;
  },
  U = {},
  w = function (s, n, l) {
    let r = Promise.resolve();
    if (n && n.length > 0) {
      document.getElementsByTagName('link');
      const i = document.querySelector('meta[property=csp-nonce]'),
        a = (i == null ? void 0 : i.nonce) || (i == null ? void 0 : i.getAttribute('nonce'));
      r = Promise.all(
        n.map((m) => {
          if (((m = Ee(m)), m in U)) return;
          U[m] = !0;
          const u = m.endsWith('.css'),
            v = u ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${m}"]${v}`)) return;
          const c = document.createElement('link');
          if (
            ((c.rel = u ? 'stylesheet' : Ne),
            u || ((c.as = 'script'), (c.crossOrigin = '')),
            (c.href = m),
            a && c.setAttribute('nonce', a),
            document.head.appendChild(c),
            u)
          )
            return new Promise((j, f) => {
              (c.addEventListener('load', j),
                c.addEventListener('error', () => f(new Error(`Unable to preload CSS for ${m}`))));
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
var J, K;
const Pe =
  (typeof import.meta < 'u' &&
    ((K = (J = import.meta) == null ? void 0 : J.env) == null ? void 0 : K.VITE_API_BASE)) ||
  window.location.origin;
async function F(t, s = {}) {
  const n = new Headers(s.headers || {}),
    l = localStorage.getItem('token');
  l && !n.has('Authorization') && n.set('Authorization', 'Bearer ' + l);
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
  return (
    (r.status === 401 || r.status === 403) &&
      l &&
      (localStorage.removeItem('token'),
      typeof window < 'u' &&
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: 'Session expired, please log in again', type: 'warning' },
          }),
        )),
    r
  );
}
function te() {
  const t = o.useMemo(() => new URLSearchParams(location.search), [location.search]),
    s = o.useCallback(() => Object.fromEntries(t.entries()), [t]),
    n = o.useCallback((l) => {
      const r = new URLSearchParams(location.search);
      (Object.entries(l).forEach(([i, a]) => {
        a === void 0 || a === '' ? r.delete(i) : r.set(i, String(a));
      }),
        history.replaceState({}, '', `?${r.toString()}`));
    }, []);
  return { getAll: s, setAll: n };
}
function B({ onApply: t }) {
  const { getAll: s, setAll: n } = te(),
    l = s(),
    [r, i] = o.useState(l.q || ''),
    [a, m] = o.useState(l.min || ''),
    [u, v] = o.useState(l.max || ''),
    [c, j] = o.useState(l.brand || ''),
    [f, x] = o.useState(l.vram_min || ''),
    [h, S] = o.useState(l.condition || '');
  return (
    o.useEffect(() => {
      n({ q: r, min: a, max: u, brand: c, vram_min: f, condition: h });
    }, [r, a, u, c, f, h, n]),
    e.jsxs('div', {
      children: [
        e.jsx(X, {
          className: 'mb-2',
          placeholder: 'Search title or description',
          value: r,
          onChange: (g) => i(g.target.value),
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(z, {
              placeholder: 'Min price',
              value: a === '' ? void 0 : Number(a),
              onChange: (g) => m(g == null ? '' : String(g)),
              min: 0,
              style: { width: '100%' },
            }),
            e.jsx(z, {
              placeholder: 'Max price',
              value: u === '' ? void 0 : Number(u),
              onChange: (g) => v(g == null ? '' : String(g)),
              min: 0,
              style: { width: '100%' },
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 mb-2',
          children: [
            e.jsx(I, {
              value: c,
              style: { minWidth: 140 },
              onChange: (g) => j(g),
              options: [
                { value: '', label: 'Any brand' },
                { value: 'NVIDIA', label: 'NVIDIA' },
                { value: 'AMD', label: 'AMD' },
              ],
            }),
            e.jsx(I, {
              value: f,
              style: { minWidth: 140 },
              onChange: (g) => x(String(g)),
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
          value: h,
          onChange: (g) => S(g),
          options: [
            { value: '', label: 'Any condition' },
            { value: 'New', label: 'New' },
            { value: 'Used', label: 'Used' },
          ],
        }),
        e.jsxs('div', {
          className: 'd-flex gap-2 align-items-center',
          children: [
            e.jsx(b, {
              type: 'primary',
              onClick: () =>
                t({ q: r, min: a, max: u, brand: c, vram_min: f, condition: h, page: '1' }),
              children: 'Search',
            }),
            e.jsx(b, {
              onClick: () => {
                (i(''),
                  m(''),
                  v(''),
                  j(''),
                  x(''),
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
  className: n,
  style: l,
  width: r,
  height: i,
  srcSet: a,
  sizes: m,
}) {
  const u = o.useRef(null),
    [v, c] = o.useState(!1);
  return (
    o.useEffect(() => {
      const j = u.current;
      if (!j) return;
      if (!('IntersectionObserver' in window)) {
        c(!0);
        return;
      }
      const f = new IntersectionObserver(
        (x) => {
          const h = x[0];
          h && h.isIntersecting && (c(!0), f.disconnect());
        },
        { rootMargin: '200px' },
      );
      return (f.observe(j), () => f.disconnect());
    }, []),
    e.jsx('img', {
      ref: u,
      src: v ? t : void 0,
      srcSet: v ? a : void 0,
      sizes: v ? m : void 0,
      alt: s,
      className: n,
      style: { backgroundColor: '#f5f5f5', ...l },
      width: r,
      height: i,
      loading: 'lazy',
    })
  );
}
function ke({ gpu: t, onDetails: s }) {
  const n = (() => {
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
                className: 'd-flex justify-content-between align-items-center',
                children: [
                  e.jsx('h5', { className: 'card-title mb-0', children: t.title }),
                  e.jsxs('div', {
                    className: 'd-flex gap-1',
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
                  e.jsx('small', { className: 'text-muted', children: Ie(t.price) }),
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
  const n = document.title;
  return (
    (document.title = t || s),
    () => {
      document.title = n || s;
    }
  );
}
const Re = o.lazy(() =>
  w(() => import('./DetailsModal-BF3kI1s_.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
);
function $() {
  var M;
  const { getAll: t, setAll: s } = te(),
    n = t(),
    l = typeof location < 'u' && location.pathname === '/everything',
    [r, i] = o.useState(n.q || ''),
    [a, m] = o.useState(n.sort || (l ? 'price_desc' : 'date_new')),
    [u, v] = o.useState({
      min: n.min || '',
      max: n.max || '',
      brand: n.brand || '',
      vram_min: n.vram_min || '',
      condition: n.condition || '',
    }),
    [c, j] = o.useState(null),
    [f, x] = o.useState(!1),
    [h, S] = o.useState(Number(n.page || '1')),
    [g] = o.useState(12);
  o.useEffect(() => D('GPU Market — Shop Graphics Cards'), []);
  const le = o.useMemo(() => {
      let p = 'newest';
      a === 'price_asc'
        ? (p = 'price_asc')
        : a === 'price_desc'
          ? (p = 'price_desc')
          : (a === 'date_new' ||
              a === 'featured' ||
              a === 'best' ||
              a === 'alpha_asc' ||
              a === 'alpha_desc' ||
              a === 'date_old') &&
            (p = 'newest');
      const _ = new URLSearchParams();
      return (
        r && _.set('q', r),
        _.set('sort', p),
        Object.entries(u).forEach(([O, P]) => {
          P && _.set(O, String(P));
        }),
        _.set('page', String(h)),
        _.set('per', String(g)),
        _
      );
    }, [r, a, u, h, g]),
    {
      data: N,
      isLoading: k,
      isError: oe,
      refetch: ce,
      isFetching: de,
    } = me({
      queryKey: ['search', r, a, u, h, g],
      queryFn: async () => (
        s({ q: r, sort: a, page: String(h), ...u }),
        (await F('/api/search?' + le.toString())).json()
      ),
      placeholderData: (p) => p,
      staleTime: 3e4,
      retry: 2,
    }),
    T = o.useRef(!1);
  function ue() {
    T.current ||
      ((T.current = !0),
      w(() => import('./DetailsModal-BF3kI1s_.js'), __vite__mapDeps([0, 1, 2, 3, 4])),
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
          e.jsx(X, { placeholder: 'Search GPUs...', value: r, onChange: (p) => i(p.target.value) }),
          e.jsx(I, {
            value: a,
            style: { width: 220 },
            onChange: (p) => m(p),
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
          e.jsx(b, { type: 'primary', onClick: () => ce(), children: 'Search' }),
          e.jsx(b, { onClick: () => x(!0), className: 'd-md-none', children: 'Filters' }),
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
                onApply: (p) => {
                  (v((_) => ({ ..._, ...p })), S(1));
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
                  children: e.jsx(V, {
                    status: 'error',
                    title: 'Failed to load list',
                    subTitle: 'Please try again later.',
                  }),
                }),
              e.jsxs('div', {
                className: 'row',
                onMouseEnter: ue,
                children: [
                  (k || de) &&
                    e.jsx(e.Fragment, {
                      children: Array.from({ length: 4 }).map((p, _) =>
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
                  !k &&
                    ((N == null ? void 0 : N.results) || []).map((p) =>
                      e.jsx(
                        'div',
                        {
                          className: 'col-md-6',
                          children: e.jsx(ke, {
                            gpu: p,
                            onDetails: async (_) => {
                              const P = await (await F(`/api/gpus/${_}`)).json();
                              j(P);
                            },
                          }),
                        },
                        p.id,
                      ),
                    ),
                  !k &&
                    (((M = N == null ? void 0 : N.results) == null ? void 0 : M.length) || 0) ===
                      0 &&
                    e.jsx('div', {
                      className: 'col-12',
                      children: e.jsx('div', {
                        className: 'my-4',
                        children: e.jsx(V, {
                          status: 'info',
                          title: 'No results',
                          subTitle: 'Try adjusting filters.',
                        }),
                      }),
                    }),
                ],
              }),
              e.jsx('div', {
                className: 'd-flex justify-content-center mt-3',
                children: e.jsx(be, {
                  current: h,
                  pageSize: g,
                  total: (N == null ? void 0 : N.total) || 0,
                  onChange: (p) => S(p),
                  showSizeChanger: !1,
                }),
              }),
            ],
          }),
        ],
      }),
      e.jsxs(ee, {
        open: f,
        onClose: () => x(!1),
        children: [
          e.jsx('h5', { className: 'mb-3', children: 'Filters' }),
          e.jsx(B, {
            onApply: (p) => {
              (x(!1), v((_) => ({ ..._, ...p })), S(1));
            },
          }),
        ],
      }),
      e.jsx(o.Suspense, {
        fallback: null,
        children: e.jsx(Re, { item: c, onClose: () => j(null) }),
      }),
    ],
  });
}
function Le() {
  const [t, s] = _e.useMessage();
  function n(r, i = 'info') {
    const a =
      i === 'error' ? 'error' : i === 'warning' ? 'warning' : i === 'success' ? 'success' : 'info';
    t.open({ type: a, content: r, duration: 3 });
  }
  return { api: { push: n }, messages: s };
}
function Te({ messages: t }) {
  return e.jsx(e.Fragment, { children: t });
}
function A({ children: t }) {
  const s = xe(),
    n = Y();
  return (
    o.useEffect(() => {
      if (!localStorage.getItem('token')) {
        const r = n.pathname + (n.search || '');
        s('/login', { replace: !0, state: { from: r } });
      }
    }, [s, n]),
    e.jsx(e.Fragment, { children: t })
  );
}
var Me = {};
const q = (t) => {
    let s;
    const n = new Set(),
      l = (c, j) => {
        const f = typeof c == 'function' ? c(s) : c;
        if (!Object.is(f, s)) {
          const x = s;
          ((s = (j ?? (typeof f != 'object' || f === null)) ? f : Object.assign({}, s, f)),
            n.forEach((h) => h(s, x)));
        }
      },
      r = () => s,
      u = {
        setState: l,
        getState: r,
        getInitialState: () => v,
        subscribe: (c) => (n.add(c), () => n.delete(c)),
        destroy: () => {
          ((Me ? 'production' : void 0) !== 'production' &&
            console.warn(
              '[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.',
            ),
            n.clear());
        },
      },
      v = (s = t(l, r, u));
    return u;
  },
  Oe = (t) => (t ? q(t) : q);
var se = { exports: {} },
  ne = {},
  re = { exports: {} },
  ae = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var E = o;
function ze(t, s) {
  return (t === s && (t !== 0 || 1 / t === 1 / s)) || (t !== t && s !== s);
}
var Ve = typeof Object.is == 'function' ? Object.is : ze,
  Ge = E.useState,
  Ue = E.useEffect,
  Fe = E.useLayoutEffect,
  Be = E.useDebugValue;
function $e(t, s) {
  var n = s(),
    l = Ge({ inst: { value: n, getSnapshot: s } }),
    r = l[0].inst,
    i = l[1];
  return (
    Fe(
      function () {
        ((r.value = n), (r.getSnapshot = s), R(r) && i({ inst: r }));
      },
      [t, n, s],
    ),
    Ue(
      function () {
        return (
          R(r) && i({ inst: r }),
          t(function () {
            R(r) && i({ inst: r });
          })
        );
      },
      [t],
    ),
    Be(n),
    n
  );
}
function R(t) {
  var s = t.getSnapshot;
  t = t.value;
  try {
    var n = s();
    return !Ve(t, n);
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
ae.useSyncExternalStore = E.useSyncExternalStore !== void 0 ? E.useSyncExternalStore : We;
re.exports = ae;
var Qe = re.exports;
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
ne.useSyncExternalStoreWithSelector = function (t, s, n, l, r) {
  var i = Ze(null);
  if (i.current === null) {
    var a = { hasValue: !1, value: null };
    i.current = a;
  } else a = i.current;
  i = et(
    function () {
      function u(x) {
        if (!v) {
          if (((v = !0), (c = x), (x = l(x)), r !== void 0 && a.hasValue)) {
            var h = a.value;
            if (r(h, x)) return (j = h);
          }
          return (j = x);
        }
        if (((h = j), Ke(c, x))) return h;
        var S = l(x);
        return r !== void 0 && r(h, S) ? ((c = x), h) : ((c = x), (j = S));
      }
      var v = !1,
        c,
        j,
        f = n === void 0 ? null : n;
      return [
        function () {
          return u(s());
        },
        f === null
          ? void 0
          : function () {
              return u(f());
            },
      ];
    },
    [s, n, l, r],
  );
  var m = Ye(t, i[0], i[1]);
  return (
    Xe(
      function () {
        ((a.hasValue = !0), (a.value = m));
      },
      [m],
    ),
    tt(m),
    m
  );
};
se.exports = ne;
var st = se.exports;
const nt = ve(st);
var ie = {};
const { useDebugValue: rt } = Z,
  { useSyncExternalStoreWithSelector: at } = nt;
let W = !1;
const it = (t) => t;
function lt(t, s = it, n) {
  (ie ? 'production' : void 0) !== 'production' &&
    n &&
    !W &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (W = !0));
  const l = at(t.subscribe, t.getState, t.getServerState || t.getInitialState, s, n);
  return (rt(l), l);
}
const Q = (t) => {
    (ie ? 'production' : void 0) !== 'production' &&
      typeof t != 'function' &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const s = typeof t == 'function' ? Oe(t) : t,
      n = (l, r) => lt(s, l, r);
    return (Object.assign(n, s), n);
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
      const n = H(s);
      t({
        token: s,
        user: n ? { id: n.id, username: n.username, display_name: n.display_name } : null,
      });
    }
  },
  login: (s) => {
    localStorage.setItem('token', s);
    const n = H(s);
    t({
      token: s,
      user: n ? { id: n.id, username: n.username, display_name: n.display_name } : null,
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
  const t = Y();
  o.useEffect(() => {
    const s = dt(t.pathname, t.search),
      n = sessionStorage.getItem(s);
    if (n) {
      const i = parseInt(n, 10);
      Number.isNaN(i) || setTimeout(() => window.scrollTo(0, i), 0);
    } else window.scrollTo(0, 0);
    function l() {
      sessionStorage.setItem(s, String(window.scrollY));
    }
    window.addEventListener('beforeunload', l);
    const r = () => {
      const i = sessionStorage.getItem(s),
        a = i ? parseInt(i, 10) : 0;
      setTimeout(() => window.scrollTo(0, Number.isNaN(a) ? 0 : a), 0);
    };
    return (
      window.addEventListener('popstate', r),
      () => {
        (window.removeEventListener('beforeunload', l),
          window.removeEventListener('popstate', r),
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
function pt() {
  return e.jsxs('div', {
    className: 'container py-5 text-center',
    children: [
      e.jsx('h1', { className: 'display-5', children: '500' }),
      e.jsx('p', { className: 'lead', children: 'Unexpected server error.' }),
      e.jsx('a', { className: 'btn btn-primary', href: '/', children: 'Go Home' }),
    ],
  });
}
const xt = o.lazy(() => w(() => import('./Profile-CNKs9qiu.js'), __vite__mapDeps([6, 1, 2, 4]))),
  vt = o.lazy(() => w(() => import('./Login-D7cBCC4z.js'), __vite__mapDeps([7, 1, 2, 8, 9, 4]))),
  jt = o.lazy(() =>
    w(() => import('./Register-D3B6cT-W.js'), __vite__mapDeps([10, 1, 2, 8, 9, 4])),
  ),
  gt = o.lazy(() => w(() => import('./MyListings-hcw7AVd2.js'), __vite__mapDeps([11, 1, 2, 4]))),
  yt = o.lazy(() => w(() => import('./Detail-CZr2vykS.js'), __vite__mapDeps([12, 1, 2, 3, 4]))),
  bt = o.lazy(() => w(() => import('./Sell-fgyAY8xk.js'), __vite__mapDeps([13, 1, 2, 8, 9, 4]))),
  _t = o.lazy(() => w(() => import('./Edit-KPhRq8Io.js'), __vite__mapDeps([14, 1, 2, 8, 9, 4]))),
  wt = o.lazy(() => w(() => import('./NotFound-Bq8LLBzl.js'), __vite__mapDeps([15, 1, 2, 4]))),
  St = o.lazy(() =>
    w(() => import('./ProfileEdit-Do9usDKL.js'), __vite__mapDeps([16, 1, 2, 8, 4])),
  ),
  Nt = o.lazy(() =>
    w(() => import('./SellToUs-DbDTbtSX.js'), __vite__mapDeps([17, 1, 2, 9, 8, 4])),
  ),
  Et = o.lazy(() => w(() => import('./Contact-COJtQgoL.js'), __vite__mapDeps([18, 1, 2, 9, 8, 4])));
function Pt() {
  const { api: t, messages: s } = Le(),
    { user: n, init: l, logout: r } = ct();
  (ut(),
    o.useEffect(() => {
      l();
      function u(v) {
        const c = v.detail || {};
        t.push(c.text || '', c.type || 'info');
      }
      return (
        window.addEventListener('app-toast', u),
        () => window.removeEventListener('app-toast', u)
      );
    }, []));
  const [i, a] = o.useState(!1),
    m = e.jsx(Se, {
      items: [
        {
          key: 'nvidia-40',
          label: e.jsx(d, { to: '/?brand=NVIDIA&vram_min=8', children: 'NVIDIA 40 Series' }),
        },
        {
          key: 'nvidia-30',
          label: e.jsx(d, { to: '/?brand=NVIDIA&vram_min=8', children: 'NVIDIA 30 Series' }),
        },
        {
          key: 'amd-7000',
          label: e.jsx(d, { to: '/?brand=AMD&vram_min=8', children: 'AMD 7000 Series' }),
        },
        {
          key: 'amd-6000',
          label: e.jsx(d, { to: '/?brand=AMD&vram_min=8', children: 'AMD 6000 Series' }),
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
            e.jsx(d, { to: '/', className: 'navbar-brand', children: 'GPU Market' }),
            e.jsxs('div', {
              className: 'ms-auto d-none d-md-flex gap-2',
              children: [
                e.jsx(d, {
                  to: '/',
                  children: e.jsx(b, { type: 'text', size: 'small', children: 'Home' }),
                }),
                e.jsx(d, {
                  to: '/everything?sort=price_desc',
                  children: e.jsx(b, { type: 'text', size: 'small', children: 'Shop Everything' }),
                }),
                e.jsx(we, {
                  overlay: m,
                  trigger: ['click'],
                  children: e.jsx(b, { size: 'small', children: 'Shop Graphics Cards' }),
                }),
                e.jsx(d, {
                  to: '/sell',
                  children: e.jsx(b, { size: 'small', type: 'default', children: 'Sell' }),
                }),
                e.jsx(d, {
                  to: '/sell-to-us',
                  children: e.jsx(b, { size: 'small', type: 'default', children: 'Sell to us' }),
                }),
                e.jsx(d, {
                  to: '/my',
                  children: e.jsx(b, { size: 'small', type: 'default', children: 'My Listings' }),
                }),
                e.jsx(d, {
                  to: '/profile',
                  children: e.jsx(b, { size: 'small', type: 'default', children: 'My Profile' }),
                }),
                n &&
                  e.jsx(d, {
                    to: '/profile/edit',
                    children: e.jsx(b, {
                      size: 'small',
                      type: 'default',
                      children: 'Edit Profile',
                    }),
                  }),
                !n &&
                  e.jsx(d, {
                    to: '/login',
                    children: e.jsx(b, { size: 'small', type: 'primary', children: 'Login' }),
                  }),
                !n &&
                  e.jsx(d, {
                    to: '/register',
                    children: e.jsx(b, { size: 'small', type: 'primary', children: 'Register' }),
                  }),
                n &&
                  e.jsx('span', {
                    className: 'align-self-center small text-muted',
                    children: n.display_name || n.username,
                  }),
                n &&
                  e.jsx(b, {
                    size: 'small',
                    danger: !0,
                    onClick: () => {
                      (r(),
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
              children: e.jsx(b, { size: 'small', onClick: () => a(!0), children: 'Menu' }),
            }),
          ],
        }),
      }),
      e.jsx(ee, {
        open: i,
        onClose: () => a(!1),
        children: e.jsxs('div', {
          className: 'd-flex flex-column gap-2',
          children: [
            e.jsx(d, { to: '/', onClick: () => a(!1), children: 'Home' }),
            e.jsx(d, {
              to: '/everything?sort=price_desc',
              onClick: () => a(!1),
              children: 'Shop Everything',
            }),
            e.jsx('div', { className: 'fw-bold', children: 'Shop Graphics Cards' }),
            e.jsx(d, { to: '/?brand=NVIDIA', onClick: () => a(!1), children: 'NVIDIA' }),
            e.jsx(d, { to: '/?brand=AMD', onClick: () => a(!1), children: 'AMD' }),
            e.jsx(d, { to: '/sell', onClick: () => a(!1), children: 'Sell' }),
            e.jsx(d, { to: '/sell-to-us', onClick: () => a(!1), children: 'Sell to us' }),
            e.jsx(d, { to: '/my', onClick: () => a(!1), children: 'My Listings' }),
            e.jsx(d, { to: '/profile', onClick: () => a(!1), children: 'My Profile' }),
            !n && e.jsx(d, { to: '/login', onClick: () => a(!1), children: 'Login' }),
            !n && e.jsx(d, { to: '/register', onClick: () => a(!1), children: 'Register' }),
            n &&
              e.jsx('button', {
                className: 'btn btn-outline-danger btn-sm',
                onClick: () => {
                  (a(!1),
                    r(),
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
            e.jsx(y, { path: '/', element: e.jsx($, {}) }),
            e.jsx(y, { path: '/everything', element: e.jsx($, {}) }),
            e.jsx(y, { path: '/profile', element: e.jsx(xt, {}) }),
            e.jsx(y, { path: '/profile/edit', element: e.jsx(A, { children: e.jsx(St, {}) }) }),
            e.jsx(y, { path: '/g/:id', element: e.jsx(yt, {}) }),
            e.jsx(y, { path: '/sell', element: e.jsx(A, { children: e.jsx(bt, {}) }) }),
            e.jsx(y, { path: '/sell-to-us', element: e.jsx(Nt, {}) }),
            e.jsx(y, { path: '/contact', element: e.jsx(Et, {}) }),
            e.jsx(y, { path: '/edit/:id', element: e.jsx(A, { children: e.jsx(_t, {}) }) }),
            e.jsx(y, { path: '*', element: e.jsx(wt, {}) }),
            e.jsx(y, { path: '/about', element: e.jsx(mt, {}) }),
            e.jsx(y, { path: '/privacy', element: e.jsx(ht, {}) }),
            e.jsx(y, { path: '/terms', element: e.jsx(ft, {}) }),
            e.jsx(y, { path: '/500', element: e.jsx(pt, {}) }),
            e.jsx(y, { path: '/login', element: e.jsx(vt, {}) }),
            e.jsx(y, { path: '/register', element: e.jsx(jt, {}) }),
            e.jsx(y, { path: '/my', element: e.jsx(A, { children: e.jsx(gt, {}) }) }),
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
                        e.jsx(d, { to: '/sell-to-us', children: 'Sell to us' }),
                        e.jsx(d, {
                          to: '/everything?sort=price_desc',
                          children: 'Shop Everything',
                        }),
                        e.jsx(d, { to: '/', children: 'Shop Graphics Cards' }),
                        e.jsx(d, { to: '/about', children: 'About Us' }),
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
                        e.jsx(d, { to: '/terms', children: 'Terms of Service' }),
                        e.jsx(d, { to: '/privacy', children: 'Privacy Policy' }),
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
class At extends o.Component {
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
const It = new he();
L.createRoot(document.getElementById('root')).render(
  e.jsx(Z.StrictMode, {
    children: e.jsx(At, {
      children: e.jsx(fe, { client: It, children: e.jsx(ge, { children: e.jsx(Pt, {}) }) }),
    }),
  }),
);
export { ke as G, w as _, F as a, Ie as f, ct as u };

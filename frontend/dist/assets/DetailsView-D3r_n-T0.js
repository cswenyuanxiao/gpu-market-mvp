import { j as s } from './react-query-BGeIQRPr.js';
import { R as l } from './react-CTDr35rJ.js';
import { f as c } from './index-aktKGDxK.js';
import { g as n, h as p, i as o, j as h, A as d, B as g } from './antd-n40S5sxn.js';
function v({ item: a }) {
  const [e, t] = l.useState(null);
  return (
    l.useEffect(() => {
      const r =
        Array.isArray(a == null ? void 0 : a.images) && a.images.length > 0
          ? a.images[0].image_path
          : null;
      t((a == null ? void 0 : a.image_path) || r || null);
    }, [
      a == null ? void 0 : a.id,
      a == null ? void 0 : a.image_path,
      a == null ? void 0 : a.images,
    ]),
    s.jsxs('div', {
      className: 'row g-3',
      children: [
        s.jsxs('div', {
          className: 'col-md-6',
          children: [
            e
              ? s.jsx(n, {
                  src: e,
                  srcSet: `${e} 1x, ${e} 2x`,
                  width: '100%',
                  style: { borderRadius: 6, marginBottom: 8 },
                })
              : s.jsx('div', {
                  style: {
                    width: '100%',
                    height: 320,
                    borderRadius: 6,
                    marginBottom: 8,
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                  },
                  children: 'No image',
                }),
            Array.isArray(a == null ? void 0 : a.images) &&
              a.images.length > 0 &&
              s.jsx('div', {
                className: 'd-flex flex-wrap gap-2',
                children: a.images.map((r, i) =>
                  s.jsx(
                    n,
                    {
                      src: r.thumb_path || r.image_path,
                      width: 72,
                      height: 72,
                      placeholder: s.jsx('div', {
                        style: { width: 72, height: 72, background: '#f0f0f0', borderRadius: 4 },
                      }),
                      style: {
                        objectFit: 'cover',
                        borderRadius: 4,
                        cursor: 'pointer',
                        border: r.image_path === e ? '2px solid #1677ff' : '2px solid transparent',
                        boxShadow: r.image_path === e ? '0 0 0 2px rgba(22,119,255,0.2)' : void 0,
                      },
                      preview: !1,
                      onClick: () => t(r.image_path),
                    },
                    i,
                  ),
                ),
              }),
          ],
        }),
        s.jsxs('div', {
          className: 'col-md-6',
          children: [
            s.jsxs(p, {
              direction: 'vertical',
              size: 'small',
              style: { width: '100%' },
              children: [
                s.jsx(o.Paragraph, {
                  type: 'secondary',
                  style: { marginBottom: 0 },
                  children: s.jsx(h, {
                    color: a.condition === 'New' ? 'green' : 'gray',
                    text: a.condition,
                  }),
                }),
                s.jsx(o.Title, { level: 4, style: { margin: 0 }, children: c(a.price) }),
                s.jsx(o.Paragraph, {
                  style: { whiteSpace: 'pre-wrap' },
                  children: a.description || '',
                }),
              ],
            }),
            s.jsxs('div', {
              className: 'd-flex align-items-center gap-2 mb-3',
              children: [
                a.seller_avatar
                  ? s.jsx(d, { size: 32, src: a.seller_avatar })
                  : s.jsx(d, { size: 32, children: (a.seller_name || 'U')[0] }),
                s.jsx('span', { children: a.seller_name || '' }),
              ],
            }),
            s.jsx('div', { className: 'd-flex gap-2', children: s.jsx(x, { id: a.id }) }),
          ],
        }),
      ],
    })
  );
}
function x({ id: a }) {
  const [e, t] = l.useState(!1);
  return s.jsx(g, {
    type: e ? 'primary' : 'default',
    disabled: e,
    onClick: async () => {
      const r = `${location.origin}/g/${a}`;
      try {
        (await navigator.clipboard.writeText(r),
          t(!0),
          window.dispatchEvent(
            new CustomEvent('app-toast', { detail: { text: 'Link copied', type: 'success' } }),
          ),
          setTimeout(() => t(!1), 2e3));
      } catch {
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: 'Copy failed', type: 'error' } }),
        );
      }
    },
    children: e ? 'Copied!' : 'Copy Link',
  });
}
export { v as D };

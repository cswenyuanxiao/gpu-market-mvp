import { j as e } from './react-query-BGeIQRPr.js';
import { f as d } from './index-BBAniAW2.js';
import { g as l, h as o, i as r, j as n, A as t, B as p } from './antd-n40S5sxn.js';
function j({ item: a }) {
  var i;
  return e.jsxs('div', {
    className: 'row g-3',
    children: [
      e.jsxs('div', {
        className: 'col-md-6',
        children: [
          a.image_path &&
            e.jsx(l, {
              src: a.image_path,
              srcSet: `${a.image_path} 1x, ${a.image_path} 2x`,
              width: '100%',
              style: { borderRadius: 6, marginBottom: 8 },
            }),
          e.jsx('div', {
            className: 'd-flex flex-wrap gap-2',
            children:
              (i = a.images) == null
                ? void 0
                : i.map((s, c) =>
                    e.jsx(
                      l,
                      {
                        src: s.thumb_path || s.image_path,
                        width: 72,
                        height: 72,
                        placeholder: e.jsx('div', {
                          style: { width: 72, height: 72, background: '#f0f0f0', borderRadius: 4 },
                        }),
                        style: { objectFit: 'cover', borderRadius: 4 },
                        preview: !1,
                      },
                      c,
                    ),
                  ),
          }),
        ],
      }),
      e.jsxs('div', {
        className: 'col-md-6',
        children: [
          e.jsxs(o, {
            direction: 'vertical',
            size: 'small',
            style: { width: '100%' },
            children: [
              e.jsx(r.Paragraph, {
                type: 'secondary',
                style: { marginBottom: 0 },
                children: e.jsx(n, {
                  color: a.condition === 'New' ? 'green' : 'gray',
                  text: a.condition,
                }),
              }),
              e.jsx(r.Title, { level: 4, style: { margin: 0 }, children: d(a.price) }),
              e.jsx(r.Paragraph, {
                style: { whiteSpace: 'pre-wrap' },
                children: a.description || '',
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'd-flex align-items-center gap-2 mb-3',
            children: [
              a.seller_avatar
                ? e.jsx(t, { size: 32, src: a.seller_avatar })
                : e.jsx(t, { size: 32, children: (a.seller_name || 'U')[0] }),
              e.jsx('span', { children: a.seller_name || '' }),
            ],
          }),
          e.jsx('div', {
            className: 'd-flex gap-2',
            children: e.jsx(p, {
              onClick: () => {
                const s = `${location.origin}/g/${a.id}`;
                (navigator.clipboard.writeText(s),
                  window.dispatchEvent(
                    new CustomEvent('app-toast', {
                      detail: { text: 'Link copied', type: 'success' },
                    }),
                  ));
              },
              children: 'Copy Link',
            }),
          }),
        ],
      }),
    ],
  });
}
export { j as D };

import { j as s } from './react-query-BGeIQRPr.js';
import { r as g } from './react-CTDr35rJ.js';
function O({ onChange: c, maxImages: d = 10, maxSizeMb: l = 5, pixelLimit: r = 25e6 }) {
  const [i, u] = g.useState([]),
    b = g.useRef(null),
    [x, h] = g.useState(!1);
  g.useEffect(() => {
    c(i.map((t) => t.file));
  }, [i, c]);
  function y() {
    var t;
    (t = b.current) == null || t.click();
  }
  async function v(t) {
    if (!t) return;
    const e = [],
      a = [];
    try {
      for (let n = 0; n < t.length; n++) {
        const o = t.item(n);
        if (!o || !o.type.startsWith('image/')) continue;
        if (i.length + e.length >= d) break;
        const p = o.size > l * 1024 * 1024,
          f = URL.createObjectURL(o);
        a.push(f);
        const m = await D(f).catch(() => ({ width: 0, height: 0 })),
          C = m.width * m.height > r;
        e.push({ file: o, url: f, width: m.width, height: m.height, tooLarge: p || C });
      }
      (e.some((n) => n.tooLarge) &&
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: {
              text: `Some images exceed limit (${l}MB or ${r.toLocaleString()} px)`,
              type: 'warning',
            },
          }),
        ),
        u((n) => [...n, ...e]));
    } finally {
    }
  }
  function N(t) {
    const e = i[t];
    (e && URL.revokeObjectURL(e.url), u((a) => a.filter((n, o) => o !== t)));
  }
  function j(t, e) {
    u((a) => {
      const n = a.slice(),
        o = t + e;
      if (o < 0 || o >= n.length) return a;
      const p = n[t];
      return ((n[t] = n[o]), (n[o] = p), n);
    });
  }
  function w(t) {
    u((e) => {
      if (t <= 0) return e;
      const a = e.slice(),
        [n] = a.splice(t, 1);
      return n ? (a.unshift(n), a) : e;
    });
  }
  function k(t) {
    (t.preventDefault(), h(!1), v(t.dataTransfer.files));
  }
  function L(t) {
    (t.preventDefault(), h(!0));
  }
  function R() {
    h(!1);
  }
  return s.jsxs('div', {
    children: [
      s.jsx('input', {
        ref: b,
        type: 'file',
        multiple: !0,
        accept: 'image/*',
        className: 'd-none',
        onChange: (t) => v(t.target.files),
      }),
      s.jsxs('div', {
        className: 'd-flex align-items-center gap-2 mb-2',
        children: [
          s.jsx('button', {
            type: 'button',
            className: 'btn btn-sm btn-outline-secondary',
            onClick: y,
            children: 'Add Images',
          }),
          s.jsxs('small', {
            className: 'text-muted',
            children: ['Up to ', d, ' images, ≤ ', l, 'MB, ≤ ', r.toLocaleString(), ' px'],
          }),
        ],
      }),
      s.jsxs('div', {
        className: `p-3 border rounded ${x ? 'border-primary bg-light' : 'border-secondary-subtle'}`,
        onDrop: k,
        onDragOver: L,
        onDragLeave: R,
        children: [
          s.jsx('div', { className: 'text-muted mb-2', children: 'Drag & drop images here' }),
          s.jsx('div', {
            className: 'd-flex flex-wrap gap-2',
            children: i.map((t, e) =>
              s.jsxs(
                'div',
                {
                  className: 'position-relative',
                  children: [
                    s.jsx('img', {
                      src: t.url,
                      width: 96,
                      height: 96,
                      style: { objectFit: 'cover' },
                      loading: 'lazy',
                      className: `rounded border ${t.tooLarge ? 'border-danger' : ''}`,
                    }),
                    s.jsx('div', {
                      className: 'position-absolute top-0 start-0 d-flex gap-1 p-1',
                      children: s.jsx('span', {
                        className: 'badge text-bg-dark',
                        children: e === 0 ? 'Cover' : e + 1,
                      }),
                    }),
                    s.jsxs('div', {
                      className: 'position-absolute bottom-0 start-0 d-flex gap-1 p-1',
                      children: [
                        s.jsx('button', {
                          type: 'button',
                          className: 'btn btn-sm btn-light',
                          onClick: () => j(e, -1),
                          disabled: e === 0,
                          title: 'Move left',
                          children: '←',
                        }),
                        s.jsx('button', {
                          type: 'button',
                          className: 'btn btn-sm btn-light',
                          onClick: () => j(e, 1),
                          disabled: e === i.length - 1,
                          title: 'Move right',
                          children: '→',
                        }),
                        s.jsx('button', {
                          type: 'button',
                          className: 'btn btn-sm btn-warning',
                          onClick: () => w(e),
                          disabled: e === 0,
                          title: 'Set as cover',
                          children: '★',
                        }),
                      ],
                    }),
                    s.jsx('button', {
                      type: 'button',
                      className: 'btn btn-sm btn-danger position-absolute top-0 end-0',
                      onClick: () => N(e),
                      title: 'Remove',
                      children: '×',
                    }),
                  ],
                },
                e,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
function D(c) {
  return new Promise((d, l) => {
    const r = new Image();
    ((r.onload = () => d({ width: r.naturalWidth, height: r.naturalHeight })),
      (r.onerror = l),
      (r.src = c));
  });
}
export { O as default };

import { j as t } from './react-query-BGeIQRPr.js';
import { r as i } from './react-CTDr35rJ.js';
import { a as m } from './index-BBAniAW2.js';
import { F as y } from './FormField-iyrhpl26.js';
import { A as j, I as w, B as g } from './antd-n40S5sxn.js';
function N() {
  const [n, p] = i.useState(''),
    [l, u] = i.useState(null),
    [o, c] = i.useState(null),
    [f, d] = i.useState(!1);
  i.useEffect(() => {
    const s = localStorage.getItem('token');
    if (s)
      try {
        const a = JSON.parse(atob(s.split('.')[1] || ''));
        m(`/api/users/${a.id}`).then(async (e) => {
          const r = await e.json();
          (p(r.display_name || ''), c(r.avatar_path || null));
        });
      } catch {}
  }, []);
  function v(s) {
    var e;
    const a = ((e = s.target.files) == null ? void 0 : e.item(0)) || null;
    (u(a), a && c(URL.createObjectURL(a)));
  }
  async function h(s) {
    var a;
    (s.preventDefault(), d(!0));
    try {
      if (l) {
        const e = new FormData();
        e.append('avatar', l);
        const r = await m('/api/users/me/avatar', { method: 'POST', body: e });
        if (!r.ok) {
          const x =
            ((a = await r.json().catch(() => ({}))) == null ? void 0 : a.error) || 'Upload failed';
          window.dispatchEvent(
            new CustomEvent('app-toast', { detail: { text: x, type: 'error' } }),
          );
          return;
        }
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: 'Avatar updated', type: 'success' } }),
        );
      }
    } finally {
      d(!1);
    }
  }
  return t.jsxs('div', {
    className: 'container py-3',
    style: { maxWidth: 520 },
    children: [
      t.jsx('h3', { children: 'Edit Profile' }),
      t.jsxs('form', {
        onSubmit: h,
        children: [
          t.jsxs('div', {
            className: 'd-flex align-items-center gap-3 mb-3',
            children: [
              t.jsx(j, { size: 64, src: o || void 0, children: n == null ? void 0 : n[0] }),
              t.jsx(w, { value: n, disabled: !0, style: { maxWidth: 260 } }),
            ],
          }),
          t.jsx(y, {
            label: 'Avatar',
            htmlFor: 'avatar',
            children: t.jsx('input', {
              id: 'avatar',
              type: 'file',
              accept: 'image/*',
              className: 'form-control',
              onChange: v,
            }),
          }),
          o &&
            t.jsx('div', {
              className: 'mb-3',
              children: t.jsx('img', {
                src: o,
                style: { width: 96, height: 96, objectFit: 'cover' },
                className: 'rounded',
              }),
            }),
          t.jsx(g, { type: 'primary', loading: f, htmlType: 'submit', children: 'Save' }),
        ],
      }),
    ],
  });
}
export { N as default };

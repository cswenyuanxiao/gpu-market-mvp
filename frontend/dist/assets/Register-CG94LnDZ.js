import { j as e } from './react-query-BGeIQRPr.js';
import { r as f, u as x, L as j } from './react-CTDr35rJ.js';
import { a as w } from './index-DeqD4MY7.js';
import { F as t } from './FormField-iyrhpl26.js';
import { u as b, a as N, o as F, s as o } from './zod-SQF3v9p3.js';
import { B as S } from './antd-n40S5sxn.js';
const v = F({
  username: o().min(3, 'At least 3 characters'),
  password: o().min(6, 'At least 6 characters'),
  display_name: o().optional(),
});
function L() {
  var n, m, l;
  const [d, i] = f.useState(!1),
    u = x(),
    {
      register: r,
      handleSubmit: g,
      formState: { errors: a },
    } = b({ resolver: N(v) });
  async function h(s) {
    var p;
    i(!0);
    try {
      const c = await w('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: s.username,
          password: s.password,
          display_name: s.display_name || s.username,
        }),
      });
      if (c.status !== 201) {
        const y =
          ((p = await c.json().catch(() => ({}))) == null ? void 0 : p.error) || 'Register failed';
        window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: y, type: 'error' } }));
        return;
      }
      (window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: 'Registered, please login', type: 'success' },
        }),
      ),
        u('/login'));
    } finally {
      i(!1);
    }
  }
  return e.jsxs('div', {
    className: 'container py-4',
    style: { maxWidth: 480 },
    children: [
      e.jsx('h3', { className: 'mb-3', children: 'Register' }),
      e.jsxs('form', {
        onSubmit: g(h),
        children: [
          e.jsx(t, {
            label: 'Username',
            htmlFor: 'reg-username',
            error: (n = a.username) == null ? void 0 : n.message,
            children: e.jsx('input', {
              id: 'reg-username',
              className: 'form-control',
              ...r('username'),
            }),
          }),
          e.jsx(t, {
            label: 'Password',
            htmlFor: 'reg-password',
            error: (m = a.password) == null ? void 0 : m.message,
            children: e.jsx('input', {
              id: 'reg-password',
              type: 'password',
              className: 'form-control',
              ...r('password'),
            }),
          }),
          e.jsx(t, {
            label: 'Display Name',
            htmlFor: 'reg-display',
            error: (l = a.display_name) == null ? void 0 : l.message,
            children: e.jsx('input', {
              id: 'reg-display',
              className: 'form-control',
              ...r('display_name'),
            }),
          }),
          e.jsx(S, {
            type: 'primary',
            htmlType: 'submit',
            block: !0,
            loading: d,
            children: 'Create Account',
          }),
        ],
      }),
      e.jsxs('div', {
        className: 'mt-3',
        children: ['Already have an account? ', e.jsx(j, { to: '/login', children: 'Login' })],
      }),
    ],
  });
}
export { L as default };

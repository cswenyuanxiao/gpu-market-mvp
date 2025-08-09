import { j as e } from './react-query-BGeIQRPr.js';
import { r as b, u as v, e as L, L as S } from './react-CTDr35rJ.js';
import { u as N, a as F } from './index-BBAniAW2.js';
import { F as l } from './FormField-iyrhpl26.js';
import { u as E, a as T, o as k, s as d } from './zod-SQF3v9p3.js';
import { B as C } from './antd-n40S5sxn.js';
const P = k({
  username: d().min(1, 'Username is required'),
  password: d().min(1, 'Password is required'),
});
function J() {
  var n, i;
  const [p, r] = b.useState(!1),
    u = v(),
    s = L(),
    { login: g } = N(),
    {
      register: o,
      handleSubmit: h,
      formState: { errors: a },
    } = E({ resolver: T(P) });
  async function f(w) {
    var m, c;
    r(!0);
    try {
      const t = await F('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(w),
      });
      if (!t.ok) {
        const j =
          ((m = await t.json().catch(() => ({}))) == null ? void 0 : m.error) || 'Login failed';
        window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: j, type: 'error' } }));
        return;
      }
      const x = await t.json();
      (g(x.token || ''),
        window.dispatchEvent(
          new CustomEvent('app-toast', { detail: { text: 'Logged in', type: 'success' } }),
        ));
      const y = ((c = s == null ? void 0 : s.state) == null ? void 0 : c.from) || '/my';
      u(y, { replace: !0 });
    } finally {
      r(!1);
    }
  }
  return e.jsxs('div', {
    className: 'container py-4',
    style: { maxWidth: 420 },
    children: [
      e.jsx('h3', { className: 'mb-3', children: 'Login' }),
      e.jsxs('form', {
        onSubmit: h(f),
        children: [
          e.jsx(l, {
            label: 'Username',
            htmlFor: 'login-username',
            error: (n = a.username) == null ? void 0 : n.message,
            children: e.jsx('input', {
              id: 'login-username',
              className: 'form-control',
              ...o('username'),
            }),
          }),
          e.jsx(l, {
            label: 'Password',
            htmlFor: 'login-password',
            error: (i = a.password) == null ? void 0 : i.message,
            children: e.jsx('input', {
              id: 'login-password',
              type: 'password',
              className: 'form-control',
              ...o('password'),
            }),
          }),
          e.jsx(C, {
            type: 'primary',
            htmlType: 'submit',
            block: !0,
            loading: p,
            children: 'Sign In',
          }),
        ],
      }),
      e.jsxs('div', {
        className: 'mt-3',
        children: ['New here? ', e.jsx(S, { to: '/register', children: 'Create an account' })],
      }),
    ],
  });
}
export { J as default };

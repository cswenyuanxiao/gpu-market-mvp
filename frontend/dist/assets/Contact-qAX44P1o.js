import { j as e } from './react-query-BGeIQRPr.js';
import { u as j, a as y, C as n, o as b, b as f, s as o } from './zod-SQF3v9p3.js';
import { a as v } from './index-B2FCGk5w.js';
import { F as i } from './FormField-iyrhpl26.js';
import { I as m, e as w, B as C } from './antd-n40S5sxn.js';
import './react-CTDr35rJ.js';
const S = b({
  name: o().min(1, 'Name is required'),
  email: o().email('Invalid email'),
  message: o().min(10, 'Please provide more details'),
  consent: f().default(!1),
});
function P() {
  var l, c, d;
  const {
    control: s,
    handleSubmit: h,
    reset: u,
    formState: { errors: r },
  } = j({ resolver: y(S), defaultValues: { consent: !1 } });
  async function x(a) {
    var p;
    const t = await v('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(a),
    });
    if (!t.ok) {
      const g =
        ((p = await t.json().catch(() => ({}))) == null ? void 0 : p.error) || 'Submit failed';
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: g, type: 'error' } }));
      return;
    }
    (window.dispatchEvent(
      new CustomEvent('app-toast', { detail: { text: 'Message sent', type: 'success' } }),
    ),
      u());
  }
  return e.jsxs('div', {
    className: 'container py-3',
    style: { maxWidth: 720 },
    children: [
      e.jsx('h3', { children: 'Contact Us' }),
      e.jsx('div', {
        className: 'mb-3',
        children: e.jsx('p', {
          children:
            'Have a question about a listing, pricing, or trade-ins? Send us a message and we’ll get back within 1–2 business days.',
        }),
      }),
      e.jsxs('form', {
        onSubmit: h(x),
        children: [
          e.jsx(i, {
            label: 'Your Name',
            htmlFor: 'name',
            error: (l = r.name) == null ? void 0 : l.message,
            children: e.jsx(n, {
              name: 'name',
              control: s,
              render: ({ field: a }) => e.jsx(m, { id: 'name', ...a }),
            }),
          }),
          e.jsx(i, {
            label: 'Email',
            htmlFor: 'email',
            error: (c = r.email) == null ? void 0 : c.message,
            children: e.jsx(n, {
              name: 'email',
              control: s,
              render: ({ field: a }) => e.jsx(m, { id: 'email', type: 'email', ...a }),
            }),
          }),
          e.jsx(i, {
            label: 'Message',
            htmlFor: 'message',
            error: (d = r.message) == null ? void 0 : d.message,
            children: e.jsx(n, {
              name: 'message',
              control: s,
              render: ({ field: a }) => e.jsx(m.TextArea, { id: 'message', rows: 6, ...a }),
            }),
          }),
          e.jsx('div', {
            className: 'form-check mb-3',
            children: e.jsx(n, {
              name: 'consent',
              control: s,
              render: ({ field: a }) =>
                e.jsx(w, {
                  id: 'consent',
                  checked: a.value,
                  onChange: (t) => a.onChange(t.target.checked),
                  children:
                    'I agree to the processing of my personal data according to the Privacy Policy.',
                }),
            }),
          }),
          e.jsx(C, { type: 'primary', htmlType: 'submit', children: 'Send' }),
        ],
      }),
    ],
  });
}
export { P as default };

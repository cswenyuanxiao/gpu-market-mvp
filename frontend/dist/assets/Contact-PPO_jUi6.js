import { j as e } from './react-query-BGeIQRPr.js';
import { u as f, a as b, C as r, o as y, b as v, s as i } from './zod-SQF3v9p3.js';
import { c as p, a as w } from './index-DeVd8hke.js';
import { F as o } from './FormField-iyrhpl26.js';
import { I as m, h as C, B as S } from './antd-CoNf2jvZ.js';
import './react-CTDr35rJ.js';
const E = y({
  name: i().min(1, 'Name is required'),
  email: i().email('Invalid email'),
  message: i().min(10, 'Please provide more details'),
  consent: v().default(!1),
});
function I() {
  var l, c, d;
  const {
    control: s,
    handleSubmit: x,
    reset: u,
    formState: { errors: n },
  } = f({ resolver: b(E), defaultValues: { consent: !1 } });
  async function j(a) {
    var h;
    const t = await w('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(a),
    });
    if (!t.ok) {
      const g =
        ((h = await t.json().catch(() => ({}))) == null ? void 0 : h.error) || 'Submit failed';
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
      e.jsxs('div', {
        className: 'mb-3',
        children: [
          e.jsx('p', {
            children:
              'Have a question about a listing, pricing, or trade-ins? Send us a message and we’ll get back within 1–2 business days.',
          }),
          e.jsx('p', { className: 'mb-1', children: 'Prefer WhatsApp or email? Reach us at:' }),
          e.jsxs('ul', {
            className: 'mb-0',
            children: [
              e.jsxs('li', {
                children: [
                  'WhatsApp:',
                  ' ',
                  e.jsx('a', {
                    href: `https://wa.me/${p.contactWhatsApp || '447747310027'}`,
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
                    href: `mailto:${p.contactEmail || 'x1657217402@gmail.com'}`,
                    children: 'x1657217402@gmail.com',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      e.jsxs('form', {
        onSubmit: x(j),
        children: [
          e.jsx(o, {
            label: 'Your Name',
            htmlFor: 'name',
            error: (l = n.name) == null ? void 0 : l.message,
            children: e.jsx(r, {
              name: 'name',
              control: s,
              render: ({ field: a }) => e.jsx(m, { id: 'name', ...a }),
            }),
          }),
          e.jsx(o, {
            label: 'Email',
            htmlFor: 'email',
            error: (c = n.email) == null ? void 0 : c.message,
            children: e.jsx(r, {
              name: 'email',
              control: s,
              render: ({ field: a }) => e.jsx(m, { id: 'email', type: 'email', ...a }),
            }),
          }),
          e.jsx(o, {
            label: 'Message',
            htmlFor: 'message',
            error: (d = n.message) == null ? void 0 : d.message,
            children: e.jsx(r, {
              name: 'message',
              control: s,
              render: ({ field: a }) => e.jsx(m.TextArea, { id: 'message', rows: 6, ...a }),
            }),
          }),
          e.jsx('div', {
            className: 'form-check mb-3',
            children: e.jsx(r, {
              name: 'consent',
              control: s,
              render: ({ field: a }) =>
                e.jsx(C, {
                  id: 'consent',
                  checked: a.value,
                  onChange: (t) => a.onChange(t.target.checked),
                  children:
                    'I agree to the processing of my personal data according to the Privacy Policy.',
                }),
            }),
          }),
          e.jsx(S, { type: 'primary', htmlType: 'submit', children: 'Send' }),
        ],
      }),
    ],
  });
}
export { I as default };

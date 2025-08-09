const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/ImageUploader-DWnjEkzb.js',
      'assets/react-query-BGeIQRPr.js',
      'assets/react-CTDr35rJ.js',
    ]),
) => i.map((i) => d[i]);
import { a as B, _ as T } from './index-aktKGDxK.js';
import { j as e } from './react-query-BGeIQRPr.js';
import { r as m } from './react-CTDr35rJ.js';
import { u as D, a as q, C as o, o as P, s as c, c as M, b as V, e as S } from './zod-SQF3v9p3.js';
import { F as n } from './FormField-iyrhpl26.js';
import { I as d, S as _, d as G, B as O } from './antd-n40S5sxn.js';
const U = m.lazy(() => T(() => import('./ImageUploader-DWnjEkzb.js'), __vite__mapDeps([0, 1, 2]))),
  W = P({
    contact_name: c().min(1, 'Name is required'),
    email: c().email('Invalid email'),
    phone: c().optional(),
    brand: S(['NVIDIA', 'AMD'], { required_error: 'Brand is required' }),
    model: c().min(1, 'Model is required'),
    grade: S(['A', 'B', 'C']).default('B'),
    warranty: V().default(!1),
    accessories: c().optional(),
    expected_price: M.number().min(1, 'Expected price must be ≥ 1'),
    note: c().optional(),
  });
function J() {
  var x, p, u, j, b, g, f, v, y, w;
  const [F, C] = m.useState([]),
    [E, h] = m.useState(!1),
    {
      control: r,
      handleSubmit: A,
      formState: { errors: s },
    } = D({ resolver: q(W), defaultValues: { grade: 'B', warranty: !1 } });
  async function I(a) {
    var N;
    const l = new FormData();
    (Object.entries(a).forEach(([t, i]) => {
      i != null && (typeof i == 'boolean' ? l.set(t, i ? 'true' : 'false') : l.set(t, String(i)));
    }),
      F.slice(0, 10).forEach((t) => l.append('images', t)),
      h(!0));
    try {
      const t = await B('/api/quotes', { method: 'POST', body: l });
      if (!t.ok) {
        const i =
          ((N = await t.json().catch(() => ({}))) == null ? void 0 : N.error) || 'Submit failed';
        window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: i, type: 'error' } }));
        return;
      }
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: 'Submitted, we will contact you soon', type: 'success' },
        }),
      );
    } finally {
      h(!1);
    }
  }
  return e.jsxs('div', {
    className: 'container py-3',
    style: { maxWidth: 800 },
    children: [
      e.jsx('h3', { children: 'Sell to us' }),
      e.jsx('div', {
        className: 'mb-3',
        children: e.jsx('p', {
          children:
            'Get a no-obligation quote for your GPU. Share basic details and photos. We’ll email you with an offer and next steps.',
        }),
      }),
      e.jsxs('form', {
        onSubmit: A(I),
        children: [
          e.jsxs('div', {
            className: 'row g-3',
            children: [
              e.jsx('div', {
                className: 'col-md-6',
                children: e.jsx(n, {
                  label: 'Your Name',
                  htmlFor: 'contact_name',
                  error: (x = s.contact_name) == null ? void 0 : x.message,
                  children: e.jsx(o, {
                    name: 'contact_name',
                    control: r,
                    render: ({ field: a }) => e.jsx(d, { id: 'contact_name', ...a }),
                  }),
                }),
              }),
              e.jsx('div', {
                className: 'col-md-6',
                children: e.jsx(n, {
                  label: 'Email',
                  htmlFor: 'email',
                  error: (p = s.email) == null ? void 0 : p.message,
                  children: e.jsx(o, {
                    name: 'email',
                    control: r,
                    render: ({ field: a }) => e.jsx(d, { id: 'email', type: 'email', ...a }),
                  }),
                }),
              }),
              e.jsx('div', {
                className: 'col-md-6',
                children: e.jsx(n, {
                  label: 'Phone',
                  htmlFor: 'phone',
                  error: (u = s.phone) == null ? void 0 : u.message,
                  children: e.jsx(o, {
                    name: 'phone',
                    control: r,
                    render: ({ field: a }) => e.jsx(d, { id: 'phone', ...a }),
                  }),
                }),
              }),
              e.jsx('div', {
                className: 'col-md-6',
                children: e.jsx(n, {
                  label: 'Brand',
                  htmlFor: 'brand',
                  error: (j = s.brand) == null ? void 0 : j.message,
                  children: e.jsx(o, {
                    name: 'brand',
                    control: r,
                    render: ({ field: a }) =>
                      e.jsx(_, {
                        id: 'brand',
                        value: a.value,
                        onChange: (l) => a.onChange(l),
                        options: [
                          { value: 'NVIDIA', label: 'NVIDIA' },
                          { value: 'AMD', label: 'AMD' },
                        ],
                      }),
                  }),
                }),
              }),
              e.jsx('div', {
                className: 'col-md-6',
                children: e.jsx(n, {
                  label: 'Model',
                  htmlFor: 'model',
                  error: (b = s.model) == null ? void 0 : b.message,
                  children: e.jsx(o, {
                    name: 'model',
                    control: r,
                    render: ({ field: a }) => e.jsx(d, { id: 'model', ...a }),
                  }),
                }),
              }),
              e.jsx('div', {
                className: 'col-md-6',
                children: e.jsx(n, {
                  label: 'Grade',
                  htmlFor: 'grade',
                  error: (g = s.grade) == null ? void 0 : g.message,
                  children: e.jsx(o, {
                    name: 'grade',
                    control: r,
                    render: ({ field: a }) =>
                      e.jsx(_, {
                        id: 'grade',
                        value: a.value,
                        onChange: (l) => a.onChange(l),
                        options: [
                          { value: 'A', label: 'A' },
                          { value: 'B', label: 'B' },
                          { value: 'C', label: 'C' },
                        ],
                      }),
                  }),
                }),
              }),
              e.jsx('div', {
                className: 'col-md-6',
                children: e.jsx(n, {
                  label: 'Warranty',
                  htmlFor: 'warranty',
                  error: (f = s.warranty) == null ? void 0 : f.message,
                  children: e.jsx(o, {
                    name: 'warranty',
                    control: r,
                    render: ({ field: a }) =>
                      e.jsx(G, {
                        id: 'warranty',
                        checked: a.value,
                        onChange: (l) => a.onChange(l),
                      }),
                  }),
                }),
              }),
              e.jsx('div', {
                className: 'col-md-6',
                children: e.jsx(n, {
                  label: 'Accessories',
                  htmlFor: 'accessories',
                  error: (v = s.accessories) == null ? void 0 : v.message,
                  children: e.jsx(o, {
                    name: 'accessories',
                    control: r,
                    render: ({ field: a }) => e.jsx(d, { id: 'accessories', ...a }),
                  }),
                }),
              }),
              e.jsx('div', {
                className: 'col-md-6',
                children: e.jsx(n, {
                  label: 'Expected Price',
                  htmlFor: 'expected_price',
                  error: (y = s.expected_price) == null ? void 0 : y.message,
                  children: e.jsx(o, {
                    name: 'expected_price',
                    control: r,
                    render: ({ field: a }) => e.jsx(d, { id: 'expected_price', ...a }),
                  }),
                }),
              }),
              e.jsx('div', {
                className: 'col-12',
                children: e.jsx(n, {
                  label: 'Note',
                  htmlFor: 'note',
                  error: (w = s.note) == null ? void 0 : w.message,
                  children: e.jsx(o, {
                    name: 'note',
                    control: r,
                    render: ({ field: a }) => e.jsx(d.TextArea, { id: 'note', rows: 5, ...a }),
                  }),
                }),
              }),
            ],
          }),
          e.jsx('div', {
            className: 'mb-3',
            children: e.jsx(m.Suspense, { fallback: null, children: e.jsx(U, { onChange: C }) }),
          }),
          e.jsx(O, { type: 'primary', htmlType: 'submit', loading: E, children: 'Submit' }),
        ],
      }),
    ],
  });
}
export { J as default };

import { j as e } from './react-query-BGeIQRPr.js';
import { r as n, u as x } from './react-CTDr35rJ.js';
import { a as d, G as h } from './index-BBAniAW2.js';
import { a as j, E as y, B as m, c as E } from './antd-n40S5sxn.js';
function N() {
  const [r, o] = n.useState([]),
    [l, p] = n.useState(!0);
  n.useEffect(() => {
    let t = !0;
    return (
      (async () => {
        try {
          const i = await (await d('/api/my/gpus')).json();
          t && o(i);
        } finally {
          t && p(!1);
        }
      })(),
      () => {
        t = !1;
      }
    );
  }, []);
  const c = x();
  async function f(t) {
    var i;
    if (!confirm('Delete this listing?')) return;
    const s = await d(`/api/gpus/${t}`, { method: 'DELETE' });
    if (!s.ok) {
      const a =
        ((i = await s.json().catch(() => ({}))) == null ? void 0 : i.error) || 'Delete failed';
      window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: a, type: 'error' } }));
      return;
    }
    (window.dispatchEvent(
      new CustomEvent('app-toast', { detail: { text: 'Deleted', type: 'success' } }),
    ),
      o((a) => a.filter((u) => u.id !== t)));
  }
  return e.jsxs('div', {
    className: 'container py-3',
    children: [
      e.jsx('h3', { children: 'My Listings' }),
      l && e.jsx(j, { className: 'my-3' }),
      !l && r.length === 0 && e.jsx(y, { description: 'No items', className: 'my-3' }),
      e.jsx('div', {
        className: 'row',
        children: r.map((t) =>
          e.jsxs(
            'div',
            {
              className: 'col-md-6',
              children: [
                e.jsx(h, { gpu: t, onDetails: (s) => c(`/g/${s}`) }),
                e.jsxs('div', {
                  className: 'd-flex gap-2 mb-4',
                  children: [
                    e.jsx(m, {
                      size: 'small',
                      onClick: () => c(`/edit/${t.id}`),
                      children: 'Edit',
                    }),
                    e.jsx(E, {
                      title: 'Delete this listing?',
                      onConfirm: () => f(t.id),
                      children: e.jsx(m, { size: 'small', danger: !0, children: 'Delete' }),
                    }),
                  ],
                }),
              ],
            },
            t.id,
          ),
        ),
      }),
    ],
  });
}
export { N as default };

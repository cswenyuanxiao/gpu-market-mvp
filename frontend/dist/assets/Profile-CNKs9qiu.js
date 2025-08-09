import { j as e } from './react-query-BGeIQRPr.js';
import { r as i, L as p } from './react-CTDr35rJ.js';
import { a as c } from './index-BBAniAW2.js';
import { A as j, B as x, C as o, E as f } from './antd-n40S5sxn.js';
function N() {
  var n;
  const [a, m] = i.useState(null),
    [r, d] = i.useState([]);
  return (
    i.useEffect(() => {
      const s = localStorage.getItem('token');
      if (s)
        try {
          const l = s.split('.')[1] ?? '',
            h = l ? JSON.parse(atob(l)) : {};
          (c(`/api/users/${h.id}`).then(async (t) => m(await t.json())),
            c('/api/my/gpus').then(async (t) => d(await t.json())));
        } catch {}
    }, []),
    localStorage.getItem('token')
      ? e.jsxs('div', {
          className: 'container py-3',
          children: [
            e.jsx('h3', { children: 'My Profile' }),
            a &&
              e.jsxs('div', {
                className: 'd-flex align-items-center gap-3 mb-3',
                children: [
                  e.jsx(j, {
                    size: 64,
                    src: a.avatar_path,
                    children: (n = a.display_name) == null ? void 0 : n[0],
                  }),
                  e.jsx('div', { className: 'fw-bold', children: a.display_name }),
                  e.jsx('div', {
                    className: 'ms-auto',
                    children: e.jsx(p, {
                      to: '/profile/edit',
                      children: e.jsx(x, { size: 'small', children: 'Edit Profile' }),
                    }),
                  }),
                ],
              }),
            e.jsx('h5', { children: 'My Listings' }),
            e.jsxs('div', {
              className: 'row',
              children: [
                r.map((s) =>
                  e.jsx(
                    'div',
                    {
                      className: 'col-md-6',
                      children: e.jsx(o, {
                        className: 'mb-3',
                        cover: s.image_path
                          ? e.jsx('img', {
                              src: s.image_path,
                              style: { height: 160, objectFit: 'cover' },
                            })
                          : void 0,
                        children: e.jsx(o.Meta, { title: s.title }),
                      }),
                    },
                    s.id,
                  ),
                ),
                r.length === 0 && e.jsx(f, { description: 'No listings', className: 'my-3' }),
              ],
            }),
          ],
        })
      : e.jsx('div', { className: 'container py-3', children: 'Please login' })
  );
}
export { N as default };

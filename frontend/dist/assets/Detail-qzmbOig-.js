import { j as r } from './react-query-BGeIQRPr.js';
import { i as n, r as s } from './react-CTDr35rJ.js';
import { a as o } from './index-B-L66gMV.js';
import { D as l } from './DetailsView-BPm4qC7b.js';
import { B as u } from './antd-CoNf2jvZ.js';
function x() {
  const { id: e } = n(),
    [t, a] = s.useState(null);
  return (
    s.useEffect(() => {
      e &&
        (async () => {
          const i = await o(`/api/gpus/${e}`);
          a(await i.json());
        })();
    }, [e]),
    s.useEffect(
      () => (
        t != null && t.title && (document.title = `${t.title} — GPU Market`),
        () => {
          document.title = 'GPU Market — Buy & Sell Used GPUs';
        }
      ),
      [t == null ? void 0 : t.title],
    ),
    e
      ? r.jsxs('div', {
          className: 'container py-3',
          children: [
            r.jsx(u, { type: 'link', href: '/', children: '← Back' }),
            t && r.jsx(l, { item: t }),
          ],
        })
      : null
  );
}
export { x as default };

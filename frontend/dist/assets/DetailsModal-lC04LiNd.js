import { j as t } from './react-query-BGeIQRPr.js';
import { D as l } from './DetailsView-BmDVwFjn.js';
import { M as i } from './antd-mcI3qWux.js';
import './react-CTDr35rJ.js';
import './index-C09nFs0H.js';
function f({ item: o, onClose: r }) {
  return o
    ? t.jsx(i, {
        open: !!o,
        onCancel: r,
        footer: null,
        width: 900,
        title: o.title,
        children: t.jsx(l, { item: o }),
      })
    : null;
}
export { f as default };

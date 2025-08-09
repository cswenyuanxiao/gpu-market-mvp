import { j as t } from './react-query-BGeIQRPr.js';
import { D as l } from './DetailsView-DUPy39j2.js';
import { f as i } from './antd-n40S5sxn.js';
import './react-CTDr35rJ.js';
import './index-B2FCGk5w.js';
function p({ item: o, onClose: r }) {
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
export { p as default };

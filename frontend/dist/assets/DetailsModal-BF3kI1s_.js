import { j as t } from './react-query-BGeIQRPr.js';
import { D as l } from './DetailsView-Dwy162kI.js';
import { f as i } from './antd-n40S5sxn.js';
import './react-CTDr35rJ.js';
import './index-BBAniAW2.js';
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

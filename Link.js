var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import { store } from './history.js';

export function Link(_ref) {
  let { href, children, className, activeLocation } = _ref,
      props = _objectWithoutProperties(_ref, ['href', 'children', 'className', 'activeLocation']);

  const cx = ((className || '') + (activeLocation === href ? ' active' : '')).replace(/^\s|\s\s/g, '');

  return React.createElement(
    'a',
    _extends({ href: href, className: cx, onClick: e => {
        if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.defaultPrevented) return;

        e.preventDefault();

        store.hydrate({
          location: href.replace(window.location.origin, '')
        })();
      } }, props),
    children
  );
}

import React from 'react';

interface ComponentProp {
  component: () => React.ReactNode;
}

export const renderFunctionText = (
  txt:
    | string
    | number
    | (() => React.ReactNode)
    | ComponentProp
    | React.ReactNode,
) => {
  if (React.isValidElement(txt)) {
    return txt;
  }

  if (txt && typeof txt === 'object' && 'component' in txt) {
    return txt.component?.();
  }

  return typeof txt === 'function' ? txt() : txt;
};

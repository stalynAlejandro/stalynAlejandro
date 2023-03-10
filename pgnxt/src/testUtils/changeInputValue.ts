import { fireEvent } from '@testing-library/react';

export const changeInputValue = (
  element: Document | Node | Element | Window,
  value: string,
) => {
  fireEvent.change(element, { target: { value } });
};

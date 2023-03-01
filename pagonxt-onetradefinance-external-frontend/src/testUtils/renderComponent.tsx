import React from 'react';
import { render } from '@testing-library/react';

import { wrapWithWrappers } from './wrapWithWrappers';
import { StToastContainer } from '../components/NotificationToast/NotificationToastStyled';

export const renderComponent = (component: React.ReactNode) => {
  const result = render(wrapWithWrappers(component));

  return {
    ...result,
    rerender: (recomponent: React.ReactNode) =>
      result.rerender(wrapWithWrappers(recomponent)),
  };
};

export const renderComponentWithToast = (component: React.ReactNode) => {
  const result = render(
    wrapWithWrappers(
      <>
        <StToastContainer
          autoClose={5000}
          newestOnTop={false}
          pauseOnFocusLoss
          pauseOnHover
          position="top-center"
        />
        {component}
      </>,
    ),
  );

  return {
    ...result,
    rerender: (recomponent: React.ReactNode) =>
      result.rerender(
        wrapWithWrappers(
          <>
            <StToastContainer
              autoClose={5000}
              newestOnTop={false}
              pauseOnFocusLoss
              pauseOnHover
              position="top-center"
            />
            {recomponent}
          </>,
        ),
      ),
  };
};

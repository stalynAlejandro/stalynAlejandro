import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from '../redux/store';
import theme from '../resources/theme';

export const wrapWithWrappers = (component: React.ReactNode) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  </Provider>
);

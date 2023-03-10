import React from 'react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { renderComponent } from '../../../testUtils/renderComponent';
import PageWithMenu from '../PageWithMenu';

describe('Component PageWithMenu', () => {
  const renderWithProps = (
    props: any = {},
    children: React.ReactNode = null,
  ) => {
    renderComponent(
      <BrowserRouter>
        <PageWithMenu {...props}>{children}</PageWithMenu>
      </BrowserRouter>,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();

    expect(screen.getByTestId('page-main-menu')).toBeInTheDocument();
    expect(screen.getByTestId('page-footer')).toBeInTheDocument();
  });

  it('renders the provided children correctly', () => {
    renderWithProps({}, <div>Test child</div>);
    expect(screen.getByText('Test child')).toBeInTheDocument();
  });
});

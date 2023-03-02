import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import ContentContainer from '../ContentContainer';

describe('Component ContentContainer', () => {
  const renderWithProps = (
    props: any = {},
    children: React.ReactNode = null,
  ) => {
    renderComponent(<ContentContainer {...props}>{children}</ContentContainer>);
  };

  it('renders the component successfully with default data-testid', () => {
    renderWithProps();
    expect(screen.getByTestId('content-container')).toBeInTheDocument();
  });

  it('renders the children successfully in the component', () => {
    renderWithProps({}, <div>Test element</div>);
    expect(screen.getByText('Test element')).toBeInTheDocument();
  });

  it('adds the provided className to element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('content-container')).toHaveClass('test-class');
  });
});

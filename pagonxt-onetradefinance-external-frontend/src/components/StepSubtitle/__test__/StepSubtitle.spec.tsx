import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import StepSubtitle from '../StepSubtitle';

describe('Component StepSubtitle', () => {
  const defaultProps = {
    subtitle: 'My subtitle',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<StepSubtitle {...defaultProps} {...props} />);
  };

  it('renders the component successfully with the provided subtitle', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  it('adds the provided className to the element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByText(defaultProps.subtitle)).toHaveClass('test-class');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import StepTitle from '../StepTitle';

describe('Component StepTitle', () => {
  const defaultProps = {
    title: 'My subtitle',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<StepTitle {...defaultProps} {...props} />);
  };

  it('renders the component successfully with the provided title', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders provided stepNumber', () => {
    renderWithProps({ stepNumber: 2 });
    expect(screen.getByText(2)).toBeInTheDocument();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import FormStepContainer from '../FormStepContainer';

describe('Component FormStepContainer', () => {
  const defaultProps = {
    title: 'My title',
  };

  const renderWithProps = (
    props: any = {},
    children: React.ReactNode = null,
  ) => {
    renderComponent(
      <FormStepContainer {...defaultProps} {...props}>
        {children}
      </FormStepContainer>,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('form-step-container')).toBeInTheDocument();
  });

  it('renders the provided title and number correctly', () => {
    renderWithProps({ stepNumber: 3 });
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(3)).toBeInTheDocument();
  });

  it('renders the provided children correctly', () => {
    renderWithProps({}, <div>Test child</div>);
    expect(screen.getByText('Test child')).toBeInTheDocument();
  });
});

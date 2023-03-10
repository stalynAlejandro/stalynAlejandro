import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import Currency from '../Currency';

describe('Component Currency', () => {
  const defaultProps = {
    currency: 'EUR',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<Currency {...defaultProps} {...props} />);
  };

  it('renders the component successfully with the provided currency without flag by default', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.currency)).toBeInTheDocument();
    expect(screen.queryByTestId('currency-flag')).not.toBeInTheDocument();
  });

  it('renders a border by default if showBorder is not provided', () => {
    renderWithProps();
    expect(screen.getByTestId('currency')).toHaveStyle(
      'border: 1px solid #cedee7;',
    );
  });

  it('does not show a border if showBorder is provided as false', () => {
    renderWithProps({ showBorder: false });
    expect(screen.getByTestId('currency')).not.toHaveStyle(
      'border: 1px solid #cedee7;',
    );
  });

  it('renders the currency flag when showFlag prop is provided', () => {
    renderWithProps({ showFlag: true });
    expect(screen.getByTestId('currency-flag')).toBeInTheDocument();
  });

  it('does not render the currency flag image when showFlag is provided as false', () => {
    renderWithProps({ showFlag: false });
    expect(screen.queryByTestId('currency-flag')).not.toBeInTheDocument();
  });

  it('adds the provided className to the element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('currency')).toHaveClass('test-class');
  });
});

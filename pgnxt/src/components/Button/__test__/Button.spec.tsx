import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../testUtils/renderComponent';
import Button from '../Button';

describe('Component Button', () => {
  const defaultProps = {
    label: 'My label',
    onClick: jest.fn(),
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<Button {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('adds the provided className to element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByText(defaultProps.label)).toHaveClass('test-class');
  });

  it('executes the onClick method provided', () => {
    renderWithProps();
    const buttonEl = screen.getByText(defaultProps.label);
    userEvent.click(buttonEl);

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('renders the button as disabled if prop is provided', () => {
    renderWithProps({ disabled: true });
    expect(screen.getByText(defaultProps.label)).toBeDisabled();
  });

  it('does not execute the onClick method if it is disabled', () => {
    renderWithProps({ disabled: true });
    const buttonEl = screen.getByText(defaultProps.label);
    userEvent.click(buttonEl);

    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('renders a larger button if wide prop is provided', () => {
    renderWithProps({ wide: true });
    expect(screen.getByText(defaultProps.label)).toHaveStyle({
      padding: '8px 15px',
    });
  });

  it('renders the button with colors reversed if inversed prop is provided', () => {
    renderWithProps({ inverse: true });
    expect(screen.getByText(defaultProps.label)).toHaveStyle({
      backgroundColor: '#FFFFFF',
    });
  });
});

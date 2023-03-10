import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../../testUtils/renderComponent';
import RadioButtonCard from '../RadioButtonCard';
import theme from '../../../../resources/theme';

describe('Control RadioButtonCard', () => {
  const defaultProps = {
    description: 'My radio description',
    label: 'My radio',
    onClick: jest.fn(),
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<RadioButtonCard {...defaultProps} {...props} />);
  };

  const getRadioButtonElement = () =>
    screen.getByTestId('radio-button-card').querySelector('input');

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('radio-button-card')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders the component as unchecked when checked prop is not sent', () => {
    renderWithProps();
    expect(getRadioButtonElement()).not.toBeChecked();
    expect(screen.getByTestId('radio-button-card')).toHaveStyle({
      border: `1px solid ${theme.colors.mediumsky}`,
    });
  });

  it('renders the component as unchecked when checked prop is sent as false', () => {
    renderWithProps({ checked: false });
    expect(getRadioButtonElement()).not.toBeChecked();
    expect(screen.getByTestId('radio-button-card')).toHaveStyle({
      border: `1px solid ${theme.colors.mediumsky}`,
    });
  });

  it('renders the component as checked when checked prop is sent as true', () => {
    renderWithProps({ checked: true });
    expect(getRadioButtonElement()).toBeChecked();
    expect(screen.getByTestId('radio-button-card')).toHaveStyle({
      borderColor: theme.colors.turquoise,
    });
  });

  it('executes the provided onClick method when the component is clicked', () => {
    renderWithProps();
    userEvent.click(screen.getByTestId('radio-button-card'));

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('renders as disabled when disabled prop is sent as true and onClick method is not executed when clicked', () => {
    renderWithProps({ disabled: true });

    expect(getRadioButtonElement()).toBeDisabled();

    userEvent.click(screen.getByTestId('radio-button-card'));
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
});

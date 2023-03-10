import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../../testUtils/renderComponent';
import RadioButton from '../RadioButton';
import theme from '../../../../resources/theme';

describe('Control RadioButton', () => {
  const defaultProps = {
    label: 'My radio',
    onClick: jest.fn(),
    value: 'my-radiobutton',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<RadioButton {...defaultProps} {...props} />);
  };

  const getRadioButtonElement = () =>
    screen.getByTestId('radio-button').querySelector('input');

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('radio-button')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('renders the component as unchecked when checked prop is not sent', () => {
    renderWithProps();
    expect(getRadioButtonElement()).not.toBeChecked();
    expect(screen.getByTestId('radio-button-ui')).toHaveStyle({
      backgroundColor: theme.colors.white,
      border: `1px solid ${theme.colors.mediumgray}`,
    });
  });

  it('renders the component as unchecked when checked prop is sent as false', () => {
    renderWithProps({ checked: false });
    expect(getRadioButtonElement()).not.toBeChecked();
    expect(screen.getByTestId('radio-button-ui')).toHaveStyle({
      backgroundColor: theme.colors.white,
      border: `1px solid ${theme.colors.mediumgray}`,
    });
  });

  it('renders the component as checked when checked prop is sent as true', () => {
    renderWithProps({ checked: true });
    expect(getRadioButtonElement()).toBeChecked();
    expect(screen.getByTestId('radio-button-ui')).toHaveStyle({
      backgroundColor: theme.colors.turquoise,
    });
  });

  it('executes the provided onClick method when the component is clicked', () => {
    renderWithProps();
    userEvent.click(screen.getByTestId('radio-button'));

    expect(defaultProps.onClick).toHaveBeenCalledWith(defaultProps.value);
  });

  it('executes the provided onClick method when the component is clicked and the value prop is not provided', () => {
    renderWithProps({ value: undefined });
    userEvent.click(screen.getByTestId('radio-button'));

    expect(defaultProps.onClick).toHaveBeenCalledWith('');
  });

  it('renders as disabled when disabled prop is sent as true and onClick method is not executed when clicked', () => {
    renderWithProps({ disabled: true });

    expect(getRadioButtonElement()).toBeDisabled();

    userEvent.click(screen.getByTestId('radio-button'));
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
});

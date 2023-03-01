import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../../testUtils/renderComponent';
import FormControlWrapper from '../../../../testUtils/FormControlWrapper';
import Checkbox from '../Checkbox';

describe('Control Checkbox', () => {
  const defaultProps = {
    checked: false,
    label: 'Checkbox label',
    onChange: jest.fn(),
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(
      <FormControlWrapper component={Checkbox} {...defaultProps} {...props} />,
    );
  };

  it('renders the component successfully and unchecked when checked prop is provided as false', () => {
    renderWithProps();

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(
      screen.getByTestId('checkbox').querySelector('input'),
    ).not.toBeChecked();
    expect(
      screen.getByTestId('checkbox').querySelector('input + div'),
    ).toHaveStyle({
      border: '1px solid #cccccc',
    });
  });

  it('renders the component successfully and checked when checked prop is provided as true', () => {
    renderWithProps({ checked: true });

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByTestId('checkbox').querySelector('input')).toBeChecked();
    expect(
      screen.getByTestId('checkbox').querySelector('input + div'),
    ).toHaveStyle({
      borderColor: '#1BB3BC',
    });
  });

  it('renders the component as uncontrolled when the checked prop is provided as undefined or not provided', () => {
    renderWithProps({ checked: undefined });
    const labelEl = screen.getByTestId('checkbox');
    const checkboxEl = labelEl.querySelector('input');

    expect(checkboxEl).not.toBeChecked();
    act(() => userEvent.click(labelEl));
    expect(checkboxEl).toBeChecked();
  });

  it('adds the provided className to the classes of the component', () => {
    renderWithProps({ className: 'my-test-class' });
    expect(screen.getByTestId('checkbox')).toHaveClass('my-test-class');
  });

  it('displays its container as a label by default', () => {
    renderWithProps();
    expect(screen.getByTestId('checkbox').tagName).toEqual('LABEL');
  });

  it('displays its container as another element when wrapper prop is provided', () => {
    renderWithProps({ wrapper: 'div' });
    expect(screen.getByTestId('checkbox').tagName).toEqual('DIV');
  });

  it('executes the provided onChange method when its value changes', () => {
    renderWithProps();

    act(() => userEvent.click(screen.getByTestId('checkbox')));
    expect(defaultProps.onChange).toHaveBeenCalledWith(true);

    act(() => userEvent.click(screen.getByTestId('checkbox')));
    expect(defaultProps.onChange).toHaveBeenCalledWith(false);
  });

  it('does not execute the provided onChange method when disabled prop is provided as true', () => {
    renderWithProps({ disabled: true });

    act(() => userEvent.click(screen.getByTestId('checkbox')));
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });
});

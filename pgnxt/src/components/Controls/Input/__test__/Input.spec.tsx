import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../../testUtils/renderComponent';
import Input from '../Input';
import FormControlWrapper from '../../../../testUtils/FormControlWrapper';
import { formatNumber } from '../../../../utils/formatNumber';
import theme from '../../../../resources/theme';

describe('Control Input', () => {
  const defaultProps = {
    onChange: jest.fn(),
    type: 'text',
  };

  const getInput = (isNumeric: boolean = false) =>
    screen.getByTestId(isNumeric ? 'form-input-numeric' : 'form-input');
  const getPlaceholder = () => screen.getByTestId('floating-placeholder');

  describe('Text input', () => {
    const renderWithProps = (props: any = {}) => {
      renderComponent(
        <FormControlWrapper component={Input} {...defaultProps} {...props} />,
      );
    };

    it('renders the component successfully', () => {
      renderWithProps();
      expect(screen.getByTestId('form-input-container')).toBeInTheDocument();
      expect(screen.getByTestId('form-input')).toBeInTheDocument();
    });

    it('renders the "optional" text in placeholder if optional prop is provided as true', () => {
      renderWithProps({ optional: true, placeholder: 'text' });
      expect(screen.getByText('text T_fieldOptional')).toBeInTheDocument();
    });

    it('changes the value and calls to the provided onChange method when typing', async () => {
      renderWithProps();
      const str = 'test';
      const input = getInput();
      await act(() => userEvent.paste(input, str));

      expect(defaultProps.onChange).toHaveBeenCalledWith(str);
      expect(getInput()).toHaveDisplayValue(str);
    });

    it('does not allow to type text and does not call provided onChange method if it is disabled', async () => {
      renderWithProps({ disabled: true });
      const input = getInput();
      await act(async () => userEvent.paste(input, 'test'));

      expect(defaultProps.onChange).not.toHaveBeenCalled();
      expect(getInput()).toHaveDisplayValue('');
    });

    it('shows the placeholder in place when there is no value', () => {
      renderWithProps({ placeholder: 'placeholder' });
      const placeholder = getPlaceholder();

      expect(placeholder).toHaveStyle({ top: '13px' });
    });

    it('shows a floating placeholder and moves the input down when there is a value and a placeholder', () => {
      renderWithProps({ placeholder: 'placeholder', value: 'test' });
      const placeholder = getPlaceholder();
      const input = getInput();

      expect(placeholder).toHaveStyle({ top: '5px' });
      expect(input).toHaveStyle({ top: '8px' });
    });

    it('focus the input when clicking on its container', () => {
      renderWithProps();
      const input = getInput();

      expect(input).not.toHaveFocus();
      userEvent.click(screen.getByTestId('form-input-container'));
      expect(input).toHaveFocus();
    });

    it('does not move the input down when there is a value but no placeholder', () => {
      renderWithProps({ value: 'test' });
      const input = getInput();

      expect(input).not.toHaveStyle({ top: '8px' });
    });

    it('shows visual feedback when it has an error', () => {
      renderWithProps({
        error: true,
        value: 'test',
      });

      expect(screen.getByTestId('form-input-container')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
    });

    it('adds the provided className to element classes', () => {
      renderWithProps({ className: 'test-class' });
      expect(screen.getByTestId('form-input-container')).toHaveClass(
        'test-class',
      );
    });
  });

  describe('Number input', () => {
    const defaultNumberProps = {
      ...defaultProps,
      type: 'number',
    };

    const renderWithProps = (props: any = {}) => {
      renderComponent(
        <FormControlWrapper
          component={Input}
          {...defaultNumberProps}
          {...props}
        />,
      );
    };

    it('renders the component successfully', () => {
      renderWithProps();
      expect(screen.getByTestId('form-input-container')).toBeInTheDocument();
      expect(screen.getByTestId('form-input-numeric')).toBeInTheDocument();
    });

    it('renders the "optional" text in placeholder if optional prop is provided as true', () => {
      renderWithProps({ optional: true, placeholder: 'text' });
      expect(screen.getByText('text T_fieldOptional')).toBeInTheDocument();
    });

    it('changes the value with the correct format and calls to the provided onChange method with decimals when typing', async () => {
      renderWithProps();

      const str = '12345678';
      const numericStrValue = `${str}.00`;
      const formattedValue = '12.345.678,00';

      const input = getInput(true);
      await act(() => userEvent.paste(input, str));

      expect(defaultProps.onChange).toHaveBeenCalledWith(numericStrValue);
      expect(getInput(true)).toHaveDisplayValue(formattedValue);
    });

    it('does not allow to type text and does not call provided onChange method if it is disabled', async () => {
      renderWithProps({ disabled: true });
      const input = getInput(true);
      await act(async () => userEvent.paste(input, '123'));

      expect(defaultProps.onChange).not.toHaveBeenCalled();
      expect(getInput(true)).toHaveDisplayValue('');
    });

    it('shows the placeholder in place when there is no value', () => {
      renderWithProps({ placeholder: 'placeholder' });
      const placeholder = getPlaceholder();

      expect(placeholder).toHaveStyle({ top: '13px' });
    });

    it('shows a floating placeholder and moves the input down when there is a value and a placeholder', () => {
      renderWithProps({ placeholder: 'placeholder', value: '123' });
      const placeholder = getPlaceholder();
      const input = getInput(true);

      expect(placeholder).toHaveStyle({ top: '5px' });
      expect(input).toHaveStyle({ top: '8px' });
    });

    it('focus the input when clicking on its container', () => {
      renderWithProps();
      const input = getInput(true);

      expect(input).not.toHaveFocus();
      userEvent.click(screen.getByTestId('form-input-container'));
      expect(input).toHaveFocus();
    });

    it('does not move the input down when there is a value but no placeholder', () => {
      renderWithProps({ value: 'test' });
      const input = getInput(true);

      expect(input).not.toHaveStyle({ top: '8px' });
    });

    it('allows to send NumberFormat props to the control', () => {
      renderWithProps({ suffix: ' EUR', value: '5' });

      expect(
        screen.getByDisplayValue(`${formatNumber(5)} EUR`),
      ).toBeInTheDocument();
    });

    it('adds the provided className to element classes', () => {
      renderWithProps({ className: 'test-class' });
      expect(screen.getByTestId('form-input-container')).toHaveClass(
        'test-class',
      );
    });
  });
});

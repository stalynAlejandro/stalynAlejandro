import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../../testUtils/renderComponent';
import FormControlWrapper from '../../../../testUtils/FormControlWrapper';
import InputSelect from '../InputSelect';

describe('Control InputSelect', () => {
  const defaultProps = {
    onChange: jest.fn(),
    options: [
      { label: 'EUR', value: 'EUR' },
      { label: 'GBP', value: 'GBP' },
    ],
    value: { input: 'Test', select: 'GBP' },
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(
      <FormControlWrapper
        component={InputSelect}
        {...defaultProps}
        {...props}
      />,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('input-select')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(defaultProps.value.input),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.value.select)).toBeInTheDocument();
  });

  it('executes the provided onChange method when changing select value', () => {
    renderWithProps();
    const targetOption = defaultProps.options[0];

    act(() =>
      userEvent.click(
        screen
          .getByTestId('form-select')
          .querySelector('.formSelect__control')!,
      ),
    );
    act(() => userEvent.click(screen.getByText(targetOption.label)));

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      input: defaultProps.value.input,
      select: targetOption.value,
    });
  });

  it('executes the provided onChange method when changing input value', () => {
    renderWithProps();

    const addedText = 'ing';
    act(() => userEvent.paste(screen.getByTestId('form-input'), addedText));

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      input: `${defaultProps.value.input}${addedText}`,
      select: defaultProps.value.select,
    });
  });
});

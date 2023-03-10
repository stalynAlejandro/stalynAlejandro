import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../../testUtils/renderComponent';
import FormControlWrapper from '../../../../testUtils/FormControlWrapper';
import Textarea from '../Textarea';
import theme from '../../../../resources/theme';

describe('Control Textarea', () => {
  const defaultProps = {
    onChange: jest.fn(),
    placeholder: 'My placeholder',
    value: '',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(
      <FormControlWrapper component={Textarea} {...defaultProps} {...props} />,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('textarea-container')).toBeInTheDocument();
    expect(document.getElementsByTagName('textarea')).not.toHaveLength(0);
    expect(screen.getByText(defaultProps.placeholder)).toBeInTheDocument();
  });

  it('renders the component with the initial value provided', () => {
    renderWithProps({ value: 'abc' });
    expect(screen.getByTestId('textarea-control')).toHaveDisplayValue('abc');
  });

  it('executes the provided onChange method when writing', () => {
    renderWithProps();
    const targetText = 'my new text';
    act(() =>
      userEvent.paste(screen.getByTestId('textarea-control'), targetText),
    );

    expect(defaultProps.onChange).toHaveBeenCalledWith(targetText);
  });

  it('shows the clear button when it has value', () => {
    renderWithProps();

    expect(screen.queryByTestId('icon-clear')).not.toBeInTheDocument();

    act(() => userEvent.paste(screen.getByTestId('textarea-control'), 'abc'));
    expect(screen.queryByTestId('icon-clear')).toBeInTheDocument();
  });

  it('clears the value when the clear button is clicked', () => {
    renderWithProps({ value: 'my value' });
    act(() => userEvent.click(screen.queryByTestId('icon-clear')!));
    expect(defaultProps.onChange).toHaveBeenCalledWith('');
  });

  it('does not change the value and does not calls onChange method when it is disabled', () => {
    renderWithProps({ disabled: true });
    act(() => userEvent.paste(screen.getByTestId('textarea-control'), 'abc'));
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('shows visually if the error prop is provided', () => {
    renderWithProps({ error: true });
    expect(screen.getByTestId('textarea-control').parentElement).toHaveStyle({
      borderBottomColor: theme.colors.boston,
    });
  });

  it('shows visual indicator of characters left if maxLength prop is provided and is greater than 0', () => {
    const maxLength = 50;
    renderWithProps({ maxLength });
    expect(
      screen.getByText(`T_nCharactersLeft--left:${maxLength}`),
    ).toBeInTheDocument();
  });

  it('updates the characters left indicator when typing', () => {
    const maxLength = 50;
    const typedText = 'abcdef';
    renderWithProps({ maxLength });

    act(() =>
      userEvent.paste(screen.getByTestId('textarea-control'), typedText),
    );
    expect(
      screen.getByText(
        `T_nCharactersLeft--left:${maxLength - typedText.length}`,
      ),
    ).toBeInTheDocument();
  });
});

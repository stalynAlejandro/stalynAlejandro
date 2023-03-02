import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../testUtils/renderComponent';
import SearchByInput from '../SearchByInput';
import { changeInputValue } from '../../../testUtils/changeInputValue';

describe('Component SearchByInput', () => {
  const defaultProps = {
    onChange: jest.fn(),
    placeholder: 'Test placeholder',
    searchByFields: [
      { key: 'key-1', label: 'Label 1' },
      { key: 'key-3', label: 'Label 2' },
      { key: 'key-3', label: 'Label 3' },
    ],
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<SearchByInput {...defaultProps} {...props} />);
  };

  const getSelectControl = () =>
    screen.getByTestId('search-by-input').querySelector('.formSelect__control');

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('search-by-input')).toBeInTheDocument();
  });

  it('displays the first searchByFields as selected by default', () => {
    renderWithProps();
    expect(
      screen.getByText(`T_${defaultProps.searchByFields[0].label}`),
    ).toBeInTheDocument();
  });

  it('executes the provided onChange method when changing key', () => {
    renderWithProps();

    const targetOption = defaultProps.searchByFields[1];
    const select = getSelectControl();

    defaultProps.onChange.mockReset();
    act(() => userEvent.click(select!));
    act(() => userEvent.click(screen.getByText(`T_${targetOption.label}`)));

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      key: targetOption.key,
      text: '',
    });
  });

  it('executes the provided onChange method when text is written in the input', async () => {
    jest.useFakeTimers();
    renderWithProps();
    defaultProps.onChange.mockReset();

    const targetOption = defaultProps.searchByFields[0]; // By default, first one will be selected
    const inputElement = screen.getByTestId('search-by-input-input');
    const testText = 'My test text';

    changeInputValue(inputElement, testText);
    jest.advanceTimersByTime(1);

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      key: targetOption.key,
      text: testText,
    });
    jest.useRealTimers();
  });

  it('executes the provided onChange after the provided debounceMs milliseconds when text is written in the input', async () => {
    jest.useFakeTimers();
    const debounceMs = 200;
    renderWithProps({ debounceMs });
    defaultProps.onChange.mockReset();

    const targetOption = defaultProps.searchByFields[0]; // By default, first one will be selected
    const inputElement = screen.getByTestId('search-by-input-input');
    const testText = 'My test text';

    changeInputValue(inputElement, testText);

    expect(defaultProps.onChange).not.toHaveBeenCalledWith();

    jest.advanceTimersByTime(debounceMs);

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      key: targetOption.key,
      text: testText,
    });
    jest.useRealTimers();
  });

  it('renders a select and not the placeholder if there is more than one searchByFields element', () => {
    renderWithProps();
    expect(screen.getByTestId('form-select')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText(defaultProps.placeholder),
    ).not.toBeInTheDocument();
  });

  it('renders the placeholder and not a select if there is only one searchByFields element', () => {
    renderWithProps({ searchByFields: [{ key: 'key-1', label: 'Label 1' }] });
    expect(screen.queryByTestId('form-select')).not.toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText(defaultProps.placeholder),
    ).toBeInTheDocument();
  });

  it('executes the provided onChange method when there is only one searchByFields element and text is written in the input', async () => {
    jest.useFakeTimers();
    renderWithProps({ searchByFields: [{ key: 'key-1', label: 'Label 1' }] });
    defaultProps.onChange.mockReset();

    const inputElement = screen.getByTestId('search-by-input-input');
    const testText = 'My test text';

    changeInputValue(inputElement, testText);
    jest.advanceTimersByTime(1);

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      key: 'key-1',
      text: testText,
    });
    jest.useRealTimers();
  });
});

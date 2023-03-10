import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../testUtils/renderComponent';
import FilterSelect from '../FilterSelect';

describe('Component FilterSelect', () => {
  const defaultProps = {
    onChange: jest.fn(),
    options: [
      { label: 'Value 1', value: 'val1' },
      { label: 'Value 2', value: 'val2' },
      { label: 'Value 3', value: 'val3' },
    ],
    placeholder: 'My Filter Select',
    value: ['val1', 'val2'],
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<FilterSelect {...defaultProps} {...props} />);
  };

  const getSelect = (openMenu: boolean) => {
    const select = screen
      .getByTestId('filter-select')
      .querySelector('.filterSelect__control');

    if (openMenu) {
      act(() => userEvent.click(select!));
    }

    return select;
  };

  it('renders the component successfully with the provided placeholder', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.placeholder)).toBeInTheDocument();
  });

  it('applies the provided className, if any', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('filter-select')).toHaveClass('test-class');
  });

  it('does not execute the provided onChange method when new options are selected', () => {
    renderWithProps();

    getSelect(true);
    act(() => userEvent.click(screen.getByText(defaultProps.options[2].label)));

    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('does not execute the provided onChange method when options are deselected', () => {
    renderWithProps();

    getSelect(true);
    act(() => userEvent.click(screen.getByText(defaultProps.options[1].label)));

    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('executes the provided onChange method when Apply button is pressed', () => {
    renderWithProps();

    getSelect(true);
    act(() => userEvent.click(screen.getByText(defaultProps.options[2].label)));

    act(() => userEvent.click(screen.getByText('T_apply')));

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      defaultProps.options.map((opt) => opt.value),
    );
  });

  it('closes the opened menu when Apply button is pressed', () => {
    renderWithProps();

    getSelect(true);
    act(() => userEvent.click(screen.getByText(defaultProps.options[2].label)));

    act(() => userEvent.click(screen.getByText('T_apply')));

    expect(
      screen.queryByText(defaultProps.options[2].label),
    ).not.toBeInTheDocument();
  });

  it('displays the number of selected items, if any are selected', () => {
    renderWithProps();
    expect(screen.getByTestId('filter-select-indicator')).toHaveTextContent(
      `${defaultProps.value.length}`,
    );

    // Deselect default values selected
    getSelect(true);
    act(() => userEvent.click(screen.getByText(defaultProps.options[0].label)));
    act(() => userEvent.click(screen.getByText(defaultProps.options[1].label)));

    expect(
      screen.queryByTestId('filter-select-indicator'),
    ).not.toBeInTheDocument();
  });

  it('clicking the number of selected items does not clear the selection', () => {
    renderWithProps();
    act(() => userEvent.click(screen.getByTestId('filter-select-indicator')));
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('clicking the Clean All button clears the selection', () => {
    renderWithProps();

    getSelect(true);
    act(() => userEvent.click(screen.getByText('T_cleanAll')));

    expect(defaultProps.onChange).toHaveBeenCalledWith([]);
  });
});

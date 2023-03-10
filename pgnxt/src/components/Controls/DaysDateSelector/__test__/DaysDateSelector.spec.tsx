import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../../testUtils/renderComponent';
import FormControlWrapper from '../../../../testUtils/FormControlWrapper';
import DaysDateSelector from '../DaysDateSelector';
import { input, select } from '../../../../testUtils/controls';
import theme from '../../../../resources/theme';
import { formatDate } from '../../../../utils/dates';

describe('Control DatePicker', () => {
  const defaultProps = {
    onChange: jest.fn(),
    placeholder: 'My date control',
  };

  const renderWithProps = async (props: any = {}) => {
    await act(() => {
      renderComponent(
        <FormControlWrapper
          component={DaysDateSelector}
          {...defaultProps}
          {...props}
        />,
      );
    });
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('days-date-selector')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.placeholder)).toBeInTheDocument();
  });

  it('does not render the date or days controls if type has no value', () => {
    renderWithProps();

    expect(screen.queryByText('T_date')).not.toBeInTheDocument();
    expect(screen.queryByText('T_daysNumber')).not.toBeInTheDocument();

    expect(screen.queryByTestId('date-picker')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('form-input-container'),
    ).not.toBeInTheDocument();
  });

  it('displays correctly the provided value for days', () => {
    renderWithProps({ value: { date: '', days: '23', type: 'days' } });
    expect(select.getByDisplayValue('T_days')).toBeInTheDocument();
    expect(input.getByDisplayValue('23')).toBeInTheDocument();
  });

  it('displays correctly the provided value for date', () => {
    const date = '2023-02-09T14:28:51.169Z';
    renderWithProps({
      value: { date, days: '', type: 'date' },
    });

    expect(select.getByDisplayValue('T_date')).toBeInTheDocument();
    expect(
      input.getByDisplayValue(formatDate(new Date(date))),
    ).toBeInTheDocument();
  });

  it('executes onChange correctly when days value change', async () => {
    renderWithProps();

    await act(() =>
      userEvent.click(
        select.getInteractiveElement(
          select.getByPlaceholderText(defaultProps.placeholder),
        ),
      ),
    );
    await act(() => userEvent.click(screen.getByText('T_days')));

    await act(() =>
      userEvent.paste(
        input.getInteractiveElement(input.getByPlaceholderText('T_daysNumber')),
        '20',
      ),
    );
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      date: '',
      days: '20',
      type: 'days',
    });
  });

  it('executes onChange correctly when date value change', async () => {
    renderWithProps();

    await act(() =>
      userEvent.click(
        select.getInteractiveElement(
          select.getByPlaceholderText(defaultProps.placeholder),
        ),
      ),
    );
    await act(() => userEvent.click(screen.getByText('T_date')));

    await waitFor(() => {
      expect(input.getByPlaceholderText('T_date')).toBeInTheDocument();
    });

    await act(async () =>
      userEvent.click(
        input.getInteractiveElement(input.getByPlaceholderText('T_date')),
      ),
    );

    await act(() => {
      userEvent.click(screen.getByText('15'));
    });

    const actualDate = new Date();

    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      date: new Date(
        actualDate.getFullYear(),
        actualDate.getMonth(),
        15,
      ).toISOString(),
      days: '',
      type: 'date',
    });
  });

  it('displays a date picker when "Date" is selected as type', async () => {
    renderWithProps();

    await act(() =>
      userEvent.click(
        select.getInteractiveElement(
          select.getByPlaceholderText(defaultProps.placeholder),
        ),
      ),
    );
    await act(() => userEvent.click(screen.getByText('T_date')));

    expect(input.getByPlaceholderText('T_date')).toBeInTheDocument();
    expect(screen.queryByText('T_daysNumber')).not.toBeInTheDocument();
  });

  it('displays a numeric input when "Days" is selected as type', async () => {
    renderWithProps();

    await act(() =>
      userEvent.click(
        select.getInteractiveElement(
          select.getByPlaceholderText(defaultProps.placeholder),
        ),
      ),
    );
    await act(() => userEvent.click(screen.getByText('T_days')));

    expect(screen.queryByText('T_date')).not.toBeInTheDocument();
    expect(screen.getByText('T_daysNumber')).toBeInTheDocument();

    await act(() =>
      userEvent.paste(
        input.getInteractiveElement(input.getByPlaceholderText('T_daysNumber')),
        '35',
      ),
    );
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      date: '',
      days: '35',
      type: 'days',
    });

    await act(() =>
      userEvent.paste(
        input.getInteractiveElement(input.getByPlaceholderText('T_daysNumber')),
        'abc',
      ),
    );
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      date: '',
      days: '35',
      type: 'days',
    });
  });

  it('does not let to set a number of days greater than 365 (a year)', async () => {
    renderWithProps();

    await act(() =>
      userEvent.click(
        select.getInteractiveElement(
          select.getByPlaceholderText(defaultProps.placeholder),
        ),
      ),
    );
    await act(() => userEvent.click(screen.getByText('T_days')));

    await act(async () =>
      userEvent.type(
        input.getInteractiveElement(input.getByPlaceholderText('T_daysNumber')),
        '400',
      ),
    );
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      date: '',
      days: '40',
      type: 'days',
    });
  });

  it('clears old values when changing type', async () => {
    renderWithProps();

    await act(() =>
      userEvent.click(
        select.getInteractiveElement(
          select.getByPlaceholderText(defaultProps.placeholder),
        ),
      ),
    );
    await act(() => userEvent.click(screen.getByText('T_days')));

    await act(() =>
      userEvent.paste(
        input.getInteractiveElement(input.getByPlaceholderText('T_daysNumber')),
        '20',
      ),
    );

    await act(() =>
      userEvent.click(
        select.getInteractiveElement(
          select.getByPlaceholderText(defaultProps.placeholder),
        ),
      ),
    );

    await act(() => userEvent.click(screen.getByText('T_date')));

    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      date: '',
      days: '',
      type: 'date',
    });
  });

  it('displays errors visually when error prop is provided', async () => {
    renderWithProps({ error: true });

    const errorStyle = {
      borderBottomColor: theme.colors.boston,
    };

    expect(screen.getByTestId('form-select')).toHaveStyle(errorStyle);

    await act(() =>
      userEvent.click(
        select.getInteractiveElement(
          select.getByPlaceholderText(defaultProps.placeholder),
        ),
      ),
    );
    await act(() => userEvent.click(screen.getByText('T_days')));

    expect(screen.getByTestId('form-input-container')).toHaveStyle(errorStyle);

    await act(() =>
      userEvent.click(
        select.getInteractiveElement(
          select.getByPlaceholderText(defaultProps.placeholder),
        ),
      ),
    );
    await act(async () => userEvent.click(await screen.findByText('T_date')));

    expect(input.getByPlaceholderText('T_date')).toHaveStyle(errorStyle);
  });
});

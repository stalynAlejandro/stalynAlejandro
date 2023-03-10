import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../testUtils/renderComponent';
import ExchangeInsuranceSummary from '../ExchangeInsuranceSummary';
import { formatNumber } from '../../../utils/formatNumber';
import { formatDate } from '../../../utils/dates';

describe('Component ExchangeInsuranceSummary', () => {
  const defaultProps = {
    exchangeInsurance: {
      buyAmount: '2000.0',
      buyCurrency: 'GBP',
      exchangeInsuranceId: '7763095',
      exchangeRate: '1.1623',
      sellAmount: '2364.61',
      sellCurrency: 'EUR',
      state: 'CONFIRMED',
      type: 'FORWARD',
      useAmount: '250.00',
      useDate: '2022-06-30T00:00:00.000+02:00',
    },
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<ExchangeInsuranceSummary {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    const { exchangeInsurance } = defaultProps;

    expect(
      screen.getByTestId('exchange-insurance-summary'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`FX ${exchangeInsurance.exchangeRate}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `T_NAmountUsed--amount:${formatNumber(exchangeInsurance.useAmount)} ${
          exchangeInsurance.buyCurrency
        }`,
      ),
    ).toBeInTheDocument();
  });

  it('renders the component collapsed', () => {
    renderWithProps();
    const { exchangeInsurance } = defaultProps;

    expect(
      screen.queryByText(exchangeInsurance.exchangeInsuranceId),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        `T_exchangeInsuranceTypes.${exchangeInsurance.type.toLowerCase()}`,
      ),
    ).not.toBeInTheDocument();
  });

  it('toggles the component hidden content when chevron is clicked', () => {
    renderWithProps();
    const { exchangeInsurance } = defaultProps;

    expect(
      screen.queryByText(exchangeInsurance.exchangeInsuranceId),
    ).not.toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId('icon-chevron-down-bold')));

    expect(
      screen.getByText(exchangeInsurance.exchangeInsuranceId),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `T_exchangeInsuranceTypes.${exchangeInsurance.type.toLowerCase()}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(new Date(exchangeInsurance.useDate))),
    ).toBeInTheDocument();
  });

  it('toggles the component visible content back to hidden when chevron is clicked again', () => {
    renderWithProps();
    const { exchangeInsurance } = defaultProps;

    expect(
      screen.queryByText(exchangeInsurance.exchangeInsuranceId),
    ).not.toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId('icon-chevron-down-bold')));
    expect(
      screen.getByText(exchangeInsurance.exchangeInsuranceId),
    ).toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId('icon-chevron-up-bold')));
    expect(
      screen.queryByText(exchangeInsurance.exchangeInsuranceId),
    ).not.toBeInTheDocument();
  });

  it('executes the provided onEdit method when Edit button is clicked', () => {
    renderWithProps();
    act(() => userEvent.click(screen.getByTestId('icon-chevron-down-bold')));

    act(() => userEvent.click(screen.getByText('T_edit')));
    expect(defaultProps.onEdit).toHaveBeenCalledWith(
      defaultProps.exchangeInsurance.exchangeInsuranceId,
    );
  });

  it('executes the provided onDelete method when Delete button is clicked', () => {
    renderWithProps();
    act(() => userEvent.click(screen.getByTestId('icon-chevron-down-bold')));

    act(() => userEvent.click(screen.getByText('T_delete')));
    expect(defaultProps.onDelete).toHaveBeenCalledWith(
      defaultProps.exchangeInsurance.exchangeInsuranceId,
    );
  });
});

import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import RiskLineTable from '../RiskLineTable';
import { formatDate } from '../../../utils/dates';
import { formatNumber } from '../../../utils/formatNumber';

describe('Component RiskLineTable', () => {
  const defaultProps = {
    riskLine: {
      availableAmount: '1020',
      client: 'client-id-1',
      currency: 'EUR',
      expires: '2022-07-27T13:19:59.803Z',
      iban: '0049 3295 2020 15792',
      id: '1',
      limitAmount: '1020',
      status: 'approved',
    },
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<RiskLineTable {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('formats the date correctly', () => {
    renderWithProps();

    expect(
      screen.getByText(formatDate(new Date(defaultProps.riskLine.expires))),
    ).toBeInTheDocument();
  });

  it('formats the numeric values correctly', () => {
    renderWithProps();

    expect(
      screen.getByText(formatNumber(defaultProps.riskLine.availableAmount)),
    ).toBeInTheDocument();
  });

  it('translates the status correctly', () => {
    renderWithProps();

    expect(
      screen.getByText(`T_statuses.${defaultProps.riskLine.status}`),
    ).toBeInTheDocument();
  });
});

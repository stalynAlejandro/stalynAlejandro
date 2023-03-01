import React from 'react';
import { screen } from '@testing-library/react';

import { CurrencyValue } from '../CurrencyValue';
import { renderComponent } from '../../../../../testUtils/renderComponent';
import { CustomerCollection } from '../CustomerCollection';
import { CustomerCollectionProps } from '../CustomerCollection/CustomerCollection';
import { formatDate } from '../../../../../utils/dates';
import DefaultValue, { DefaultValueProps } from '../DefaultValue/DefaultValue';
import RiskLine, { RiskLineProps } from '../RiskLine/RiskLine';

describe('Component OptionComponents', () => {
  describe('OptionComponent CurrencyValue', () => {
    const renderWithProps = (props: any = {}) => {
      renderComponent(<CurrencyValue {...props} />);
    };

    it('renders the Currency component successfully without border and with flag', () => {
      const currency = 'EUR';
      renderWithProps({ value: { currency } });

      expect(screen.getByTestId('currency')).toBeInTheDocument();
      expect(screen.getByTestId('currency-flag')).toBeInTheDocument();
      expect(screen.getByTestId('currency-flag')).toHaveAttribute(
        'data-flag',
        currency,
      );
      expect(screen.getByTestId('currency')).not.toHaveStyle(
        'border: 1px solid #cedee7;',
      );
    });

    it('renders correctly the currency provided', () => {
      const currency = 'USD';
      renderWithProps({ value: { currency } });
      expect(screen.getByTestId('currency-flag')).toHaveAttribute(
        'data-flag',
        currency,
      );
      expect(screen.getByText(currency)).toBeInTheDocument();
    });
  });

  describe('OptionComponent CustomerCollection', () => {
    const defaultProps: CustomerCollectionProps = {
      context: 'menu',
      value: {
        amount: '1234',
        approvalDate: '2022-07-22T13:30:12.729Z',
        code: 'CODE01',
        contractReference: 'C9292930280',
        creationDate: '2022-07-21T13:30:12.729Z',
        currency: 'EUR',
        customer: {
          customerId: '0001',
          name: 'MyName',
          office: '1234',
          personNumber: 'BUC-1234567',
          segment: 'SME',
          taxId: 'B1234567',
        },
        nominalAccount: {
          currency: 'EUR',
          iban: '0049 3295 2020 15792',
          id: '100010001',
        },
      },
    };

    const renderWithProps = (props: Partial<CustomerCollectionProps> = {}) => {
      renderComponent(<CustomerCollection {...defaultProps} {...props} />);
    };

    it('renders the component successfully if the context is set to menu', () => {
      renderWithProps();
      const { code, contractReference, currency } = defaultProps.value;

      expect(screen.getByText('1.234,00')).toBeInTheDocument();
      expect(screen.getByText(code!)).toBeInTheDocument();
      expect(screen.getByText(currency)).toBeInTheDocument();
      expect(screen.getByText(contractReference)).toBeInTheDocument();

      expect(screen.getByText('T_issuanceDate')).toBeInTheDocument();
    });

    it('renders the DefaultValue component without currency when the context is not menu', () => {
      renderWithProps({ context: 'value' });

      expect(
        screen.queryByText(defaultProps.value.contractReference),
      ).not.toBeInTheDocument();
      expect(screen.getByText(defaultProps.value.code!)).toBeInTheDocument();
    });

    it('formats the provided approvalDate correctly', () => {
      renderWithProps();

      expect(
        screen.getByText(
          formatDate(new Date(`${defaultProps.value.approvalDate}`)),
        ),
      ).toBeInTheDocument();
    });
  });

  describe('OptionComponent DefaultValue', () => {
    const defaultProps: DefaultValueProps = {
      context: 'menu',
      label: 'MyLabel',
      value: { currency: 'EUR' },
    };

    const renderWithProps = (props: Partial<DefaultValueProps> = {}) => {
      renderComponent(<DefaultValue {...defaultProps} {...props} />);
    };

    it('renders the component successfully with currency by default', () => {
      renderWithProps();

      expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.value.currency)).toBeInTheDocument();
    });

    it('does not render currency if showCurrency is set to false', () => {
      renderWithProps({ showCurrency: false });

      expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
      expect(
        screen.queryByText(defaultProps.value.currency),
      ).not.toBeInTheDocument();
    });

    it('does not render currency if currency is not present in value prop', () => {
      renderWithProps({ value: { smth: 'anyth' } });

      expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
      expect(screen.queryByTestId('currency')).not.toBeInTheDocument();
    });
  });

  describe('OptionComponent RiskLine', () => {
    const defaultProps: RiskLineProps = {
      context: 'menu',
      value: {
        availableAmount: '1020',
        client: 'client-id-1',
        currency: 'EUR',
        expires: '2022-07-21T13:30:12.729Z',
        iban: '0049 3295 2020 15792',
        id: '1',
        limitAmount: '1020',
        status: 'approved',
      },
    };

    const renderWithProps = (props: Partial<RiskLineProps> = {}) => {
      renderComponent(<RiskLine {...defaultProps} {...props} />);
    };

    it('renders the component successfully when context is menu', () => {
      renderWithProps();
      const { currency, expires, iban, status } = defaultProps.value;

      expect(screen.getByText('1.020,00')).toBeInTheDocument();
      expect(screen.getByText(currency)).toBeInTheDocument();
      expect(
        screen.getByText(formatDate(new Date(expires))),
      ).toBeInTheDocument();
      expect(screen.getByText(iban)).toBeInTheDocument();
      expect(
        screen.getByText(`T_statuses.${status.toLowerCase()}`),
      ).toBeInTheDocument();
      expect(screen.getByText('T_expiration')).toBeInTheDocument();
      expect(screen.getByText('T_availableAmount')).toBeInTheDocument();
    });

    it('renders the DefaultValue component when context is not menu', () => {
      renderWithProps({ context: 'value' });

      expect(screen.getByText(defaultProps.value.iban)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.value.currency)).toBeInTheDocument();
      expect(screen.queryByText('T_expiration')).not.toBeInTheDocument();
      expect(
        screen.queryByText(formatDate(new Date(defaultProps.value.expires))),
      ).not.toBeInTheDocument();
    });
  });
});

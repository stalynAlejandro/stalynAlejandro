import { screen, waitFor, within } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';
import produce from 'immer';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../../../../testUtils/renderComponent';
import {
  input,
  inputSelect,
  select,
  textarea,
} from '../../../../../../testUtils/controls';
import Request from '../Request';
import { get as collectionsResponse } from '../../../../../../testUtils/mocks/data/customerCollections';
import { get as currenciesResponse } from '../../../../../../testUtils/mocks/data/currencies';
import { get as exchangeInsurances } from '../../../../../../testUtils/mocks/data/exchangeInsurances';
import { get as clientAccounts } from '../../../../../../testUtils/mocks/data/accounts';
import theme from '../../../../../../resources/theme';
import { changeInputValue } from '../../../../../../testUtils/changeInputValue';
import * as userSelector from '../../../../../../redux/selectors/user';
import { formatNumber } from '../../../../../../utils/formatNumber';
import productTypes from '../../../../../../enums/productTypes';
import eventTypes from '../../../../../../enums/eventTypes';

describe('Form Step CLI PAYMENT CHARGE CreateForm Request', () => {
  const defaultProps = {
    formData: {
      customer: { personNumber: 'BUC-123456' },
    },
    onDataChange: jest.fn(),
    onSubmitStep: jest.fn(),
    onSummarizeFormData: jest.fn(),
  };

  const renderStep = async (props: any = {}) => {
    await act(() => {
      renderComponent(<Request {...defaultProps} {...props} />);
    });
  };

  beforeEach(() => {
    fetchMockJest.reset();
    fetchMockJest.mock(
      /import-collections/,
      { body: collectionsResponse, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /fx-deals/,
      { body: exchangeInsurances, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /currencies/,
      { body: currenciesResponse, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /accounts/,
      { body: clientAccounts, status: 200 },
      { overwriteRoutes: true },
    );
    jest.spyOn(userSelector, 'getUser').mockImplementation(() => ({} as any));
  });

  describe('First load display data', () => {
    it('renders the component successfully', async () => {
      await renderStep();

      expect(screen.getByText('T_completeOperationData')).toBeInTheDocument();
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_requestReference'),
        ),
      ).toEqual('');
      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_nominalAccount')),
      ).toEqual('');
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_commissionAccount'),
        ),
      ).toEqual('');
      expect(
        inputSelect.input.getDisplayValue(
          inputSelect.input.getByPlaceholderText('T_amount'),
        ),
      ).toEqual('');
      expect(
        textarea.getDisplayValue(
          textarea.getByPlaceholderText('T_comments', true),
        ),
      ).toEqual('');
    });

    it('displays all fields without errors on load', async () => {
      await renderStep();
      const errorStyle = {
        borderBottomColor: theme.colors.boston,
      };

      expect(select.getByPlaceholderText('T_requestReference')).not.toHaveStyle(
        errorStyle,
      );
      expect(select.getByPlaceholderText('T_nominalAccount')).not.toHaveStyle(
        errorStyle,
      );
      expect(
        select.getByPlaceholderText('T_commissionAccount'),
      ).not.toHaveStyle(errorStyle);
      expect(textarea.getByPlaceholderText('T_comments', true)).not.toHaveStyle(
        errorStyle,
      );
      expect(
        inputSelect.input.getByPlaceholderText('T_amount'),
      ).not.toHaveStyle(errorStyle);
    });

    it('renders the values provided in formData', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.request = {
          amount: '1234.00',
          clientAccount: clientAccounts[0].accounts[0],
          comments: 'My comments',
          commissionAccount: clientAccounts[0].accounts[1],
          currency: {
            currency: 'USD',
            id: 'USD',
          },
          exchangeInsurances: [exchangeInsurances[0]],
          importCollection: collectionsResponse[1],
          office: '1235',
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.request;

      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_requestReference'),
        ),
      ).toEqual(data.importCollection.code);

      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_nominalAccount')),
      ).toEqual(data.clientAccount.iban);
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_commissionAccount'),
        ),
      ).toEqual(data.commissionAccount.iban);

      expect(
        inputSelect.input.getDisplayValue(
          inputSelect.input.getByPlaceholderText('T_amount'),
        ),
      ).toEqual(formatNumber(data.amount));
      expect(
        inputSelect.select.getDisplayValue(
          inputSelect.select.getByPlaceholderText('T_amount'),
        ),
      ).toEqual(data.currency.currency);

      expect(
        input.getDisplayValue(input.getByPlaceholderText('T_office')),
      ).toEqual(data.office);
      expect(
        textarea.getDisplayValue(
          textarea.getByPlaceholderText('T_comments', true),
        ),
      ).toEqual(data.comments);

      expect(
        screen.getByText('T_exchangeInsurance', {
          selector: '[data-testid="step-subtitle"]',
        }),
      ).toBeInTheDocument();
    });
  });

  describe('First load fetch data', () => {
    it('fetches the import collections on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/import-collections/)?.[0]
          .includes(`customer=${defaultProps.formData.customer.personNumber}`),
      ).toBeTruthy();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_requestReference'),
          )!,
        ),
      );
      collectionsResponse.forEach((col) => {
        expect(screen.getByText(col.code)).toBeInTheDocument();
      });
    });

    it('fetches currencies on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/currencies/)?.[0]
          .includes(
            `product=${productTypes.CLI}&event=${eventTypes.PAYMENT_CHARGE}`,
          ),
      ).toBeTruthy();

      await act(() =>
        userEvent.click(
          inputSelect.select.getInteractiveElement(
            inputSelect.select.getByPlaceholderText('T_amount'),
          ),
        ),
      );

      currenciesResponse.forEach((cur) => {
        expect(screen.getAllByText(cur.currency).length).toBeTruthy();
      });
    });

    it('fetches customer accounts on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/accounts/)?.[0]
          .includes(`client=${defaultProps.formData.customer.personNumber}`),
      ).toBeTruthy();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_nominalAccount'),
          )!,
        ),
      );

      await waitFor(() => {
        clientAccounts[0].accounts.forEach((rl) => {
          expect(screen.getByText(rl.iban)).toBeInTheDocument();
        });
      });

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_nominalAccount'),
          )!,
        ),
      );
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_commissionAccount'),
          )!,
        ),
      );

      await waitFor(() => {
        clientAccounts[0].accounts.forEach((rl) => {
          expect(screen.getByText(rl.iban)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Interactions, expected behaviours and method executions', () => {
    it('sets the office field to readonly if office is set in session', async () => {
      jest
        .spyOn(userSelector, 'getUser')
        .mockImplementation(() => ({ office: '1234' } as any));
      await renderStep();

      expect(
        input.getInteractiveElement(input.getByPlaceholderText('T_office')),
      ).toHaveAttribute('readonly');
    });

    it('executes provided onDataChange method when changing a field value', async () => {
      await renderStep();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_requestReference'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(collectionsResponse[1].code)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          importCollection: collectionsResponse[1],
        }),
      );

      await act(() =>
        userEvent.paste(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_amount'),
          ),
          '123',
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          amount: '123.00',
        }),
      );

      await act(() =>
        userEvent.click(
          inputSelect.select.getInteractiveElement(
            inputSelect.select.getByPlaceholderText('T_amount'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(currenciesResponse[0].currency)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          currency: currenciesResponse[0],
        }),
      );

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_nominalAccount'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(clientAccounts[0].accounts[0].iban)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          clientAccount: clientAccounts[0].accounts[0],
        }),
      );

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_commissionAccount'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(clientAccounts[0].accounts[1].iban)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          commissionAccount: clientAccounts[0].accounts[1],
        }),
      );

      await act(() =>
        userEvent.paste(
          textarea.getInteractiveElement(
            textarea.getByPlaceholderText('T_comments', true),
          ),
          'my comments',
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ comments: 'my comments' }),
      );
    });

    it('executes the provided onSubmitStep method when submitting the form with valid information', async () => {
      jest
        .spyOn(userSelector, 'getUser')
        .mockImplementation(() => ({ office: '1234' } as any));
      await renderStep();

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onSubmitStep).not.toHaveBeenCalled();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_requestReference'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(collectionsResponse[1].code)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          importCollection: collectionsResponse[1],
        }),
      );

      await act(() =>
        userEvent.paste(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_amount'),
          ),
          '123',
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          amount: '123.00',
        }),
      );

      await act(() =>
        userEvent.click(
          inputSelect.select.getInteractiveElement(
            inputSelect.select.getByPlaceholderText('T_amount'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(currenciesResponse[0].currency)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          currency: currenciesResponse[0],
        }),
      );

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_nominalAccount'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(clientAccounts[0].accounts[0].iban)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          clientAccount: clientAccounts[0].accounts[0],
        }),
      );

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_commissionAccount'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(clientAccounts[0].accounts[1].iban)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          commissionAccount: clientAccounts[0].accounts[1],
        }),
      );

      await act(() =>
        userEvent.paste(
          textarea.getInteractiveElement(
            textarea.getByPlaceholderText('T_comments', true),
          ),
          'my comments',
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ comments: 'my comments' }),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith({
        amount: '123.00',
        clientAccount: clientAccounts[0].accounts[0],
        comments: 'my comments',
        commissionAccount: clientAccounts[0].accounts[1],
        currency: currenciesResponse[0],
        importCollection: collectionsResponse[1],
        office: '1234',
      });
      expect(defaultProps.onSubmitStep).toHaveBeenLastCalledWith();
    });

    it('allows searching within received collections', async () => {
      await renderStep();
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_requestReference'),
          ),
        ),
      );

      act(() => {
        userEvent.paste(
          select
            .getByPlaceholderText('T_requestReference')!
            .querySelector('input')!,
          collectionsResponse[1].code,
        );
      });

      expect(
        screen.queryByText(collectionsResponse[0].code),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(collectionsResponse[1].code),
      ).toBeInTheDocument();
    });

    it('renders the Exchange Insurance button when the currency is different from the collection currency', async () => {
      await renderStep();

      expect(screen.queryByText('T_exchangeInsurance')).not.toBeInTheDocument();
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_requestReference'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(collectionsResponse[0].code)),
      );
      await act(() =>
        userEvent.paste(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_amount'),
          ),
          '1000',
        ),
      );

      await act(() =>
        userEvent.click(
          inputSelect.select.getInteractiveElement(
            inputSelect.select.getByPlaceholderText('T_amount'),
          ),
        ),
      );
      act(() => {
        userEvent.click(screen.getByText(currenciesResponse[0].currency));
      });

      expect(screen.queryByText('T_exchangeInsurance')).toBeInTheDocument();
    });

    it('displays the exchange insurance screen when pressing the button', async () => {
      await renderStep();

      expect(screen.queryByText('T_exchangeInsurance')).not.toBeInTheDocument();
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_requestReference'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(collectionsResponse[0].code)),
      );
      await act(() =>
        userEvent.paste(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_amount'),
          ),
          '1000',
        ),
      );

      await act(() =>
        userEvent.click(
          inputSelect.select.getInteractiveElement(
            inputSelect.select.getByPlaceholderText('T_amount'),
          ),
        ),
      );
      act(() => {
        userEvent.click(screen.getByText(currenciesResponse[0].currency));
      });

      act(() => {
        userEvent.click(screen.getByText('T_exchangeInsurance'));
      });

      await waitFor(() => {
        expect(fetchMockJest.lastCall(/fx-deals/)).toBeTruthy();
      });

      expect(
        screen.getByTestId('exchange-insurance-selector'),
      ).toBeInTheDocument();
    });

    it('allows deleting an exchange insurance from the summary control', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.request = {
          amount: 2222,
          currency: currenciesResponse[0],
          exchangeInsurances: [exchangeInsurances[0]],
          importCollection: collectionsResponse[0],
        };
      });

      await renderStep(newProps);

      const { getByTestId, getByText } = within(
        screen.getByTestId('exchange-insurance-summary'),
      );
      act(() => {
        userEvent.click(getByTestId('icon-chevron-down-bold'));
      });

      act(() => {
        userEvent.click(getByText('T_delete'));
      });

      expect(
        screen.queryByTestId('exchange-insurance-summary'),
      ).not.toBeInTheDocument();
      expect(
        await screen.findByText('T_exchangeInsurance', { selector: 'button' }),
      ).toBeInTheDocument();
    });

    it('allows editing the selected exchange insurances by clicking the edit button', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.request = {
          amount: 2222,
          currency: currenciesResponse[0],
          exchangeInsurances: [exchangeInsurances[0]],
          importCollection: collectionsResponse[0],
        };
      });

      await renderStep(newProps);

      const { getByTestId, getByText } = within(
        screen.getByTestId('exchange-insurance-summary'),
      );
      act(() => {
        userEvent.click(getByTestId('icon-chevron-down-bold'));
      });

      act(() => {
        userEvent.click(getByText('T_edit'));
      });

      await waitFor(() => {
        expect(fetchMockJest.lastCall(/fx-deals/)).toBeTruthy();
      });

      expect(
        screen.queryByTestId('exchange-insurance-summary'),
      ).not.toBeInTheDocument();
      expect(
        await screen.findByTestId('exchange-insurance-selector'),
      ).toBeInTheDocument();
    });

    it('renders a table showing the reference collection data when one is selected', async () => {
      await renderStep();

      expect(screen.queryByTestId('table')).not.toBeInTheDocument();
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_requestReference'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(collectionsResponse[0].code)),
      );
      expect(screen.queryByTestId('table')).toBeInTheDocument();
    });
  });

  describe('Field validation', () => {
    it('displays errors in the required fields when they are empty and the form is submitted', async () => {
      await renderStep();

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(select.getByPlaceholderText('T_requestReference')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
      expect(input.getByPlaceholderText('T_office')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
    });

    it('forces office to be 4 digits', async () => {
      await renderStep();

      await act(() =>
        changeInputValue(
          input.getInteractiveElement(input.getByPlaceholderText('T_office')),
          '123',
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(input.getByPlaceholderText('T_office')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });

      await act(() =>
        changeInputValue(
          input.getInteractiveElement(input.getByPlaceholderText('T_office')),
          '1234',
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(input.getByPlaceholderText('T_office')).not.toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
    });
  });

  describe('Contextual information and messages', () => {
    it('displays summarized data for previous steps', async () => {
      await renderStep();
      expect(defaultProps.onSummarizeFormData).toHaveBeenLastCalledWith([
        'customer',
      ]);
    });
  });
});

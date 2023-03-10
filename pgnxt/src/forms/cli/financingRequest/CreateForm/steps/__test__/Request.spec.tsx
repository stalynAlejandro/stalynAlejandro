import { screen, waitFor } from '@testing-library/react';
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
import { get as clientAccounts } from '../../../../../../testUtils/mocks/data/accounts';
import { get as riskLinesResponse } from '../../../../../../testUtils/mocks/data/riskLines';
import theme from '../../../../../../resources/theme';
import { changeInputValue } from '../../../../../../testUtils/changeInputValue';
import * as userSelector from '../../../../../../redux/selectors/user';
import { formatNumber } from '../../../../../../utils/formatNumber';
import productTypes from '../../../../../../enums/productTypes';
import eventTypes from '../../../../../../enums/eventTypes';

describe('Form Step CLI FINANCING REQUEST CreateForm Request', () => {
  const defaultProps = {
    formData: {
      customer: { personNumber: 'BUC-123456' },
    },
    onDataChange: jest.fn(),
    onSubmitStep: jest.fn(),
    onSummarizeFormData: jest.fn(),
  };

  const renderStep = async (props: any = {}) => {
    jest.useFakeTimers();

    await act(() => {
      renderComponent(<Request {...defaultProps} {...props} />);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() =>
      expect(fetchMockJest.lastCall(/risk-lines/)).toBeTruthy(),
    );

    jest.useRealTimers();
  };

  beforeEach(() => {
    fetchMockJest.reset();
    fetchMockJest.mock(
      /import-collections/,
      { body: collectionsResponse, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /risk-lines/,
      { body: riskLinesResponse, status: 200 },
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
        select.getDisplayValue(
          select.getByPlaceholderText('T_financingAccount'),
        ),
      ).toEqual('');
      expect(
        inputSelect.input.getDisplayValue(
          inputSelect.input.getByPlaceholderText('T_amount'),
        ),
      ).toEqual('');
      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_financingExp')),
      ).toEqual('');
      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_riskLine')),
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
      expect(select.getByPlaceholderText('T_financingAccount')).not.toHaveStyle(
        errorStyle,
      );
      expect(inputSelect.getByPlaceholderText('T_amount')).not.toHaveStyle(
        errorStyle,
      );
      expect(select.getByPlaceholderText('T_financingExp')).not.toHaveStyle(
        errorStyle,
      );
      expect(select.getByPlaceholderText('T_riskLine')).not.toHaveStyle(
        errorStyle,
      );
      expect(textarea.getByPlaceholderText('T_comments', true)).not.toHaveStyle(
        errorStyle,
      );
    });

    it('renders the values provided in formData', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.request = {
          account: clientAccounts[0].accounts[0],
          amount: '1234.00',
          comments: 'My comments',
          currency: {
            currency: 'USD',
            id: 'USD',
          },
          expirationDays: '30',
          expirationType: 'days',
          importCollection: collectionsResponse[1],
          office: '1235',
          riskLine: riskLinesResponse[0],
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
        select.getDisplayValue(
          select.getByPlaceholderText('T_financingAccount'),
        ),
      ).toEqual(data.account.iban);

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
        select.getDisplayValue(select.getByPlaceholderText('T_financingExp')),
      ).toEqual(`T_${data.expirationType}`);

      expect(
        input.getDisplayValue(input.getByPlaceholderText('T_daysNumber')),
      ).toEqual(data.expirationDays);

      await waitFor(() => {
        expect(
          select.getDisplayValue(select.getByPlaceholderText('T_riskLine')),
        ).toEqual(data.riskLine.iban);
      });

      expect(
        input.getDisplayValue(input.getByPlaceholderText('T_office')),
      ).toEqual(data.office);
      expect(
        textarea.getDisplayValue(
          textarea.getByPlaceholderText('T_comments', true),
        ),
      ).toEqual(data.comments);
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
            select.getByPlaceholderText('T_financingAccount'),
          )!,
        ),
      );

      await waitFor(() => {
        clientAccounts[0].accounts.forEach((rl) => {
          expect(screen.getByText(rl.iban)).toBeInTheDocument();
        });
      });
    });

    it('fetches risk lines on load and displays them', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.request = {
          account: clientAccounts[0].accounts[0],
          amount: '1234.00',
          currency: {
            currency: 'USD',
            id: 'USD',
          },
          expirationDays: '30',
          expirationType: 'days',
          importCollection: collectionsResponse[1],
          office: '1235',
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.request;

      expect(
        fetchMockJest
          .lastCall(/risk-lines/)?.[0]
          .includes(`client=${defaultProps.formData.customer.personNumber}`),
      ).toBeTruthy();
      await waitFor(() => {
        expect(
          fetchMockJest
            .lastCall(/risk-lines/)?.[0]
            .includes(`operation_amount=${data.amount}`),
        ).toBeTruthy();
      });
      expect(
        fetchMockJest
          .lastCall(/risk-lines/)?.[0]
          .includes(`operation_currency=${data.currency.currency}`),
      ).toBeTruthy();
      expect(
        fetchMockJest
          .lastCall(/risk-lines/)?.[0]
          .includes(`product_id=${productTypes.CLI}`),
      ).toBeTruthy();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_riskLine'),
          )!,
        ),
      );

      await waitFor(() => {
        riskLinesResponse.forEach((rl) => {
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
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_financingAccount'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(clientAccounts[0].accounts[0].iban)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          account: clientAccounts[0].accounts[0],
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
            select.getByPlaceholderText('T_financingExp'),
          ),
        ),
      );
      await act(() => userEvent.click(screen.getByText('T_days')));
      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_daysNumber'),
          ),
          '25',
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          expirationDays: '25',
          expirationType: 'days',
        }),
      );

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_riskLine'),
          ),
        ),
      );
      await act(async () =>
        userEvent.click(await screen.findByText(riskLinesResponse[0].iban)),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          riskLine: riskLinesResponse[0],
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
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_financingAccount'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(clientAccounts[0].accounts[0].iban)),
      );
      await act(() =>
        userEvent.paste(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_amount'),
          ),
          '123',
        ),
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
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_financingExp'),
          ),
        ),
      );
      await act(() => userEvent.click(screen.getByText('T_days')));
      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_daysNumber'),
          ),
          '25',
        ),
      );
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_riskLine'),
          ),
        ),
      );
      await act(async () =>
        userEvent.click(await screen.findByText(riskLinesResponse[0].iban)),
      );
      await act(() =>
        userEvent.paste(
          textarea.getInteractiveElement(
            textarea.getByPlaceholderText('T_comments', true),
          ),
          'my comments',
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith({
        account: clientAccounts[0].accounts[0],
        amount: '123.00',
        comments: 'my comments',
        currency: currenciesResponse[0],
        expirationDate: '',
        expirationDays: '25',
        expirationType: 'days',
        importCollection: collectionsResponse[1],
        office: '1234',
        riskLine: riskLinesResponse[0],
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

    it('renders a table showing the risk line data when one is selected', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.request = {
          amount: '1234.00',
          comments: 'My comments',
          currency: {
            currency: 'USD',
            id: 'USD',
          },
          expirationDate: '2023-12-02T00:00:00.000Z',
          expirationType: 'date',
          office: '1234',
        };
      });

      await renderStep(newProps);

      expect(screen.queryByTestId('table')).not.toBeInTheDocument();
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_riskLine'),
          ),
        ),
      );
      await act(async () =>
        userEvent.click(await screen.findByText(riskLinesResponse[0].iban)),
      );
      expect(screen.queryByTestId('table')).toBeInTheDocument();
    });
  });

  describe('Field validation', () => {
    it('displays errors in the required fields when they are empty and the form is submitted', async () => {
      await renderStep();
      const errorStyle = {
        borderBottomColor: theme.colors.boston,
      };
      await act(() => userEvent.click(screen.getByText('T_continue')));

      expect(select.getByPlaceholderText('T_requestReference')).toHaveStyle(
        errorStyle,
      );
      expect(select.getByPlaceholderText('T_financingAccount')).toHaveStyle(
        errorStyle,
      );
      expect(inputSelect.getByPlaceholderText('T_amount')).toHaveStyle(
        errorStyle,
      );
      expect(select.getByPlaceholderText('T_financingExp')).toHaveStyle(
        errorStyle,
      );
      expect(select.getByPlaceholderText('T_riskLine')).toHaveStyle(errorStyle);
      expect(input.getByPlaceholderText('T_office')).toHaveStyle(errorStyle);
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

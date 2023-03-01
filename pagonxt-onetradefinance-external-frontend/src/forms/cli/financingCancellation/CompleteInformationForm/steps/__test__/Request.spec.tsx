import { screen, within } from '@testing-library/react';
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
import { get as accountsResponse } from '../../../../../../testUtils/mocks/data/accounts';
import { get as currenciesResponse } from '../../../../../../testUtils/mocks/data/currencies';
import { get as financingRequestsResponse } from '../../../../../../testUtils/mocks/data/customerFinancingRequests';
import theme from '../../../../../../resources/theme';
import { changeInputValue } from '../../../../../../testUtils/changeInputValue';
import * as userSelector from '../../../../../../redux/selectors/user';
import { formatNumber } from '../../../../../../utils/formatNumber';
import { formatDate } from '../../../../../../utils/dates';
import productTypes from '../../../../../../enums/productTypes';
import eventTypes from '../../../../../../enums/eventTypes';

describe('Form Step CLI FINANCING CANCELLATION CompleteInformationForm Request', () => {
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
      jest.advanceTimersByTime(300);
    });

    jest.useRealTimers();
  };

  beforeAll(() => {
    fetchMockJest.mock(
      /accounts/,
      { body: accountsResponse, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /currencies/,
      { body: currenciesResponse, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /financing-collections/,
      { body: financingRequestsResponse, status: 200 },
      { overwriteRoutes: true },
    );
  });

  beforeEach(() => {
    jest.spyOn(userSelector, 'getUser').mockImplementation(() => ({} as any));
  });

  describe('First load display data', () => {
    it('renders the component successfully', async () => {
      await renderStep();

      expect(
        screen.getByText('T_completeClientAndOperationData'),
      ).toBeInTheDocument();
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_collectionReference'),
        ),
      ).toEqual('');
      expect(
        inputSelect.input.getDisplayValue(
          inputSelect.input.getByPlaceholderText('T_amount'),
        ),
      ).toEqual('');
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_accountInCharge'),
        ),
      ).toEqual('');
      expect(
        textarea.getDisplayValue(textarea.getByPlaceholderText('T_comments')),
      ).toEqual('');
    });

    it('displays all fields without errors on load', async () => {
      await renderStep();
      const expectedStyle = {
        borderBottomColor: theme.colors.boston,
      };

      expect(
        select.getByPlaceholderText('T_collectionReference'),
      ).not.toHaveStyle(expectedStyle);
      expect(select.getByPlaceholderText('T_accountInCharge')).not.toHaveStyle(
        expectedStyle,
      );
      expect(inputSelect.getByPlaceholderText('T_amount')).not.toHaveStyle(
        expectedStyle,
      );
      expect(textarea.getByPlaceholderText('T_comments')).not.toHaveStyle(
        expectedStyle,
      );
    });

    it('renders the values provided in formData', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.request = {
          account: accountsResponse[0].accounts[0],
          amount: '1234.00',
          comments: 'My comments',
          currency: currenciesResponse[0],
          financingRequest: financingRequestsResponse[1],
          office: '1234',
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.request;

      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_collectionReference'),
        ),
      ).toEqual(data.financingRequest.code);
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_accountInCharge'),
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
        input.getDisplayValue(input.getByPlaceholderText('T_applicantOffice')),
      ).toEqual(data.office);
      expect(
        textarea.getDisplayValue(textarea.getByPlaceholderText('T_comments')),
      ).toEqual(data.comments);
    });
  });

  describe('First load fetch data', () => {
    it('fetches the financing requests on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/financing-collections/)?.[0]
          .includes(`customer=${defaultProps.formData.customer.personNumber}`),
      ).toBeTruthy();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_collectionReference'),
          )!,
        ),
      );
      financingRequestsResponse.forEach((col) => {
        expect(screen.getByText(col.code)).toBeInTheDocument();
      });
    });

    it('fetches the selected customer accounts on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/accounts/)?.[0]
          .includes(`client=${defaultProps.formData.customer.personNumber}`),
      ).toBeTruthy();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_accountInCharge'),
          )!,
        ),
      );
      accountsResponse[0].accounts.forEach((acc) => {
        expect(screen.getByText(acc.iban)).toBeInTheDocument();
      });
    });

    it('fetches currencies on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/currencies/)?.[0]
          .includes(
            `product=${productTypes.CLI}&event=${eventTypes.FINANCING_CANCELLATION}`,
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
  });

  describe('Interactions, expected behaviours and method executions', () => {
    it('sets the office field to readonly if office is set in session', async () => {
      jest
        .spyOn(userSelector, 'getUser')
        .mockImplementation(() => ({ office: '1234' } as any));
      await renderStep();

      expect(
        input.getInteractiveElement(
          input.getByPlaceholderText('T_applicantOffice'),
        ),
      ).toHaveAttribute('readonly');
    });

    it('executes provided onDataChange method when changing a field value', async () => {
      await renderStep();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_collectionReference'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(financingRequestsResponse[1].code)),
      );
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({
          financingRequest: financingRequestsResponse[1],
        }),
      );

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_accountInCharge'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(accountsResponse[0].accounts[0].iban)),
      );
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({
          account: accountsResponse[0].accounts[0],
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
        userEvent.paste(
          textarea.getInteractiveElement(
            textarea.getByPlaceholderText('T_comments'),
          ),
          'my comments',
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({ comments: 'my comments' }),
      );
    });

    it('displays selected collection data upon selection', async () => {
      await renderStep();
      const selectedCollection = financingRequestsResponse[1];

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_collectionReference'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(selectedCollection.code)),
      );

      const { getByText } = within(screen.getByTestId('table-container'));
      expect(getByText(selectedCollection.code)).toBeInTheDocument();
      expect(
        getByText(formatDate(new Date(selectedCollection.approvalDate))),
      ).toBeInTheDocument();
      expect(
        getByText(formatNumber(selectedCollection.amount)),
      ).toBeInTheDocument();
      expect(getByText(selectedCollection.currency)).toBeInTheDocument();
    });

    it('executes the provided onSubmitStep method when submitting the form with valid information', async () => {
      await renderStep();

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onSubmitStep).not.toHaveBeenCalled();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_collectionReference'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(financingRequestsResponse[1].code)),
      );

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_accountInCharge'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(accountsResponse[0].accounts[0].iban)),
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
        userEvent.paste(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_applicantOffice'),
          ),
          '1245',
        ),
      );

      await act(() =>
        userEvent.paste(
          textarea.getInteractiveElement(
            textarea.getByPlaceholderText('T_comments'),
          ),
          'my comments',
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith({
        account: accountsResponse[0].accounts[0],
        amount: '123.00',
        comments: 'my comments',
        currency: currenciesResponse[0],
        financingRequest: financingRequestsResponse[1],
        office: '1245',
      });
      expect(defaultProps.onSubmitStep).toHaveBeenLastCalledWith();
    });
  });

  describe('Field validation', () => {
    it('displays errors in the required fields when they are empty and the form is submitted', async () => {
      await renderStep();

      const expectedStyle = {
        borderBottomColor: theme.colors.boston,
      };

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(select.getByPlaceholderText('T_collectionReference')).toHaveStyle(
        expectedStyle,
      );
      expect(select.getByPlaceholderText('T_accountInCharge')).toHaveStyle(
        expectedStyle,
      );
      expect(inputSelect.getByPlaceholderText('T_amount')).toHaveStyle(
        expectedStyle,
      );
      expect(input.getByPlaceholderText('T_applicantOffice')).toHaveStyle(
        expectedStyle,
      );
      expect(textarea.getByPlaceholderText('T_comments')).toHaveStyle(
        expectedStyle,
      );
    });

    it('forces office to be 4 digits', async () => {
      await renderStep();

      await act(() =>
        changeInputValue(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_applicantOffice'),
          ),
          '123',
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(input.getByPlaceholderText('T_applicantOffice')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });

      await act(() =>
        changeInputValue(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_applicantOffice'),
          ),
          '1234',
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(input.getByPlaceholderText('T_applicantOffice')).not.toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
    });
  });

  describe('Contextual information and messages', () => {
    it('displays summarized data for previous steps', async () => {
      await renderStep();
      expect(defaultProps.onSummarizeFormData).toHaveBeenCalledWith([
        'customer',
      ]);
    });
  });
});

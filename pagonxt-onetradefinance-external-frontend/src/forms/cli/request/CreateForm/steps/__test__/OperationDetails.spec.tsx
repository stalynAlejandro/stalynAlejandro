import { screen } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';
import produce from 'immer';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../../../../testUtils/renderComponent';
import {
  input,
  inputSelect,
  radioButton,
  select,
  textarea,
} from '../../../../../../testUtils/controls';
import OperationDetails, { fieldLimits } from '../OperationDetails';
import { get as accountsResponse } from '../../../../../../testUtils/mocks/data/accounts';
import { get as currenciesResponse } from '../../../../../../testUtils/mocks/data/currencies';
import { get as collectionTypesResponse } from '../../../../../../testUtils/mocks/data/collectionTypes';
import { formatNumber } from '../../../../../../utils/formatNumber';
import theme from '../../../../../../resources/theme';
import { changeInputValue } from '../../../../../../testUtils/changeInputValue';
import * as userSelector from '../../../../../../redux/selectors/user';

describe('Form Step CLI REQUEST CreateForm OperationDetails', () => {
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
      renderComponent(<OperationDetails {...defaultProps} {...props} />);
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
      /collection-types/,
      { body: collectionTypesResponse, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /currencies/,
      { body: currenciesResponse, status: 200 },
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
        select.getDisplayValue(select.getByPlaceholderText('T_nominalAccount')),
      ).toEqual('');
    });

    it('displays all fields without errors on load', async () => {
      await renderStep();

      expect(select.getByPlaceholderText('T_nominalAccount')).not.toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
      expect(
        select.getByPlaceholderText('T_commissionAccount'),
      ).not.toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
    });

    it('renders the values provided in formData', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.operationDetails = {
          beneficiaryBank: 'Debtbnk',
          beneficiaryName: 'Debtnm',
          clientAccount: accountsResponse[0].accounts[0],
          clientReference: 'client ref',
          collectionAmount: '1234.00',
          collectionCurrency: currenciesResponse.find(
            (c) => c.currency === 'USD',
          ),
          collectionType: collectionTypesResponse[0].key,
          comments: 'My comments',
          commissionAccount: accountsResponse[0].accounts[1],
          hasAccount: true,
          office: '1234',
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.operationDetails;

      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_nominalAccount')),
      ).toEqual(data.clientAccount.iban);
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_commissionAccount'),
        ),
      ).toEqual(data.commissionAccount.iban);
      expect(
        input.getDisplayValue(input.getByPlaceholderText('T_collectionAmount')),
      ).toEqual(formatNumber(data.collectionAmount));
      expect(
        inputSelect.select.getDisplayValue(
          inputSelect.select.getByPlaceholderText('T_collectionAmount'),
        ),
      ).toEqual(data.collectionCurrency.currency);
      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_collectionType')),
      ).toEqual(`T_collectionTypes.${data.collectionType}`);
      expect(
        input.getDisplayValue(
          input.getByPlaceholderText('T_clientReference', true),
        ),
      ).toEqual(data.clientReference);
      expect(
        input.getDisplayValue(
          input.getByPlaceholderText('T_beneficiaryBank', true),
        ),
      ).toEqual(data.beneficiaryBank);
      expect(
        input.getDisplayValue(
          input.getByPlaceholderText('T_beneficiaryName', true),
        ),
      ).toEqual(data.beneficiaryName);
      expect(
        input.getDisplayValue(input.getByPlaceholderText('T_applicantOffice')),
      ).toEqual(data.office);
      expect(
        textarea.getDisplayValue(
          textarea.getByPlaceholderText('T_comments', true),
        ),
      ).toEqual(data.comments);
    });
  });

  describe('First load fetch data', () => {
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
            select.getByPlaceholderText('T_nominalAccount'),
          )!,
        ),
      );
      accountsResponse[0].accounts.forEach((acc) => {
        expect(screen.getByText(acc.iban)).toBeInTheDocument();
      });

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_commissionAccount'),
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
          .includes(`product=CLI&event=REQUEST`),
      ).toBeTruthy();

      await act(() =>
        userEvent.click(
          inputSelect.select.getInteractiveElement(
            inputSelect.select.getByPlaceholderText('T_collectionAmount'),
          ),
        ),
      );

      currenciesResponse.forEach((cur) => {
        expect(screen.getAllByText(cur.currency).length).toBeTruthy();
      });
    });

    it('fetches collection types on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/collection-types/)?.[0]
          .includes(`product_id=CLI&currency=EUR`),
      ).toBeTruthy();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_collectionType'),
          ),
        ),
      );

      collectionTypesResponse.forEach((typ) => {
        expect(
          screen.getByText(`T_collectionTypes.${typ.key}`),
        ).toBeInTheDocument();
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

    it('sets the commission account when nominal account changes', async () => {
      await renderStep();
      const { iban } = accountsResponse[0].accounts[0];

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_nominalAccount'),
          )!,
        ),
      );
      await act(() => userEvent.click(screen.getByText(iban)));

      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_nominalAccount')),
      ).toEqual(iban);
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_commissionAccount'),
        ),
      ).toEqual(iban);
    });

    it('does not change the nominal account when commission account changes', async () => {
      await renderStep();
      const { iban: nominalIban } = accountsResponse[0].accounts[0];
      const { iban: commissionIban } = accountsResponse[0].accounts[1];

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_nominalAccount'),
          )!,
        ),
      );
      await act(() => userEvent.click(screen.getByText(nominalIban)));

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_commissionAccount'),
          )!,
        ),
      );
      await act(() => userEvent.click(screen.getByText(commissionIban)));

      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_nominalAccount')),
      ).toEqual(nominalIban);
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_commissionAccount'),
        ),
      ).toEqual(commissionIban);
    });

    it('clears the accounts values when setting "has account" to "no", and restores empty selects when setting it to "yes"', async () => {
      await renderStep();
      const { iban: nominalIban } = accountsResponse[0].accounts[0];

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_nominalAccount'),
          )!,
        ),
      );
      await act(() => userEvent.click(screen.getByText(nominalIban)));
      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_nominalAccount')),
      ).toEqual(nominalIban);

      await act(() => userEvent.click(radioButton.getByLabel('T_no')));

      expect(select.getByPlaceholderText('T_nominalAccount')).toBeUndefined();
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({
          clientAccount: undefined,
          commissionAccount: undefined,
          hasAccount: false,
        }),
      );

      await act(() => userEvent.click(radioButton.getByLabel('T_yes')));
      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_nominalAccount')),
      ).toEqual('');
    });

    it('executes provided onDataChange method when changing a field value', async () => {
      await renderStep();

      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_beneficiaryName', true),
          ),
          'name',
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({ beneficiaryName: 'name' }),
      );

      await act(() =>
        userEvent.paste(
          textarea.getInteractiveElement(
            textarea.getByPlaceholderText('T_comments', true),
          ),
          'my comments',
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({ comments: 'my comments' }),
      );
    });

    it('executes the provided onSubmitStep method when submitting the form with valid information', async () => {
      await renderStep();

      const { iban: nominalIban } = accountsResponse[0].accounts[0];

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onSubmitStep).not.toHaveBeenCalled();

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_nominalAccount'),
          )!,
        ),
      );
      await act(() => userEvent.click(screen.getByText(nominalIban)));
      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_collectionAmount'),
          ),
          '1235',
        ),
      );
      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_applicantOffice'),
          ),
          '1234',
        ),
      );
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_collectionType'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(
          screen.getByText(
            `T_collectionTypes.${collectionTypesResponse[0].key}`,
          ),
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onDataChange).toHaveBeenCalledWith({
        clientAccount: accountsResponse[0].accounts[0],
        collectionAmount: '1235.00',
        collectionCurrency: {
          // the default currency, not modified
          currency: 'EUR',
          id: 'EUR',
        },
        commissionAccount: accountsResponse[0].accounts[0],
        hasAccount: true,
        office: '1234',
      });
      expect(defaultProps.onSubmitStep).toHaveBeenCalled();
    });
  });

  describe('Field validation', () => {
    it('does not let the user write more characters than the max set in its fields limitations', async () => {
      await renderStep();

      const longString =
        'this is a very long text to test the limits of the characters written in fields in this step';

      const clientReference = input.getByPlaceholderText(
        'T_clientReference',
        true,
      );
      const beneficiaryBank = input.getByPlaceholderText(
        'T_beneficiaryBank',
        true,
      );
      const beneficiaryName = input.getByPlaceholderText(
        'T_beneficiaryName',
        true,
      );

      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(clientReference),
          longString,
        ),
      );
      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(beneficiaryBank),
          longString,
        ),
      );
      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(beneficiaryName),
          longString,
        ),
      );

      expect(input.getDisplayValue(clientReference)).toEqual(
        longString.substring(0, fieldLimits.clientReference),
      );
      expect(input.getDisplayValue(beneficiaryBank)).toEqual(
        longString.substring(0, fieldLimits.beneficiaryBank),
      );
      expect(input.getDisplayValue(beneficiaryName)).toEqual(
        longString.substring(0, fieldLimits.beneficiaryName),
      );
    });

    it('displays errors in the required fields when they are empty and the form is submitted', async () => {
      await renderStep();

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(select.getByPlaceholderText('T_nominalAccount')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
      expect(select.getByPlaceholderText('T_commissionAccount')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
      expect(
        inputSelect.getByPlaceholderText('T_collectionAmount'),
      ).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
      expect(select.getByPlaceholderText('T_collectionType')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
      expect(input.getByPlaceholderText('T_applicantOffice')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
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

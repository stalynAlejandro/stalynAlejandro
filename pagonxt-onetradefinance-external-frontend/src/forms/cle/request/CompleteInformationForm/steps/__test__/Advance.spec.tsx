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
} from '../../../../../../testUtils/controls';
import { get as riskLinesResponse } from '../../../../../../testUtils/mocks/data/riskLines';
import { get as currenciesResponse } from '../../../../../../testUtils/mocks/data/currencies';
import { formatNumber } from '../../../../../../utils/formatNumber';
import theme from '../../../../../../resources/theme';
import { changeInputValue } from '../../../../../../testUtils/changeInputValue';
import Advance from '../Advance';
import { formatDate } from '../../../../../../utils/dates';

describe('Form Step CLE REQUEST CompleteInformationForm Advance', () => {
  const defaultProps = {
    formData: {
      customer: { personNumber: 'BUC-123456' },
      operationDetails: { collectionAmount: '1234.00' },
    },
    onDataChange: jest.fn(),
    onSubmitStep: jest.fn(),
    onSummarizeFormData: jest.fn(),
  };

  const renderStep = async (props: any = {}) => {
    jest.useFakeTimers();

    await act(() => {
      renderComponent(<Advance {...defaultProps} {...props} />);
    });

    await act(async () => {
      await jest.advanceTimersByTime(800);
    });

    jest.useRealTimers();
  };

  beforeAll(() => {
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
  });

  describe('First load display data', () => {
    it('renders the component successfully', async () => {
      await renderStep();
      expect(screen.getByText('T_indicateAdvanceDetails')).toBeInTheDocument();

      expect(
        inputSelect.input.getDisplayValue(
          inputSelect.input.getByPlaceholderText('T_advanceAmount'),
        ),
      ).toEqual('');
    });

    it('lets you skip the step if no data is provided', async () => {
      await renderStep();
      await act(() => userEvent.click(screen.getByText('T_omit')));
      expect(defaultProps.onDataChange).toHaveBeenCalledWith({});
      expect(defaultProps.onSubmitStep).toHaveBeenCalled();
    });

    it('does not let you skip the step if any data is provided', async () => {
      await renderStep();
      await act(() =>
        userEvent.paste(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_advanceAmount'),
          ),
          '123',
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onSubmitStep).not.toHaveBeenCalledWith();
    });

    it('renders the values provided in formData', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft: any) => {
        immerDraft.formData.advance = {
          advanceAmount: '12345.00',
          advanceCurrency: { currency: 'USD', id: 'USD' },
          advanceExpiration: '2022-11-15T10:29:55.586Z',
          riskLine: riskLinesResponse[0],
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.advance;

      expect(
        inputSelect.input.getDisplayValue(
          inputSelect.input.getByPlaceholderText('T_advanceAmount'),
        ),
      ).toEqual(formatNumber(data.advanceAmount));
      expect(
        inputSelect.select.getDisplayValue(
          inputSelect.select.getByPlaceholderText('T_advanceAmount'),
        ),
      ).toEqual(data.advanceCurrency.currency);
      expect(
        input.getDisplayValue(input.getByPlaceholderText('T_expiration')),
      ).toEqual(formatDate(new Date(data.advanceExpiration)));
      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_riskLine')),
      ).toEqual(data.riskLine.iban);
    });
  });

  describe('First load fetch data', () => {
    it('fetches the risk lines on load and displays them', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft: any) => {
        immerDraft.formData.advance = {
          advanceAmount: '123.00',
          advanceCurrency: { currency: 'USD', id: 'USD' },
          advanceExpiration: '2022-11-15T10:29:55.586Z',
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.advance;

      await waitFor(() => {
        expect(
          fetchMockJest
            .lastCall(/risk-lines/)?.[0]
            .includes(`client=${defaultProps.formData.customer.personNumber}`),
        ).toBeTruthy();
      });

      await waitFor(() => {
        expect(
          fetchMockJest
            .lastCall(/risk-lines/)?.[0]
            .includes(`operation_amount=${data.advanceAmount}`),
        ).toBeTruthy();
      });

      await waitFor(() => {
        expect(
          fetchMockJest
            .lastCall(/risk-lines/)?.[0]
            .includes(`operation_currency=${data.advanceCurrency.currency}`),
        ).toBeTruthy();
      });

      await waitFor(() => {
        expect(
          fetchMockJest.lastCall(/risk-lines/)?.[0].includes(`product_id=CLE`),
        ).toBeTruthy();
      });

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_riskLine'),
          )!,
        ),
      );

      riskLinesResponse.forEach((rl) => {
        expect(screen.getByText(rl.iban)).toBeInTheDocument();
      });
    });

    it('fetches currencies on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/currencies/)?.[0]
          .includes(`product=CLE&event=REQUEST`),
      ).toBeTruthy();

      await act(() =>
        userEvent.click(
          inputSelect.select.getInteractiveElement(
            inputSelect.select.getByPlaceholderText('T_advanceAmount'),
          ),
        ),
      );

      currenciesResponse.forEach((cur) => {
        expect(screen.getAllByText(cur.currency).length).toBeTruthy();
      });
    });
  });

  describe('Interactions, expected behaviours and method executions', () => {
    it('executes provided onDataChange method when changing a field value', async () => {
      await renderStep();

      await act(async () => {
        await userEvent.paste(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_advanceAmount'),
          ),
          '123',
        );
      });
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ advanceAmount: '123.00' }),
      );

      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_expiration'),
          ),
          '12/05/2023',
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          advanceExpiration: '2023-05-12T00:00:00.000Z',
        }),
      );
    });

    it('renders a table showing the risk line data when one is selected', async () => {
      await renderStep();

      expect(screen.queryByTestId('table')).not.toBeInTheDocument();
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_riskLine'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(riskLinesResponse[0].iban)),
      );
      expect(screen.queryByTestId('table')).toBeInTheDocument();
    });

    it('executes the provided onSubmitStep method when submitting the form with valid information', async () => {
      await renderStep();

      await act(() =>
        userEvent.paste(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_advanceAmount'),
          ),
          '123',
        ),
      );
      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(
            input.getByPlaceholderText('T_expiration'),
          ),
          '12/05/2023',
        ),
      );
      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_riskLine'),
          ),
        ),
      );
      await act(() =>
        userEvent.click(screen.getByText(riskLinesResponse[0].iban)),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onDataChange).toHaveBeenCalledWith({});
      expect(defaultProps.onSubmitStep).toHaveBeenCalled();
    });
  });

  describe('Field validation', () => {
    it('does not let the advance amount to be greater than the collection amount', async () => {
      await renderStep();

      await act(() =>
        changeInputValue(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_advanceAmount'),
          ),
          '5000',
        ),
      );

      expect(defaultProps.onDataChange).toHaveBeenCalledWith({});
    });

    it('displays errors in the required fields when they are empty and the form is submitted', async () => {
      await renderStep();

      await act(() =>
        changeInputValue(
          inputSelect.input.getInteractiveElement(
            inputSelect.input.getByPlaceholderText('T_advanceAmount'),
          ),
          '123',
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(select.getByPlaceholderText('T_riskLine')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
      expect(input.getByPlaceholderText('T_expiration')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
    });
  });

  describe('Contextual information and messages', () => {
    it('displays summarized data for previous steps', async () => {
      await renderStep();
      expect(defaultProps.onSummarizeFormData).toHaveBeenCalledWith([
        'customer',
        'operationDetails',
      ]);
    });
  });
});

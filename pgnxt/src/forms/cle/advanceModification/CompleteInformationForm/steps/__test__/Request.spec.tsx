import { screen, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';
import produce from 'immer';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../../../../testUtils/renderComponent';
import { input, select, textarea } from '../../../../../../testUtils/controls';
import Request from '../Request';
import { get as collectionsResponse } from '../../../../../../testUtils/mocks/data/customerCollectionsAdvance';
import { get as riskLinesResponse } from '../../../../../../testUtils/mocks/data/riskLines';
import theme from '../../../../../../resources/theme';
import { changeInputValue } from '../../../../../../testUtils/changeInputValue';
import * as userSelector from '../../../../../../redux/selectors/user';

describe('Form Step CLE ADVANCE MODIFICATION CompleteInformationForm Request', () => {
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

    await waitFor(() => {
      expect(fetchMockJest.lastCall(/risk-lines/)).toBeTruthy();
    });
  };

  beforeEach(() => {
    fetchMockJest.reset();
    fetchMockJest.mock(
      /export-collection-advances/,
      { body: collectionsResponse, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /risk-lines/,
      { body: riskLinesResponse, status: 200 },
      { overwriteRoutes: true },
    );

    jest.spyOn(userSelector, 'getUser').mockImplementation(() => ({} as any));
  });

  describe('First load display data', () => {
    it('renders the component successfully', async () => {
      await renderStep();

      expect(screen.getByText('T_completeOperationData')).toBeInTheDocument();
      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_riskLine')),
      ).toEqual('');
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_requestReference'),
        ),
      ).toEqual('');
    });

    it('displays all fields without errors on load', async () => {
      await renderStep();

      expect(select.getByPlaceholderText('T_riskLine')).not.toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
      expect(select.getByPlaceholderText('T_requestReference')).not.toHaveStyle(
        {
          borderBottomColor: theme.colors.boston,
        },
      );
    });

    it('renders the values provided in formData', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.request = {
          comments: 'My comments',
          exportCollectionAdvance: collectionsResponse[1],
          office: '1234',
          riskLine: riskLinesResponse[0],
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.request;

      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_requestReference'),
        ),
      ).toEqual(data.exportCollectionAdvance.code);

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
    it('fetches the export collections on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/export-collection-advances/)?.[0]
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

    it('fetches risk lines on load and displays them', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.request = {
          comments: 'My comments',
          exportCollectionAdvance: collectionsResponse[1],
          office: '1234',
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.request.exportCollectionAdvance;

      expect(
        fetchMockJest
          .lastCall(/risk-lines/)?.[0]
          .includes(`client=${defaultProps.formData.customer.personNumber}`),
      ).toBeTruthy();
      expect(
        fetchMockJest
          .lastCall(/risk-lines/)?.[0]
          .includes(`operation_amount=${data.amount}`),
      ).toBeTruthy();
      expect(
        fetchMockJest
          .lastCall(/risk-lines/)?.[0]
          .includes(`operation_currency=${data.currency}`),
      ).toBeTruthy();
      expect(
        fetchMockJest.lastCall(/risk-lines/)?.[0].includes(`product_id=CLE`),
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
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({
          exportCollectionAdvance: collectionsResponse[1],
        }),
      );

      await waitFor(() => {
        expect(
          fetchMockJest
            .lastCall(/risk-lines/)?.[0]
            .includes('operation_amount'),
        ).toBeTruthy();
      });

      await act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_riskLine'),
          ),
        ),
      );
      await act(async () =>
        userEvent.click(await screen.findByText(riskLinesResponse[1].iban)),
      );
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({
          riskLine: riskLinesResponse[1],
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
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({ comments: 'my comments' }),
      );
    });

    it('executes the provided onSubmitStep method when submitting the form with valid information', async () => {
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
            select.getByPlaceholderText('T_riskLine'),
          ),
        ),
      );
      await act(async () =>
        userEvent.click(await screen.findByText(riskLinesResponse[1].iban)),
      );

      await act(() =>
        userEvent.paste(
          input.getInteractiveElement(input.getByPlaceholderText('T_office')),
          '1234',
        ),
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
        comments: 'my comments',
        exportCollectionAdvance: collectionsResponse[1],
        office: '1234',
        riskLine: riskLinesResponse[1],
      });
      expect(defaultProps.onSubmitStep).toHaveBeenLastCalledWith();
    });
  });

  describe('Field validation', () => {
    it('displays errors in the required fields when they are empty and the form is submitted', async () => {
      await renderStep();

      await act(() => userEvent.click(screen.getByText('T_continue')));
      expect(select.getByPlaceholderText('T_riskLine')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
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
      expect(defaultProps.onSummarizeFormData).toHaveBeenCalledWith([
        'customer',
      ]);
    });
  });
});

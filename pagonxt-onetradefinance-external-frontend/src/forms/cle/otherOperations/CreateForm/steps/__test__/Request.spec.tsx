import { screen } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';
import produce from 'immer';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../../../../testUtils/renderComponent';
import { input, select, textarea } from '../../../../../../testUtils/controls';
import Request from '../Request';
import { get as collectionsResponse } from '../../../../../../testUtils/mocks/data/customerCollections';
import { get as operationTypesResponse } from '../../../../../../testUtils/mocks/data/operationTypes';
import theme from '../../../../../../resources/theme';
import { changeInputValue } from '../../../../../../testUtils/changeInputValue';
import * as userSelector from '../../../../../../redux/selectors/user';

describe('Form Step CLE OTHER OPERATIONS CreateForm Request', () => {
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
      /export-collections/,
      { body: collectionsResponse, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /operation-types/,
      { body: operationTypesResponse, status: 200 },
      { overwriteRoutes: true },
    );
  });

  beforeEach(() => {
    jest.spyOn(userSelector, 'getUser').mockImplementation(() => ({} as any));
  });

  describe('First load display data', () => {
    it('renders the component successfully', async () => {
      await renderStep();

      expect(screen.getByText('T_completeOperationData')).toBeInTheDocument();
      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_operationType')),
      ).toEqual('');
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_requestReference'),
        ),
      ).toEqual('');
    });

    it('displays all fields without errors on load', async () => {
      await renderStep();

      expect(select.getByPlaceholderText('T_operationType')).not.toHaveStyle({
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
          exportCollection: collectionsResponse[1],
          office: '1234',
          operationType: operationTypesResponse[1].key,
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.request;

      expect(
        select.getDisplayValue(select.getByPlaceholderText('T_operationType')),
      ).toEqual(`T_operationTypes.${data.operationType}`);
      expect(
        select.getDisplayValue(
          select.getByPlaceholderText('T_requestReference'),
        ),
      ).toEqual(data.exportCollection.code);
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
          .lastCall(/export-collections/)?.[0]
          .includes(`customer=${defaultProps.formData.customer.personNumber}`),
      ).toBeTruthy();

      act(() =>
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

    it('fetches operation types on load and displays them', async () => {
      await renderStep();

      expect(
        fetchMockJest
          .lastCall(/operation-types/)?.[0]
          .includes(`product_id=CLE`),
      ).toBeTruthy();

      act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_operationType'),
          )!,
        ),
      );

      operationTypesResponse.forEach((op) => {
        expect(
          screen.queryByText(`T_operationTypes.${op.key}`),
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
        input.getInteractiveElement(input.getByPlaceholderText('T_office')),
      ).toHaveAttribute('readonly');
    });

    it('executes provided onDataChange method when changing a field value', async () => {
      await renderStep();

      act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_operationType'),
          ),
        ),
      );
      act(() =>
        userEvent.click(
          screen.getByText(`T_operationTypes.${operationTypesResponse[1].key}`),
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({
          operationType: operationTypesResponse[1].key,
        }),
      );

      act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_requestReference'),
          ),
        ),
      );
      act(() => userEvent.click(screen.getByText(collectionsResponse[1].code)));
      expect(defaultProps.onDataChange).toHaveBeenCalledWith(
        expect.objectContaining({
          exportCollection: collectionsResponse[1],
        }),
      );

      act(() =>
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

      act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onSubmitStep).not.toHaveBeenCalled();

      act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_operationType'),
          ),
        ),
      );
      act(() =>
        userEvent.click(
          screen.getByText(`T_operationTypes.${operationTypesResponse[1].key}`),
        ),
      );

      act(() =>
        userEvent.click(
          select.getInteractiveElement(
            select.getByPlaceholderText('T_requestReference'),
          ),
        ),
      );
      act(() => userEvent.click(screen.getByText(collectionsResponse[1].code)));

      act(() =>
        userEvent.paste(
          input.getInteractiveElement(input.getByPlaceholderText('T_office')),
          '1234',
        ),
      );

      act(() =>
        userEvent.paste(
          textarea.getInteractiveElement(
            textarea.getByPlaceholderText('T_comments', true),
          ),
          'my comments',
        ),
      );

      act(() => userEvent.click(screen.getByText('T_continue')));
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith({
        comments: 'my comments',
        exportCollection: collectionsResponse[1],
        office: '1234',
        operationType: operationTypesResponse[1].key,
      });
      expect(defaultProps.onSubmitStep).toHaveBeenLastCalledWith();
    });
  });

  describe('Field validation', () => {
    it('displays errors in the required fields when they are empty and the form is submitted', async () => {
      await renderStep();

      act(() => userEvent.click(screen.getByText('T_continue')));
      expect(select.getByPlaceholderText('T_operationType')).toHaveStyle({
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

      act(() =>
        changeInputValue(
          input.getInteractiveElement(input.getByPlaceholderText('T_office')),
          '123',
        ),
      );

      act(() => userEvent.click(screen.getByText('T_continue')));
      expect(input.getByPlaceholderText('T_office')).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });

      act(() =>
        changeInputValue(
          input.getInteractiveElement(input.getByPlaceholderText('T_office')),
          '1234',
        ),
      );

      act(() => userEvent.click(screen.getByText('T_continue')));
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

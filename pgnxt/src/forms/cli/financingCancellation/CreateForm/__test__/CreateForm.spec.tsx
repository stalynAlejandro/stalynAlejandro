import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import fetchMockJest from 'fetch-mock-jest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { renderComponentWithToast } from '../../../../../testUtils/renderComponent';
import { get as accountsResponse } from '../../../../../testUtils/mocks/data/accounts';
import { get as currenciesResponse } from '../../../../../testUtils/mocks/data/currencies';
import { get as financingRequestsResponse } from '../../../../../testUtils/mocks/data/customerFinancingRequests';
import CreateForm from '../CreateForm';
import { formData } from '../../../../../testUtils/mocks/data/cli/financingCancellation/formData';
import { get as submitResponse } from '../../../../../testUtils/mocks/data/cli/financingCancellation/completeInformation';
import Navigation from '../../../../../constants/navigation';
import ApiUrls from '../../../../../constants/apiUrls';

const mockedUsedNavigate = jest.fn();
const mockedUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockedUseParams(),
}));

describe('Form CLI FINANCING CANCELLATION CreateForm', () => {
  const renderForm = async (props: any = {}) => {
    jest.useFakeTimers();

    renderComponentWithToast(
      <BrowserRouter>
        <CreateForm {...props} />
      </BrowserRouter>,
    );

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    jest.useRealTimers();
  };

  beforeEach(() => {
    mockedUseParams.mockReturnValue({});
    fetchMockJest.mockClear();
    fetchMockJest.mock(
      ApiUrls.cli.financingCancellation.create.confirm,
      {
        body: { ...submitResponse, entity: submitResponse.entity.request },
        status: 200,
      },
      {
        delay: 200,
        overwriteRoutes: true,
      },
    );
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

  it('renders the form successfully with first step by default', async () => {
    await renderForm();

    expect(screen.getByText('T_T_title')).toBeInTheDocument();
    expect(screen.getByText('T_discard')).toBeInTheDocument();
    expect(screen.getByTestId('form-wizard-progress-bar')).toBeInTheDocument();
    expect(screen.getByTestId('form-wizard-footer-steps')).toBeInTheDocument();

    expect(screen.getByText('T_selectAClient')).toBeInTheDocument();
    expect(screen.getByTestId('form-wizard-footer')).toBeInTheDocument();
  });

  it('changes the step successfully and renders the corresponding step', async () => {
    await renderForm({
      initialFormData: formData,
      initialStep: 1,
    });

    expect(
      screen.getByText('T_completeClientAndOperationData', {
        selector: '.stepTitle__title',
      }),
    ).toBeInTheDocument();

    await act(() => {
      userEvent.click(screen.getByText('T_continue'));
    });

    expect(
      screen.getByText('T_attachDocumentationAndPriority', {
        selector: '.stepTitle__title',
      }),
    ).toBeInTheDocument();
  });

  it('does not let to go to previous step if it is the second step', async () => {
    await renderForm({ initialStep: 1 });

    expect(
      screen.queryByText('T_back', {
        selector: '[data-testid="text-button"] span',
      }),
    ).not.toBeInTheDocument();
  });

  it('hides the progress bar in the Confirm step', async () => {
    await renderForm({ initialFormData: formData, initialStep: 3 });

    expect(
      screen.queryByTestId('form-wizard-progress-bar'),
    ).not.toBeInTheDocument();
  });

  it('displays final buttons and not form progress in the footer at the last step', async () => {
    await renderForm({ initialFormData: formData, initialStep: 3 });

    expect(
      screen.queryByTestId('form-wizard-footer-steps'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('form-wizard-footer-buttons'),
    ).toBeInTheDocument();
    expect(screen.getByText('T_cancel')).toBeInTheDocument();
    expect(screen.getByText('T_confirm')).toBeInTheDocument();
  });

  it('displays a loader when form is being submitted', async () => {
    await renderForm({ initialFormData: formData, initialStep: 3 });
    await act(() => userEvent.click(screen.getByText('T_confirm')));

    expect(await screen.findByTestId('loader-container')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });
  });

  it('shows a confirmation message when the Close button is pressed', async () => {
    await renderForm();

    await act(() => userEvent.click(screen.getByText('T_discard')));

    expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    expect(
      screen.getByText('T_discardCollectionPromptMessage'),
    ).toBeInTheDocument();
  });

  it('navigates to New Requests page when confirming Close dialog', async () => {
    await renderForm();

    await act(() => userEvent.click(screen.getByText('T_discard')));

    expect(await screen.findByText('T_confirm')).toBeInTheDocument();
    await act(() => userEvent.click(screen.getByText('T_confirm')));

    expect(mockedUsedNavigate).toHaveBeenLastCalledWith(
      Navigation.newRequests,
      expect.anything(),
    );
  });

  describe('Operation notifications', () => {
    it('displays a success message when the Submit operation succeeds and returns to New Requests page', async () => {
      await renderForm({ initialFormData: formData, initialStep: 3 });
      await act(() => userEvent.click(screen.getByText('T_confirm')));

      expect(
        await screen.findByText('T_title', {
          selector: '.Toastify h2',
        }),
      ).toBeInTheDocument();
      expect(
        await screen.findByText('T_notifications.requestCreatedSuccessfully', {
          selector: '.Toastify h2',
        }),
      ).toBeInTheDocument();

      expect(mockedUsedNavigate).toHaveBeenLastCalledWith(
        Navigation.newRequests,
        expect.anything(),
      );
    });

    it('displays an error message when the Submit operation fails', async () => {
      fetchMockJest.once(
        ApiUrls.cli.financingCancellation.create.confirm,
        { body: submitResponse, status: 500 },
        {
          delay: 0,
          overwriteRoutes: true,
        },
      );

      await renderForm({ initialFormData: formData, initialStep: 3 });
      await act(() => userEvent.click(screen.getByText('T_confirm')));

      expect(await screen.findByText('T_errorOcurred')).toBeInTheDocument();
    });
  });
});

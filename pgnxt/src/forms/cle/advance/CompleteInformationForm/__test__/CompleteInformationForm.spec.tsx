import { screen, waitFor, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import fetchMockJest from 'fetch-mock-jest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { renderComponentWithToast } from '../../../../../testUtils/renderComponent';
import { get as exchangeInsurances } from '../../../../../testUtils/mocks/data/exchangeInsurances';
import { get as currenciesResponse } from '../../../../../testUtils/mocks/data/currencies';
import { get as collectionsResponse } from '../../../../../testUtils/mocks/data/customerCollections';
import { get as riskLinesResponse } from '../../../../../testUtils/mocks/data/riskLines';
import CompleteInformationForm from '../CompleteInformationForm';
import { formData } from '../../../../../testUtils/mocks/data/cle/advance/formData';
import { get as completeInfoResponse } from '../../../../../testUtils/mocks/data/cle/advance/completeInformation';
import Navigation from '../../../../../constants/navigation';
import ApiUrls from '../../../../../constants/apiUrls';
import { formatNumber } from '../../../../../utils/formatNumber';
import { formatDate } from '../../../../../utils/dates';

const mockedUsedNavigate = jest.fn();
const mockedUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockedUseParams(),
}));

describe('Form CLE REQUEST CompleteInformationForm', () => {
  const taskId = 'TSK-123456789';
  const getUrl = `${ApiUrls.cle.advance.completeInformation.get(taskId, true)}`;

  const renderForm = async (props: any = {}) => {
    renderComponentWithToast(
      <BrowserRouter>
        <CompleteInformationForm {...props} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(fetchMockJest.calls(getUrl)).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });
  };

  beforeEach(() => {
    fetchMockJest.mockClear();
    mockedUseParams.mockReturnValue({
      taskId,
    });

    fetchMockJest.mock(
      getUrl,
      {
        body: completeInfoResponse,
        status: 200,
      },
      {
        delay: 0,
        overwriteRoutes: true,
      },
    );
    fetchMockJest.mock(
      ApiUrls.cle.advance.completeInformation.complete(taskId),
      {
        body: {
          ...completeInfoResponse,
          entity: completeInfoResponse.entity.request,
        },
        status: 200,
      },
      {
        delay: 200,
        overwriteRoutes: true,
      },
    );
    fetchMockJest.mock(
      /export-collections/,
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
      /risk-lines/,
      { body: riskLinesResponse, status: 200 },
      { overwriteRoutes: true },
    );
  });

  it('renders the form successfully with last step by default', async () => {
    await renderForm();

    expect(screen.getByText('T_T_title')).toBeInTheDocument();
    expect(screen.getByText('T_discard')).toBeInTheDocument();
    expect(
      screen.queryByTestId('form-wizard-progress-bar'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('form-wizard-footer-steps'),
    ).not.toBeInTheDocument();

    expect(screen.getByText('T_pleaseVerifyData')).toBeInTheDocument();
    expect(screen.getByTestId('form-wizard-footer')).toBeInTheDocument();
  });

  it('fetches and loads the data of the request successfully', async () => {
    await renderForm();
    expect(fetchMockJest.lastCall(getUrl)).toBeTruthy();

    const data = completeInfoResponse.entity.request;

    expect(
      screen.getByText(data.request.exportCollection.code),
    ).toBeInTheDocument();
    expect(
      screen.getByText(data.request.exportCollection.contractReference),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${formatNumber(data.request.exportCollection.amount)} ${
          data.request.exportCollection.currency
        }`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        formatDate(new Date(data.request.exportCollection.creationDate)),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${formatNumber(data.request.advanceAmount)} ${
          data.request.advanceCurrency.currency
        }`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(new Date(data.request.requestExpiration))),
    ).toBeInTheDocument();
    expect(screen.getByText(data.request.riskLine.iban)).toBeInTheDocument();
    expect(screen.getByText(data.request.office)).toBeInTheDocument();
    expect(screen.getByText(data.request.comments)).toBeInTheDocument();
  });

  it('changes the step successfully and renders the corresponding step', async () => {
    await renderForm();

    await act(() => {
      userEvent.click(screen.getAllByText('T_edit')[0]);
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
    await renderForm();

    await act(() => {
      // 2nd step, as 1st step does not have Edit button: [x, 0, 1...]
      userEvent.click(screen.getAllByText('T_edit')[0]);
    });

    expect(
      screen.queryByText('T_back', {
        selector: '[data-testid="text-button"] span',
      }),
    ).not.toBeInTheDocument();
  });

  it('hides the progress bar in the Confirm step', async () => {
    await renderForm();

    expect(
      screen.queryByTestId('form-wizard-progress-bar'),
    ).not.toBeInTheDocument();
  });

  it('does not display the "Save draft" button', async () => {
    await renderForm({ initialFormData: formData, initialStep: 1 });

    await act(() => {
      // 2nd step, as 1st step does not have Edit button: [x, 0, 1...]
      userEvent.click(screen.getAllByText('T_edit')[0]);
    });

    expect(screen.queryByText('T_saveForLater')).not.toBeInTheDocument();

    await act(() => {
      // Should go for 3rd step
      userEvent.click(screen.getByText('T_continue'));
    });

    expect(screen.queryByText('T_saveForLater')).not.toBeInTheDocument();
  });

  it('displays final buttons and not form progress in the footer at the Confirm step', async () => {
    await renderForm();

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
    await renderForm();
    act(() => userEvent.click(screen.getByText('T_confirm')));

    expect(await screen.findByTestId('loader-container')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });
  });

  it('shows a confirmation message when the Close button is pressed', async () => {
    await renderForm();

    act(() => userEvent.click(screen.getByText('T_discard')));

    expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    expect(
      screen.getByText('T_discardCollectionPromptMessage'),
    ).toBeInTheDocument();
  });

  it('navigates to Pending Tasks page when confirming Close dialog', async () => {
    await renderForm();

    act(() => userEvent.click(screen.getByText('T_discard')));

    const { getByText } = within(await screen.findByTestId('modal-container'));
    expect(getByText('T_confirm')).toBeInTheDocument();
    act(() => userEvent.click(getByText('T_confirm')));

    expect(mockedUsedNavigate).toHaveBeenLastCalledWith(
      Navigation.pendingTasks,
      expect.anything(),
    );
  });

  describe('Operation notifications', () => {
    it('displays a success message when the Submit operation succeeds and returns to New Requests page', async () => {
      await renderForm();
      act(() => userEvent.click(screen.getByText('T_confirm')));

      expect(await screen.findByText('T_title')).toBeInTheDocument();
      expect(
        await screen.findByText('T_requestCreatedSuccessfully'),
      ).toBeInTheDocument();

      expect(mockedUsedNavigate).toHaveBeenLastCalledWith(
        Navigation.pendingTasks,
        expect.anything(),
      );
    });

    it('displays an error message when the Submit operation fails', async () => {
      fetchMockJest.mock(
        ApiUrls.cle.advance.completeInformation.complete(taskId),
        {
          body: {
            ...completeInfoResponse,
            entity: completeInfoResponse.entity.request,
          },
          status: 500,
        },
        {
          delay: 200,
          overwriteRoutes: true,
        },
      );

      await renderForm();
      act(() => userEvent.click(screen.getByText('T_confirm')));

      expect(await screen.findByText('T_errorOcurred')).toBeInTheDocument();
    });

    it('displays an error message when initial data fetch fails', async () => {
      fetchMockJest.mock(
        getUrl,
        {
          body: completeInfoResponse,
          status: 500,
        },
        {
          delay: 0,
          overwriteRoutes: true,
        },
      );

      await renderForm();

      expect(
        await screen.findByText('T_errors.requests.noDataAvailable'),
      ).toBeInTheDocument();
    });

    it('displays a warning message if response comes with type warning', async () => {
      const warningKey = 'warningKey';
      fetchMockJest.mock(
        getUrl,
        {
          body: { ...completeInfoResponse, key: warningKey, type: 'warning' },
          status: 204,
        },
        {
          delay: 0,
          overwriteRoutes: true,
        },
      );

      await renderForm();
      expect(
        await screen.findByText(`T_warnings.completeInformation.${warningKey}`),
      ).toBeInTheDocument();
    });
  });
});

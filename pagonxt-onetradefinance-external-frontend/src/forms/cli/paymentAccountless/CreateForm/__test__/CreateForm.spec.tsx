import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import fetchMockJest from 'fetch-mock-jest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { renderComponentWithToast } from '../../../../../testUtils/renderComponent';
import { get as collectionsResponse } from '../../../../../testUtils/mocks/data/customerCollections';
import { get as currenciesResponse } from '../../../../../testUtils/mocks/data/currencies';
import CreateForm from '../CreateForm';
import { formData } from '../../../../../testUtils/mocks/data/cli/paymentAccountless/formData';
import { get as submitResponse } from '../../../../../testUtils/mocks/data/cli/paymentAccountless/completeInformation';
import Navigation from '../../../../../constants/navigation';
import ApiUrls from '../../../../../constants/apiUrls';
import { radioButton } from '../../../../../testUtils/controls';

const mockedUsedNavigate = jest.fn();
const mockedUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockedUseParams(),
}));

describe('Form CLI PAYMENT ACCOUNTLESS CreateForm', () => {
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
      ApiUrls.cli.paymentAccountless.create.confirm,
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
      ApiUrls.cli.paymentAccountless.create.saveDraft,
      {
        body: { ...submitResponse, entity: submitResponse.entity.request },
        status: 200,
      },
      {
        delay: 100,
        overwriteRoutes: true,
      },
    );
    fetchMockJest.mock(
      /import-collections/,
      { body: collectionsResponse, status: 200 },
      { overwriteRoutes: true },
    );
    fetchMockJest.mock(
      /currencies/,
      { body: currenciesResponse, status: 200 },
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
      screen.getByText('T_completeOperationData', {
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

  it('displays the "Save draft" button from the 3rd step onwards', async () => {
    await renderForm({ initialFormData: formData, initialStep: 1 });

    expect(screen.queryByText('T_saveForLater')).not.toBeInTheDocument();

    await act(() => {
      userEvent.click(screen.getByText('T_continue'));
    });

    expect(screen.queryByText('T_saveForLater')).toBeInTheDocument();
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

  it('displays a loader when draft is being saved', async () => {
    await renderForm({ initialFormData: formData, initialStep: 2 });
    await act(() => userEvent.click(screen.getByText('T_saveForLater')));

    expect(await screen.findByTestId('loader-container')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });
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
        await screen.findByText('T_notifications.requestCreatedSuccessfully', {
          selector: '.Toastify h2',
        }),
      ).toBeInTheDocument();
      expect(
        await screen.findByText('T_title', { selector: '.Toastify h2' }),
      ).toBeInTheDocument();

      expect(mockedUsedNavigate).toHaveBeenLastCalledWith(
        Navigation.newRequests,
        expect.anything(),
      );
    });

    it('displays a success message when the Save draft operation succeeds and returns to New Requests page', async () => {
      await renderForm({ initialFormData: formData, initialStep: 2 });
      await act(() => userEvent.click(screen.getByText('T_saveForLater')));

      expect(await screen.findByText('T_title')).toBeInTheDocument();
      expect(
        await screen.findByText('T_draftSavedSuccessfully'),
      ).toBeInTheDocument();

      expect(mockedUsedNavigate).toHaveBeenLastCalledWith(
        Navigation.newRequests,
        expect.anything(),
      );
    });

    it('displays an error message when the Submit operation fails', async () => {
      fetchMockJest.once(
        ApiUrls.cli.paymentAccountless.create.confirm,
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

    it('displays an error message when the Save draft operation fails', async () => {
      fetchMockJest.once(
        ApiUrls.cli.paymentAccountless.create.saveDraft,
        { body: submitResponse, status: 500 },
        {
          delay: 0,
          overwriteRoutes: true,
        },
      );

      await renderForm({ initialFormData: formData, initialStep: 2 });
      await act(() => userEvent.click(screen.getByText('T_saveForLater')));

      expect(await screen.findByText('T_errorOcurred')).toBeInTheDocument();
    });
  });

  describe('Draft data operations', () => {
    const collectionRef = 'CLI-33';
    const url = ApiUrls.cli.paymentAccountless.create.get(collectionRef);

    beforeEach(() => {
      mockedUseParams.mockReturnValue({
        collectionRef,
      });

      fetchMockJest.mock(
        url,
        {
          body: { ...submitResponse, entity: submitResponse.entity.request },
          status: 200,
        },
        {
          delay: 0,
          overwriteRoutes: true,
        },
      );
    });

    it('fetches for draft data if collectionRef query param is present in the URL', async () => {
      await renderForm();
      await waitFor(() => {
        expect(fetchMockJest.lastCall(url)).toBeTruthy();
      });
    });

    it('updates the files IDs, request code and other data with updated draft save response data', async () => {
      mockedUseParams.mockReturnValue({});
      await renderForm({ initialFormData: formData, initialStep: 2 });

      await act(() => userEvent.click(screen.getByText('T_saveForLater')));
      await waitFor(() =>
        expect(
          fetchMockJest.lastCall(
            ApiUrls.cli.paymentAccountless.create.saveDraft,
          ),
        ).toBeTruthy(),
      );

      await waitFor(() => {
        expect(
          screen.queryByTestId('loader-container'),
        ).not.toBeInTheDocument();
      });

      // Trigger the save draft again: data sent now must have updated values from last response
      await act(() => {
        userEvent.click(screen.getByText('T_saveForLater'));
      });

      const requestBody = JSON.parse(
        fetchMockJest.lastCall(
          ApiUrls.cli.paymentAccountless.create.saveDraft,
        )?.[1]?.body as string,
      );
      expect(requestBody.code).toEqual(submitResponse.entity.request.code);
      expect(requestBody.documentation.files).toEqual(
        submitResponse.entity.request.documentation.files.map((f) => ({
          ...f,
          data: undefined,
        })),
      );
    });

    it('loads the draft data successfully', async () => {
      await renderForm();

      // savedStep from mock is 3, so it is Documentation step
      expect(
        await screen.findByText('T_attachDocumentationAndPriority'),
      ).toBeInTheDocument();

      const stepData = submitResponse.entity.request.documentation;

      // Check it loads the information coming in the response
      stepData.files.forEach((f) => {
        expect(screen.getByText(f.name)).toBeInTheDocument();
      });

      expect(
        radioButton.getDisplayValue(
          radioButton.getByLabel(`T_${stepData.priority}`),
        ),
      ).toBeTruthy();
    });
  });
});

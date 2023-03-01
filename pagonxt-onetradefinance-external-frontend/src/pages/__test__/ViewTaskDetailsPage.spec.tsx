import { screen, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { BrowserRouter } from 'react-router-dom';

import { get as taskResponse } from '../../testUtils/mocks/data/cle/request/completeInformation';
import { renderComponent } from '../../testUtils/renderComponent';
import { ViewTaskDetailsPage } from '../ViewTaskDetailsPage';

const mockedUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => mockedUseParams(),
}));

describe('Page ViewTaskDetailsPage', () => {
  const renderPage = async (product: string, event: string, ref: string) => {
    mockedUseParams.mockReturnValue({
      event,
      product,
      taskRef: ref,
    });

    fetchMockJest.mock(
      '*',
      { body: taskResponse, status: 200 },
      {
        overwriteRoutes: true,
      },
    );

    renderComponent(
      <BrowserRouter>
        <ViewTaskDetailsPage />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });
  };

  it('renders the page successfully', async () => {
    await renderPage('cle', 'request', taskResponse.entity.request.code);

    expect(screen.getByText('T_requestDetails')).toBeInTheDocument();
    expect(
      screen.getByText(`T_requestRef ${taskResponse.entity.request.code}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(taskResponse.entity.request.customer.name),
    ).toBeInTheDocument();
  });

  it('does not show the back button', async () => {
    await renderPage('cle', 'request', taskResponse.entity.request.code);
    expect(screen.queryByText('T_back')).not.toBeInTheDocument();
  });

  it('displays it in mode "task" showing the action buttons', async () => {
    await renderPage('cle', 'request', taskResponse.entity.request.code);

    expect(
      screen.getByText('T_completeInformation', { selector: 'button' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('T_requestCancellation', { selector: 'button' }),
    ).toBeInTheDocument();
  });
});

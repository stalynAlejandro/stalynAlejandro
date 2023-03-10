import { screen, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import * as routerDom from 'react-router-dom';

import { get as requestResponse } from '../../testUtils/mocks/data/cle/request/completeInformation';
import { renderComponent } from '../../testUtils/renderComponent';
import { ViewRequestDetailsPage } from '../ViewRequestDetailsPage';

const mockedUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => mockedUseParams(),
}));

describe('Page ViewRequestDetailsPage', () => {
  const renderPage = async (product: string, event: string, ref: string) => {
    mockedUseParams.mockReturnValue({
      event,
      product,
      taskRef: ref,
    });

    fetchMockJest.mock(
      '*',
      { body: requestResponse, status: 200 },
      {
        overwriteRoutes: true,
      },
    );

    renderComponent(
      <routerDom.BrowserRouter>
        <ViewRequestDetailsPage />
      </routerDom.BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });
  };

  it('renders the page successfully', async () => {
    await renderPage('cle', 'request', requestResponse.entity.request.code);

    expect(screen.getByText('T_requestDetails')).toBeInTheDocument();
    expect(
      screen.getByText(`T_requestRef ${requestResponse.entity.request.code}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(requestResponse.entity.request.customer.name),
    ).toBeInTheDocument();
  });

  it('does not show the back button', async () => {
    await renderPage('cle', 'request', requestResponse.entity.request.code);
    expect(screen.queryByText('T_back')).not.toBeInTheDocument();
  });

  it('displays it in mode "request" not showing the action buttons', async () => {
    await renderPage('cle', 'request', requestResponse.entity.request.code);

    expect(
      screen.queryByText('T_completeInformation', { selector: 'button' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('T_requestCancellation', { selector: 'button' }),
    ).not.toBeInTheDocument();
  });
});

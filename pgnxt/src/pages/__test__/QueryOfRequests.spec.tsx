import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import ApiUrls from '../../constants/apiUrls';
import Navigation from '../../constants/navigation';
import { EventTypes } from '../../enums/eventTypes';
import { ProductTypes } from '../../enums/productTypes';
import statusTypes from '../../enums/statusTypes';
import { changeInputValue } from '../../testUtils/changeInputValue';
import { apiFilters } from '../../testUtils/mocks/data/requestsApiFilters';
import { get as detailsResponse } from '../../testUtils/mocks/data/cle/request/completeInformation';
import { get as requestsResponse } from '../../testUtils/mocks/data/queryOfRequests';
import { renderComponent } from '../../testUtils/renderComponent';
import { getOperationApiUrl } from '../../utils/getOperationApiUrl';
import { QueryOfRequests } from '../QueryOfRequests';

describe('Page QueryOfRequests', () => {
  let requestsFetch: any;
  let detailsFetch: any;
  let filtersFetch: any;

  const renderPage = async () => {
    renderComponent(
      <BrowserRouter>
        <QueryOfRequests />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(requestsResponse.data[0].operationId),
      ).toBeInTheDocument();
    });
  };

  const mockRequestsFetch = () => {
    requestsFetch = fetchMockJest.mock(
      ApiUrls.myRequests,
      { body: requestsResponse, status: 200 },
      {
        overwriteRoutes: true,
      },
    );
  };

  const mockFiltersFetch = () => {
    filtersFetch = fetchMockJest.mock(
      new RegExp(ApiUrls.myRequestsFilters),
      { body: apiFilters, status: 200 },
      {
        overwriteRoutes: true,
      },
    );
  };

  const mockDetailsFetch = (
    product: ProductTypes,
    event: EventTypes,
    ref: string,
  ) => {
    detailsFetch = fetchMockJest.mock(
      getOperationApiUrl(product, event, 'details')?.(ref),
      { body: detailsResponse, status: 200 },
      {
        overwriteRoutes: true,
      },
    );
  };

  beforeEach(() => {
    fetchMockJest.reset();
    mockRequestsFetch();
    mockFiltersFetch();
  });

  it('renders page successfully', async () => {
    await renderPage();
    expect(
      screen.getByText('T_queryOfRequests', { selector: '.pageTitle__title' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('query-of-requests')).toBeInTheDocument();
  });

  it('displays the right columns in the table', async () => {
    await renderPage();

    const labels = [
      'requestRef',
      'contractRef',
      'reqDate',
      'office',
      'product',
      'event',
      'resolution',
      'client',
      'filterKeys.requesterName',
    ];

    labels.forEach((label) => {
      expect(
        screen.getByText(`T_${label}`, { selector: 'th h3 div' }),
      ).toBeInTheDocument();
    });
  });

  it('fetches for requests on load', async () => {
    await renderPage();
    expect(requestsFetch.calls(/my-requests\\?/)).not.toHaveLength(0);
  });

  it('fetches for filters on load', async () => {
    await renderPage();
    expect(filtersFetch.calls(/my-requests\\?/)).not.toHaveLength(0);
  });

  it('displays the correct actions for each row', async () => {
    await renderPage();

    // eslint-disable-next-line no-restricted-syntax
    for (const row of requestsResponse.data) {
      const { getByTestId, getByText } = within(
        screen.getByTestId(`table-row-${row.rowId}`),
      );

      // eslint-disable-next-line no-await-in-loop
      await act(() => {
        userEvent.click(getByTestId('table-row-action-toggle'));
      });

      const expectedText =
        row.status === statusTypes.DRAFT ? 'T_continue' : 'T_consult';

      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => {
        expect(getByText(expectedText)).toBeInTheDocument();
      });
    }
  });

  it('navigates to Continue form when request is a draft and the action Continue is clicked', async () => {
    await renderPage();
    const operationId = 'CLE-9';

    const rowData = requestsResponse.data.find(
      (r) => r.operationId === operationId,
    );
    const { getByTestId, getByText } = within(
      screen.getByTestId(`table-row-${rowData?.rowId}`),
    );

    await act(() => {
      userEvent.click(getByTestId('table-row-action-toggle'));
    });

    await act(() => {
      userEvent.click(getByText('T_continue'));
    });

    expect(window.location.href).toEqual(
      `http://localhost${Navigation.forms.cle.request.create}/${operationId}`,
    );
  });

  it('opens the details page of the selected request and adds a hidden class to the table container', async () => {
    mockDetailsFetch('CLE', 'REQUEST', 'CLE-79');
    await renderPage();

    const rowData = requestsResponse.data.find(
      (r) => r.operationId === 'CLE-79',
    );
    const { getByTestId, getByText } = within(
      screen.getByTestId(`table-row-${rowData?.rowId}`),
    );

    await act(() => {
      userEvent.click(getByTestId('table-row-action-toggle'));
    });

    await act(() => {
      userEvent.click(getByText('T_consult'));
    });

    expect(screen.getByTestId('query-of-requests')).toHaveClass(
      'hiddenComponent',
    );
    expect(screen.getByText('T_requestDetails')).toBeInTheDocument();
    expect(detailsFetch.lastCall(/details/)[0].includes('CLE-79')).toBeTruthy();
  });

  it('closes the details page of the selected request when pressing Back', async () => {
    mockDetailsFetch('CLE', 'REQUEST', 'CLE-79');
    await renderPage();

    const rowData = requestsResponse.data.find(
      (r) => r.operationId === 'CLE-79',
    );
    const { getByTestId, getByText } = within(
      screen.getByTestId(`table-row-${rowData?.rowId}`),
    );

    await act(() => {
      userEvent.click(getByTestId('table-row-action-toggle'));
    });

    await act(() => {
      userEvent.click(getByText('T_consult'));
    });

    expect(screen.getByText('T_requestDetails')).toBeInTheDocument();
    expect(screen.getByTestId('query-of-requests')).toHaveClass(
      'hiddenComponent',
    );

    await act(async () => {
      userEvent.click(await screen.findByText('T_back'));
    });

    expect(screen.queryByText('T_requestDetails')).not.toBeInTheDocument();
    expect(screen.getByTestId('query-of-requests')).not.toHaveClass(
      'hiddenComponent',
    );
  });

  it('refetches for requests when filters applied change', async () => {
    jest.useFakeTimers();
    await renderPage();

    const input = screen.getByTestId('search-by-input-input');

    await act(async () => {
      changeInputValue(input, 'test');
      jest.advanceTimersByTime(750);
    });

    const requestBody = JSON.parse(
      requestsFetch.lastCall(/my-requests/)[1].body,
    );
    expect(requestBody.filters.code.value).toEqual('test');
    jest.useRealTimers();
  });

  it('refetches for requests when table pagination settings change', async () => {
    await renderPage();

    await act(async () => {
      userEvent.click(
        screen.getByText(`T_requestRef`, { selector: 'th h3 div' }),
      );
    });

    const requestBody = JSON.parse(
      requestsFetch.lastCall(/my-requests/)[1].body,
    );
    expect(requestBody.sortField).toEqual('operationId');
    expect(requestBody.sortOrder).toEqual(1);
  });

  it('navigates to Continue if is a draft and the action continue is clicked', async () => {
    await renderPage();
    const operationId = 'CLI-79';

    const rowData = requestsResponse.data.find(
      (r) => r.operationId === operationId,
    );
    const { getByTestId, getByText } = within(
      screen.getByTestId(`table-row-${rowData?.rowId}`),
    );

    await act(() => {
      userEvent.click(getByTestId('table-row-action-toggle'));
    });

    await act(() => {
      userEvent.click(getByText('T_continue'));
    });

    expect(window.location.href).toEqual(
      `http://localhost${Navigation.forms.cli.request.create}/${operationId}`,
    );
  });

  it('opens the detail page of the selected CLI request when consult is pressed', async () => {
    mockDetailsFetch('CLI', 'MODIFICATION', 'CLI-MOD-1');
    await renderPage();

    const { getByTestId, getByText } = within(
      screen.getByTestId(`table-row-row-cli-mod-1`),
    );

    await act(() => {
      userEvent.click(getByTestId('table-row-action-toggle'));
    });

    await act(() => {
      userEvent.click(getByText('T_consult'));
    });

    expect(screen.getByText('CLI-MOD-1')).toBeInTheDocument();
    expect(screen.getByText('T_requestDetails')).toBeInTheDocument();
  });
});

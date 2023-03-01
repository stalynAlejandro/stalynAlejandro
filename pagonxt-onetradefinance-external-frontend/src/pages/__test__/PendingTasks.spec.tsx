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
import { apiFilters } from '../../testUtils/mocks/data/pendingTasksApiFilters';
import { get as detailsResponse } from '../../testUtils/mocks/data/cle/request/completeInformation';
import { get as tasksResponse } from '../../testUtils/mocks/data/pendingTasks';
import { renderComponent } from '../../testUtils/renderComponent';
import { getOperationApiUrl } from '../../utils/getOperationApiUrl';
import { PendingTasks } from '../PendingTasks';

describe('Page PendingTasks', () => {
  let tasksFetch: any;
  let detailsFetch: any;
  let filtersFetch: any;

  const renderPage = async () => {
    renderComponent(
      <BrowserRouter>
        <PendingTasks />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(tasksResponse.data[0].operationId),
      ).toBeInTheDocument();
    });
  };

  const mockTasksFetch = () => {
    tasksFetch = fetchMockJest.mock(
      new RegExp(`${ApiUrls.pendingTasks}\\?`),
      { body: tasksResponse, status: 200 },
      {
        overwriteRoutes: true,
      },
    );
  };

  const mockFiltersFetch = () => {
    filtersFetch = fetchMockJest.mock(
      new RegExp(`${ApiUrls.pendingTasksFilters}\\?`),
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
      getOperationApiUrl(product, event, 'completeInformation')?.get(ref),
      { body: detailsResponse, status: 200 },
      {
        overwriteRoutes: true,
      },
    );
  };

  beforeEach(() => {
    fetchMockJest.reset();
    mockTasksFetch();
    mockFiltersFetch();
  });

  it('renders page successfully', async () => {
    await renderPage();

    expect(
      screen.getByText('T_pendingTasks', { selector: '.pageTitle__title' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('pending-tasks')).toBeInTheDocument();
  });

  it('displays the right columns in the table', async () => {
    await renderPage();

    const labels = [
      'requestRef',
      'contractRef',
      'reqDate',
      'product',
      'event',
      'client',
      'task',
      'priority',
      'requester',
    ];

    labels.forEach((label) => {
      expect(
        screen.getByText(`T_${label}`, { selector: 'th h3 div' }),
      ).toBeInTheDocument();
    });
  });

  it('fetches for requests on load with scope "mine"', async () => {
    await renderPage();
    expect(tasksFetch.calls(/my-tasks\\?/)).not.toHaveLength(0);

    expect(
      tasksFetch.lastCall(/my-tasks\\?/)[0].includes('scope=mine'),
    ).toBeTruthy();
  });

  it('fetches for filters on load with scope "mine"', async () => {
    await renderPage();
    expect(filtersFetch.calls(/filters\\?/)).not.toHaveLength(0);
    expect(
      filtersFetch.lastCall(/filters\\?/)[0].includes('scope=mine'),
    ).toBeTruthy();
  });

  it('fetches for requests with scope "all" when changing tabs', async () => {
    await renderPage();

    await act(() => {
      userEvent.click(screen.getByText('T_allTasks'));
    });

    expect(
      tasksFetch.lastCall(/my-tasks\\?/)[0].includes('scope=all'),
    ).toBeTruthy();
  });

  it('fetches for filters with scope "all" when changing tabs', async () => {
    await renderPage();

    await act(() => {
      userEvent.click(screen.getByText('T_allTasks'));
    });

    expect(
      filtersFetch.lastCall(/filters\\?/)[0].includes('scope=all'),
    ).toBeTruthy();
  });

  it('displays the correct actions for each row', async () => {
    await renderPage();

    // eslint-disable-next-line no-restricted-syntax
    for (const row of tasksResponse.data) {
      const { getByTestId, getByText } = within(
        screen.getByTestId(`table-row-${row.rowId}`),
      );

      // eslint-disable-next-line no-await-in-loop
      await act(() => {
        userEvent.click(getByTestId('table-row-action-toggle'));
      });

      const expectedText =
        row.status === statusTypes.DRAFT ? 'T_continue' : 'T_doAccess';

      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => {
        expect(getByText(expectedText)).toBeInTheDocument();
      });
    }
  });

  it('navigates to Continue form when request is a draft and the action Continue is clicked', async () => {
    await renderPage();
    const operationId = 'CLE-9';

    const rowData = tasksResponse.data.find(
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

  it('navigates to Continue form when request is advance and draft and the action Continue is clicked', async () => {
    await renderPage();
    const operationId = 'CLE-89';

    const rowData = tasksResponse.data.find(
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
      `http://localhost${Navigation.forms.cle.advance.create}/${operationId}`,
    );
  });

  it('opens the details page of the selected request and adds a hidden class to the table container', async () => {
    const rowData = tasksResponse.data.find(
      (r) => r.operationId === 'CLE-MOD-12',
    )!;

    mockDetailsFetch('CLE', 'MODIFICATION', rowData.taskId);
    await renderPage();

    const { getByTestId, getByText } = within(
      screen.getByTestId(`table-row-${rowData?.rowId}`),
    );

    await act(() => {
      userEvent.click(getByTestId('table-row-action-toggle'));
    });

    await act(() => {
      userEvent.click(getByText('T_doAccess'));
    });

    expect(screen.getByTestId('pending-tasks')).toHaveClass('hiddenComponent');
    expect(screen.getByText('T_requestDetails')).toBeInTheDocument();
    expect(detailsFetch.lastCall()[0].includes(rowData.taskId)).toBeTruthy();
  });

  it('closes the details page of the selected request when pressing Back', async () => {
    const rowData = tasksResponse.data.find(
      (r) => r.operationId === 'CLE-MOD-12',
    )!;

    mockDetailsFetch('CLE', 'MODIFICATION', rowData.taskId);
    await renderPage();

    const { getByTestId, getByText } = within(
      screen.getByTestId(`table-row-${rowData?.rowId}`),
    );

    await act(() => {
      userEvent.click(getByTestId('table-row-action-toggle'));
    });

    await act(() => {
      userEvent.click(getByText('T_doAccess'));
    });

    expect(screen.getByText('T_requestDetails')).toBeInTheDocument();
    expect(screen.getByTestId('pending-tasks')).toHaveClass('hiddenComponent');

    await act(async () => {
      userEvent.click(await screen.findByText('T_back'));
    });

    expect(screen.queryByText('T_requestDetails')).not.toBeInTheDocument();
    expect(screen.getByTestId('pending-tasks')).not.toHaveClass(
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

    const requestBody = JSON.parse(tasksFetch.lastCall()[1].body);
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

    const requestBody = JSON.parse(tasksFetch.lastCall()[1].body);
    expect(requestBody.sortField).toEqual('operationId');
    expect(requestBody.sortOrder).toEqual(1);
  });

  it('navigates to Continue form when CLI request is draft and the action Continue is clicked', async () => {
    await renderPage();
    const operationId = 'CLI-01';

    const rowData = tasksResponse.data.find(
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

  it('navigates to Continue form when CLI payment charge status is draft and the action Continue is clicked', async () => {
    await renderPage();
    const operationId = 'CLI-22';

    const rowData = tasksResponse.data.find(
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
      `http://localhost${Navigation.forms.cli.paymentCharge.create}/${operationId}`,
    );
  });

  it('navigates to Continue form when CLI payment accountless status is draft and the action Continue is clicked', async () => {
    await renderPage();
    const operationId = 'CLI-23';

    const rowData = tasksResponse.data.find(
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
      `http://localhost${Navigation.forms.cli.paymentAccountless.create}/${operationId}`,
    );
  });

  it('navigates to Continue form when CLI request is different from draft and the action Continue is clicked', async () => {
    await renderPage();
    const operationId = 'CLI-02';

    const rowData = tasksResponse.data.find(
      (r) => r.operationId === operationId,
    );

    const { getByTestId } = within(
      screen.getByTestId(`table-row-${rowData?.rowId}`),
    );

    await act(() => {
      userEvent.click(getByTestId('table-row-action-toggle'));
    });

    expect(screen.queryByText('T_continue')).not.toBeInTheDocument();
  });

  it('opens the details page of the selected CLI modification request and adds a hidden class to the table container', async () => {
    const rowData = tasksResponse.data.find((r) => r.operationId === 'CLI-03')!;

    mockDetailsFetch('CLI', 'MODIFICATION', rowData.taskId);
    await renderPage();

    const { getByTestId, getByText } = within(
      screen.getByTestId(`table-row-${rowData?.rowId}`),
    );

    await act(() => {
      userEvent.click(getByTestId('table-row-action-toggle'));
    });

    await act(() => {
      userEvent.click(getByText('T_doAccess'));
    });

    expect(screen.getByTestId('pending-tasks')).toHaveClass('hiddenComponent');
    expect(screen.getByText('T_requestDetails')).toBeInTheDocument();
    expect(detailsFetch.lastCall()[0].includes(rowData.taskId)).toBeTruthy();
  });
});

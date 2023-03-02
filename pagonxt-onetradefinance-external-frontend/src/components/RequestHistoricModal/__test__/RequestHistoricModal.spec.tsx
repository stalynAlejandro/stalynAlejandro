import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponentWithToast } from '../../../testUtils/renderComponent';
import { RequestHistoricModal } from '..';
import ApiUrls from '../../../constants/apiUrls';
import { getApiLocale } from '../../../utils/getApiLocale';
import { formatDate } from '../../../utils/dates';
import { get as historicMockedResponse } from '../../../testUtils/mocks/data/requestHistoric';

describe('Component RequestHistoricModal', () => {
  let mocked: any;
  const defaultProps = {
    onClose: jest.fn(),
    requestId: 'CLE-839',
  };

  const mockHistoricFetch = (
    mockedResponse: any = historicMockedResponse,
    config: any = {},
  ) =>
    fetchMockJest.mock(
      ApiUrls.requestHistoric(defaultProps.requestId, getApiLocale()),
      { body: mockedResponse, status: 200, ...config },
      {
        delay: 200,
        overwriteRoutes: true,
      },
    );

  const renderWithProps = (props: any = {}) => {
    renderComponentWithToast(
      <RequestHistoricModal {...defaultProps} {...props} />,
    );
  };

  const renderAwaitingHistoric = async (props: any = {}) => {
    renderWithProps(props);
    await screen.findByTestId('table-container');
  };

  beforeEach(() => {
    jest.resetAllMocks();
    fetchMockJest.mockClear();
    mocked = mockHistoricFetch();
  });

  it('renders the component successfully', async () => {
    renderWithProps();
    expect(await screen.findByTestId('historic-modal')).toBeInTheDocument();
  });

  it('displays a loader when the historic is loading', async () => {
    renderWithProps();
    expect(await screen.findByTestId('loader-container')).toBeInTheDocument();
  });

  it('the loader disappears once the historic is retrieved and elements are shown', async () => {
    renderWithProps();

    expect(screen.getByTestId('loader-container')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('table')).toBeInTheDocument();
    });
  });

  it('executes the provided onClose method when clicking the close icon', async () => {
    renderWithProps();
    userEvent.click(await screen.findByTestId('icon-close'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('executes the provided onClose method when clicking the faded background', async () => {
    renderWithProps();
    userEvent.click(document.querySelector('.lateralModal__background')!);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders the provided title if any', async () => {
    const title = 'Test title';
    await renderAwaitingHistoric({ title });
    expect(await screen.findByText(title)).toBeInTheDocument();
  });

  it('shows the historic table when the fetch is completed with the expected content', async () => {
    await renderAwaitingHistoric();

    expect(screen.getByText('T_startDate')).toBeInTheDocument();
    expect(screen.getByText('T_endDate')).toBeInTheDocument();
    expect(screen.getByText('T_task')).toBeInTheDocument();
    expect(screen.getByText('T_owner')).toBeInTheDocument();

    historicMockedResponse.data.forEach((hist) => {
      expect(
        screen.getByText(formatDate(new Date(hist.startDate), true)),
      ).toBeInTheDocument();
      expect(
        screen.getByText(formatDate(new Date(hist.endDate), true)),
      ).toBeInTheDocument();
      expect(screen.getByText(hist.taskName)).toBeInTheDocument();
      expect(screen.getByText(hist.userName)).toBeInTheDocument();
    });
  });

  it('fetches with new sort properties when a sortable column is clicked', async () => {
    await renderAwaitingHistoric();
    fetchMockJest.mockClear();
    mockHistoricFetch();

    act(() => userEvent.click(screen.getByText('T_startDate')));

    await waitFor(() => {
      expect(mocked).toHaveFetched();
    });

    expect(JSON.parse(mocked.calls()[0][1].body)).toEqual(
      expect.objectContaining({
        fromPage: 0,
        pageSize: 5,
        sortField: 'startDate',
        sortOrder: 1,
      }),
    );
  });

  it('shows an error message if the historic fetch operation fails', async () => {
    fetchMockJest.mockClear();
    mockHistoricFetch(
      {
        another: 'typeofobject',
      },
      { status: 500 },
    );

    renderWithProps();

    await waitFor(() => {
      expect(
        screen.getByText('T_errors.historic.couldNotRetrieveHistoric'),
      ).toBeInTheDocument();
    });
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('historic-modal')).toHaveClass('test-class');
  });
});

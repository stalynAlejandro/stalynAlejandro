import { cleanup, renderHook, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import { get as historicResponse } from '../../../testUtils/mocks/data/requestHistoric';
import { useFetchRequestHistoric } from '../../fetchDataHooks';

describe('Fetch hook useFetchRequestHistoric', () => {
  const defaultParams = 'ABC-123';

  let mocked: any;
  const mockFetchCall = (config: any = {}) => {
    mocked = fetchMockJest.mock(
      /\/retrieve-historic-tasks/,
      { body: historicResponse, status: 200, ...config },
      {
        overwriteRoutes: true,
      },
    );
  };

  beforeEach(() => {
    fetchMockJest.reset();
    mockFetchCall();
  });

  it('fetches automatically if autofetch is not false', async () => {
    renderHook(() => useFetchRequestHistoric(defaultParams));

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
      expect(mocked.lastCall()[0].includes('ABC-123')).toBeTruthy();
    });
    cleanup();
  });

  it('does not fetch on load if autofetch is false', async () => {
    jest.useFakeTimers();
    renderHook(() =>
      useFetchRequestHistoric(defaultParams, { autofetch: false }),
    );

    jest.advanceTimersByTime(200);

    expect(mocked.calls()).toHaveLength(0);
    jest.useRealTimers();
  });

  it('fetches again automatically when properties are changed', async () => {
    const { rerender, result } = renderHook(
      (params) => useFetchRequestHistoric(params),
      {
        initialProps: defaultParams,
      },
    );

    await waitFor(() => {
      expect(result.current.historic).toBeTruthy();
    });

    expect(mocked.calls()).toHaveLength(1);

    rerender('ABCD-12345');

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(2);
    });

    expect(mocked.lastCall()[0].includes('ABCD-12345')).toBeTruthy();
    cleanup();
  });

  it('updates isLoading property when fetch is initiated and when response is received', async () => {
    const { result } = renderHook(() =>
      useFetchRequestHistoric(defaultParams, { autofetch: false }),
    );

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      result.current.fetchRequestHistoric();
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('returns expected result response object', async () => {
    const { result } = renderHook(() => useFetchRequestHistoric(defaultParams));

    await waitFor(() => {
      expect(result.current.historic).toBeTruthy();
    });

    expect(result.current.historic).toEqual(historicResponse.data);
    expect(result.current.totalResults).toEqual(historicResponse.total);
  });
});

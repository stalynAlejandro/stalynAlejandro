import { cleanup, renderHook, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import ApiUrls from '../../../constants/apiUrls';
import { get as collectionsResponse } from '../../../testUtils/mocks/data/customerCollections';
import { useFetchCustomerCleCollections } from '../../fetchDataHooks';

describe('Fetch hook useFetchCustomerCleCollections', () => {
  const defaultParams = 'ABC-123';

  let mocked: any;
  const mockFetchCall = (config: any = {}) => {
    mocked = fetchMockJest.mock(
      new RegExp(ApiUrls.exportCollections),
      { body: collectionsResponse, status: 200, ...config },
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
    renderHook(() => useFetchCustomerCleCollections(defaultParams));

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
    });
    cleanup();
  });

  it('does not fetch on load if autofetch is false', async () => {
    jest.useFakeTimers();
    renderHook(() =>
      useFetchCustomerCleCollections(defaultParams, { autofetch: false }),
    );

    jest.advanceTimersByTime(200);

    expect(mocked.calls()).toHaveLength(0);
    jest.useRealTimers();
  });

  it('fetches again automatically when properties are changed', async () => {
    const { rerender, result } = renderHook(
      (params) => useFetchCustomerCleCollections(params),
      {
        initialProps: defaultParams,
      },
    );

    await waitFor(() => {
      expect(result.current.customerCollections).toBeTruthy();
    });

    expect(mocked.calls()).toHaveLength(1);

    rerender('ABCD-12345');

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(2);
    });

    expect(mocked.lastCall()[0].includes('customer=ABCD-12345')).toBeTruthy();
    cleanup();
  });

  it('updates isLoading property when fetch is initiated and when response is received', async () => {
    const { result } = renderHook(() =>
      useFetchCustomerCleCollections(defaultParams, { autofetch: false }),
    );

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      result.current.fetchCustomerCollections();
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('returns expected result response object', async () => {
    const { result } = renderHook(() =>
      useFetchCustomerCleCollections(defaultParams),
    );

    await waitFor(() => {
      expect(result.current.customerCollections).toBeTruthy();
    });

    expect(result.current.customerCollections).toEqual(collectionsResponse);
  });
});

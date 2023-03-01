import { cleanup, renderHook, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import ApiUrls from '../../../constants/apiUrls';
import { get as operationsResponse } from '../../../testUtils/mocks/data/operationTypes';
import { useFetchOperationTypes } from '../../fetchDataHooks';

describe('Fetch hook useFetchOperationTypes', () => {
  const defaultParams = 'CLE';

  let mocked: any;
  const mockFetchCall = (config: any = {}) => {
    mocked = fetchMockJest.mock(
      new RegExp(ApiUrls.operationTypes),
      { body: operationsResponse, status: 200, ...config },
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
    renderHook(() => useFetchOperationTypes(defaultParams));

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
    });
    cleanup();
  });

  it('does not fetch on load if autofetch is false', async () => {
    jest.useFakeTimers();
    renderHook(() =>
      useFetchOperationTypes(defaultParams, { autofetch: false }),
    );

    jest.advanceTimersByTime(200);

    expect(mocked.calls()).toHaveLength(0);
    jest.useRealTimers();
  });

  it('fetches again automatically when properties are changed', async () => {
    const { rerender, result } = renderHook(
      (params) => useFetchOperationTypes(params),
      {
        initialProps: defaultParams,
      },
    );

    await waitFor(() => {
      expect(result.current.operationTypes).toBeTruthy();
    });

    expect(mocked.calls()).toHaveLength(1);

    rerender('PRD');

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(2);
    });

    expect(mocked.lastCall()[0].includes('product_id=PRD')).toBeTruthy();
    cleanup();
  });

  it('updates isLoading property when fetch is initiated and when response is received', async () => {
    const { result } = renderHook(() =>
      useFetchOperationTypes(defaultParams, { autofetch: false }),
    );

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      result.current.fetchOperationTypes();
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('returns expected result response object', async () => {
    const { result } = renderHook(() => useFetchOperationTypes(defaultParams));

    await waitFor(() => {
      expect(result.current.operationTypes).toBeTruthy();
    });

    expect(result.current.operationTypes).toEqual(operationsResponse);
    expect(result.current.mappedOperationTypes).toEqual(
      operationsResponse.map(({ key }) => ({
        label: `T_operationTypes.${key}`,
        value: key,
      })),
    );
  });
});

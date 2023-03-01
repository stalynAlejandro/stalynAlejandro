import { cleanup, renderHook, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import { get as commentsResponse } from '../../../testUtils/mocks/data/requestComments';
import { useFetchComments } from '../../fetchDataHooks';

describe('Fetch hook useFetchComments', () => {
  const requestId = 'ABC-123';

  let mocked: any;
  const mockFetchCall = (config: any = {}) => {
    mocked = fetchMockJest.mock(
      /case-data/,
      { body: commentsResponse, status: 200, ...config },
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
    renderHook(() => useFetchComments(requestId));

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
      expect(
        mocked.lastCall()[0].includes(`/case-data/${requestId}`),
      ).toBeTruthy();
    });
    cleanup();
  });

  it('does not fetch on load if autofetch is false', async () => {
    jest.useFakeTimers();
    renderHook(() => useFetchComments(requestId, { autofetch: false }));

    jest.advanceTimersByTime(200);

    expect(mocked.calls()).toHaveLength(0);
    jest.useRealTimers();
  });

  it('fetches again automatically when properties are changed', async () => {
    const { rerender, result } = renderHook(
      (params) => useFetchComments(params),
      {
        initialProps: requestId,
      },
    );

    await waitFor(() => {
      expect(result.current.comments).toBeTruthy();
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
      useFetchComments(requestId, { autofetch: false }),
    );

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      result.current.fetchComments();
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('returns expected result response object', async () => {
    const { result } = renderHook(() => useFetchComments(requestId));

    await waitFor(() => {
      expect(result.current.comments).toBeTruthy();
    });

    expect(result.current.comments).toEqual(commentsResponse.entity);
  });
});

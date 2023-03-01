import fetchMock from 'fetch-mock-jest';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useSingleFetch from '../useSingleFetch';

describe('Hook useSingleFetch', () => {
  const apiUrl = 'http://localhost';

  it('makes the corresponding fetch call successfully', async () => {
    fetchMock.mock(apiUrl, 'my data');
    const { result } = renderHook(() => useSingleFetch(apiUrl));

    await act(async () => {
      await result.current.fetchData();
    });

    expect(fetchMock).toHaveFetchedTimes(1);
    fetchMock.restore();
  });

  it.skip('makes the fetch call just once even if it is called multiple times', async () => {
    fetchMock.mock(apiUrl, 'my data', { delay: 200 });
    const { result } = renderHook(() => useSingleFetch(apiUrl));

    // Each update of the state needs to have its own act to get the current state
    await act(() => {
      expect(result.current.isLoading).toBeFalsy();
      result.current.fetchData();
    });

    // These two next calls should not be performed, as isLoading should be true
    await act(() => {
      expect(result.current.isLoading).toBeTruthy();
      result.current.fetchData();
    });

    await act(() => {
      expect(result.current.isLoading).toBeTruthy();
      result.current.fetchData();
    });

    expect(fetchMock).toHaveFetchedTimes(1);
    fetchMock.restore();
  });

  it.skip('sets the data and isLoading property correctly once it gets the response', async () => {
    jest.useFakeTimers();
    fetchMock.mock(apiUrl, 'my data', { delay: 100 });
    const { result } = renderHook(() => useSingleFetch(apiUrl));

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toBeUndefined();

    await act(() => {
      result.current.fetchData();
    });

    expect(result.current.isLoading).toBeTruthy();

    // Await inside an act because changes in state will happen when we receive the fetch response
    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    expect(result.current.data).toEqual('my data');
    expect(result.current.isLoading).toBeFalsy();
    jest.useRealTimers();
  });
});

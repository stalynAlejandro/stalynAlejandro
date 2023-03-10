import { renderHook, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import ApiUrls from '../../../constants/apiUrls';
import productTypes from '../../../enums/productTypes';
import { get as riskLinesResponse } from '../../../testUtils/mocks/data/riskLines';
import { useFetchRiskLines } from '../../fetchDataHooks';

describe('Fetch hook useFetchRiskLines', () => {
  const defaultParams = {
    amount: '123.00',
    personNumber: 'ABC-123',
    product: productTypes.CLE,
  };

  let mocked: any;
  const mockFetchCall = (config: any = {}) => {
    mocked = fetchMockJest.mock(
      new RegExp(ApiUrls.riskLines),
      { body: riskLinesResponse, status: 200, ...config },
      {
        overwriteRoutes: true,
      },
    );
  };

  beforeEach(() => {
    fetchMockJest.reset();
    mockFetchCall();
  });

  it('fetches automatically with debounce if autofetch is not false', async () => {
    jest.useFakeTimers();
    renderHook(() => useFetchRiskLines(defaultParams));

    await act(async () => {
      jest.advanceTimersByTime(650);
    });

    expect(mocked.calls()).toHaveLength(1);
    jest.useRealTimers();
  });

  it('does not fetch on load if autofetch is false', async () => {
    jest.useFakeTimers();
    renderHook(() => useFetchRiskLines(defaultParams, { autofetch: false }));

    await act(async () => {
      jest.advanceTimersByTime(650);
    });

    expect(mocked.calls()).toHaveLength(0);
    jest.useRealTimers();
  });

  it('sends the correct parameters', async () => {
    renderHook(() =>
      useFetchRiskLines({
        ...defaultParams,
        expirationDate: '2022-11-07T14:08:22.465Z',
      }),
    );

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
    });

    expect(
      mocked.lastCall()[0].includes('expiration_date=2022-11-07'),
    ).toBeTruthy();
  });

  it('fetches again automatically when properties are changed', async () => {
    const { rerender } = renderHook((params) => useFetchRiskLines(params), {
      initialProps: defaultParams,
    });

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
    });

    rerender({ ...defaultParams, amount: '124.00' });

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(2);
    });

    expect(
      mocked.lastCall()[0].includes('operation_amount=124.00'),
    ).toBeTruthy();
  });

  it('updates isLoading property when fetch is initiated and when response is received', async () => {
    const { result } = renderHook(() =>
      useFetchRiskLines(defaultParams, { autofetch: false }),
    );

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      result.current.fetchRiskLines();
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('returns expected result response object', async () => {
    const { result } = renderHook(() => useFetchRiskLines(defaultParams));

    await waitFor(() => {
      expect(result.current.riskLines).toBeTruthy();
    });

    expect(result.current.riskLines).toEqual(riskLinesResponse);
  });
});

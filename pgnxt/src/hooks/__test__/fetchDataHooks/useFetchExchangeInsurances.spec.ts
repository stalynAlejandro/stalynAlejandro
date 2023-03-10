import { cleanup, renderHook, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import ApiUrls from '../../../constants/apiUrls';
import { get as insurancesResponse } from '../../../testUtils/mocks/data/exchangeInsurances';
import { useFetchExchangeInsurances } from '../../fetchDataHooks';

describe('Fetch hook useFetchExchangeInsurances', () => {
  const defaultParams = {
    amount: '123.00',
    buy: true,
    currencyBuy: 'EUR',
    currencySell: 'USD',
    customerId: 'ABC-123',
  };

  let mocked: any;
  const mockFetchCall = (config: any = {}) => {
    mocked = fetchMockJest.mock(
      new RegExp(ApiUrls.exchangeInsurances),
      { body: insurancesResponse, status: 200, ...config },
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
    renderHook(() => useFetchExchangeInsurances(defaultParams));

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
      expect(
        mocked.lastCall()[0].includes(`buy=${defaultParams.buy}`),
      ).toBeTruthy();
      expect(
        mocked
          .lastCall()[0]
          .includes(`currency_sell=${defaultParams.currencySell}`),
      ).toBeTruthy();
      expect(
        mocked
          .lastCall()[0]
          .includes(`currency_buy=${defaultParams.currencyBuy}`),
      ).toBeTruthy();
      expect(
        mocked.lastCall()[0].includes(`amount=${defaultParams.amount}`),
      ).toBeTruthy();
      expect(
        mocked
          .lastCall()[0]
          .includes(`customer_id=${defaultParams.customerId}`),
      ).toBeTruthy();
    });
    cleanup();
  });

  it('does not fetch on load if autofetch is false', async () => {
    jest.useFakeTimers();
    renderHook(() =>
      useFetchExchangeInsurances(defaultParams, { autofetch: false }),
    );

    jest.advanceTimersByTime(200);

    expect(mocked.calls()).toHaveLength(0);
    jest.useRealTimers();
  });

  it('fetches again automatically when properties are changed', async () => {
    const { rerender, result } = renderHook(
      (params) => useFetchExchangeInsurances(params),
      {
        initialProps: defaultParams,
      },
    );

    await waitFor(() => {
      expect(result.current.exchangeInsurances).toBeTruthy();
    });

    expect(mocked.calls()).toHaveLength(1);

    rerender({ ...defaultParams, buy: false, currencySell: 'GBP' });

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(2);
    });

    expect(mocked.lastCall()[0].includes('buy=false')).toBeTruthy();
    expect(mocked.lastCall()[0].includes('currency_sell=GBP')).toBeTruthy();
    cleanup();
  });

  it('updates isLoading property when fetch is initiated and when response is received', async () => {
    const { result } = renderHook(() =>
      useFetchExchangeInsurances(defaultParams, { autofetch: false }),
    );

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      result.current.fetchExchangeInsurances();
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('returns expected result response object', async () => {
    const { result } = renderHook(() =>
      useFetchExchangeInsurances(defaultParams),
    );

    await waitFor(() => {
      expect(result.current.exchangeInsurances).toBeTruthy();
    });

    expect(result.current.exchangeInsurances).toEqual(insurancesResponse);
  });
});

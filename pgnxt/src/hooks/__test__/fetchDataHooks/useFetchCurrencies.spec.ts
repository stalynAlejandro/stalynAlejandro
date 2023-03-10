import { cleanup, renderHook, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import { CurrencyValue } from '../../../components/Controls/Select/OptionComponents/CurrencyValue';
import eventTypes, { EventTypes } from '../../../enums/eventTypes';
import productTypes, { ProductTypes } from '../../../enums/productTypes';
import { get as currenciesResponse } from '../../../testUtils/mocks/data/currencies';
import { useFetchCurrencies } from '../../fetchDataHooks';

describe('Fetch hook useFetchCollectionTypes', () => {
  const defaultProduct = productTypes.CLE;
  const defaultEvent = eventTypes.ADVANCE;

  let mocked: any;
  const mockFetchCall = (config: any = {}) => {
    mocked = fetchMockJest.mock(
      /currencies/,
      { body: currenciesResponse, status: 200, ...config },
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
    renderHook(() => useFetchCurrencies(defaultProduct, defaultEvent));

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
    });
    cleanup();
  });

  it('fetches with CLE and REQUEST params by default', async () => {
    renderHook(() => useFetchCurrencies());

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
    });

    expect(mocked.lastCall()[0].includes('product=CLE')).toBeTruthy();
    expect(mocked.lastCall()[0].includes('event=REQUEST')).toBeTruthy();

    cleanup();
  });

  it('does not fetch on load if autofetch is false', async () => {
    jest.useFakeTimers();
    renderHook(() =>
      useFetchCurrencies(defaultProduct, defaultEvent, {
        autofetch: false,
      }),
    );

    jest.advanceTimersByTime(200);

    expect(mocked.calls()).toHaveLength(0);
    jest.useRealTimers();
  });

  it('fetches again automatically when properties are changed', async () => {
    const { rerender, result } = renderHook(
      ({ event, product }) => useFetchCurrencies(product, event),
      {
        initialProps: {
          event: defaultEvent as EventTypes,
          product: defaultProduct as ProductTypes,
        },
      },
    );

    await waitFor(() => {
      expect(result.current.currencies).toBeTruthy();
    });

    expect(mocked.calls()).toHaveLength(1);

    rerender({
      event: eventTypes.MODIFICATION,
      product: productTypes.CLI as any,
    });

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(2);
    });

    expect(mocked.lastCall()[0].includes('product=CLI')).toBeTruthy();
    expect(mocked.lastCall()[0].includes('event=MODIFICATION')).toBeTruthy();
    cleanup();
  });

  it('updates isLoading property when fetch is initiated and when response is received', async () => {
    const { result } = renderHook(() =>
      useFetchCurrencies(defaultProduct, defaultEvent, {
        autofetch: false,
      }),
    );

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      result.current.fetchCurrencies();
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('returns expected result response object', async () => {
    const { result } = renderHook(() =>
      useFetchCurrencies(defaultProduct, defaultEvent),
    );

    await waitFor(() => {
      expect(result.current.currencies).toBeTruthy();
    });

    expect(result.current.currencies).toEqual(currenciesResponse);
    expect(result.current.mappedCurrencies).toEqual(
      currenciesResponse.map(({ currency, id }) => ({
        component: CurrencyValue,
        value: { currency, id },
      })),
    );
  });
});

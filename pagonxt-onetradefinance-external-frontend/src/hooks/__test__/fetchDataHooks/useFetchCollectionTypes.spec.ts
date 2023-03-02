import { cleanup, renderHook, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import productTypes from '../../../enums/productTypes';
import { get as collectionsResponse } from '../../../testUtils/mocks/data/collectionTypes';
import { useFetchCollectionTypes } from '../../fetchDataHooks';

describe('Fetch hook useFetchCollectionTypes', () => {
  const defaultProduct = productTypes.CLE;
  const defaultCurrency = 'EUR';

  let mocked: any;
  const mockFetchCall = (config: any = {}) => {
    mocked = fetchMockJest.mock(
      /collection-types/,
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
    renderHook(() => useFetchCollectionTypes(defaultProduct, defaultCurrency));

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
    });
    cleanup();
  });

  it('does not fetch on load if autofetch is false', async () => {
    jest.useFakeTimers();
    renderHook(() =>
      useFetchCollectionTypes(defaultProduct, defaultCurrency, {
        autofetch: false,
      }),
    );

    jest.advanceTimersByTime(200);

    expect(mocked.calls()).toHaveLength(0);
    jest.useRealTimers();
  });

  it('fetches again automatically when properties are changed', async () => {
    const { rerender, result } = renderHook(
      ({ currency, product }) => useFetchCollectionTypes(product, currency),
      {
        initialProps: {
          currency: defaultCurrency,
          product: defaultProduct,
        },
      },
    );

    await waitFor(() => {
      expect(result.current.collectionTypes).toBeTruthy();
    });

    expect(mocked.calls()).toHaveLength(1);

    rerender({ currency: 'USD', product: productTypes.CLI as any });

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(2);
    });

    expect(mocked.lastCall()[0].includes('product_id=CLI')).toBeTruthy();
    expect(mocked.lastCall()[0].includes('currency=USD')).toBeTruthy();
    cleanup();
  });

  it('updates isLoading property when fetch is initiated and when response is received', async () => {
    const { result } = renderHook(() =>
      useFetchCollectionTypes(defaultProduct, defaultCurrency, {
        autofetch: false,
      }),
    );

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      result.current.fetchCollectionTypes();
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('returns expected result response object', async () => {
    const { result } = renderHook(() =>
      useFetchCollectionTypes(defaultProduct, defaultCurrency),
    );

    await waitFor(() => {
      expect(result.current.collectionTypes).toBeTruthy();
    });

    expect(result.current.collectionTypes).toEqual(collectionsResponse);
    expect(result.current.mappedCollectionTypes).toEqual(
      collectionsResponse.map(({ key }) => ({
        label: `T_collectionTypes.${key}`,
        value: key,
      })),
    );
  });
});

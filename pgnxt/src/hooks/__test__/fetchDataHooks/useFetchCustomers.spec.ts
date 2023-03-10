import { cleanup, renderHook, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import ApiUrls from '../../../constants/apiUrls';
import { get as customersResponse } from '../../../testUtils/mocks/data/customers';
import { useFetchCustomers } from '../../fetchDataHooks';

describe('Fetch hook useFetchCustomers', () => {
  const defaultParams = {
    name: 'Client',
    office: '1234',
    personNumber: 'ABC-123',
    taxId: 'TAX-ID',
  };

  let mocked: any;
  const mockFetchCall = (config: any = {}) => {
    mocked = fetchMockJest.mock(
      new RegExp(ApiUrls.clients),
      { body: customersResponse, status: 200, ...config },
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
    renderHook(() => useFetchCustomers(defaultParams));

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(1);
    });

    cleanup();
    expect(mocked.lastCall()[0].includes('name=Client')).toBeTruthy();
    expect(mocked.lastCall()[0].includes('office=1234')).toBeTruthy();
    expect(mocked.lastCall()[0].includes('person_number=ABC-123')).toBeTruthy();
    expect(mocked.lastCall()[0].includes('tax_id=TAX-ID')).toBeTruthy();
  });

  it('does not fetch on load if autofetch is false', async () => {
    jest.useFakeTimers();
    renderHook(() => useFetchCustomers(defaultParams, { autofetch: false }));

    jest.advanceTimersByTime(200);

    expect(mocked.calls()).toHaveLength(0);
    jest.useRealTimers();
  });

  it('fetches again automatically when properties are changed', async () => {
    const { rerender, result } = renderHook(
      (params) => useFetchCustomers(params),
      {
        initialProps: defaultParams,
      },
    );

    await waitFor(() => {
      expect(result.current.customers).toBeTruthy();
    });

    expect(mocked.calls()).toHaveLength(1);

    rerender({ ...defaultParams, personNumber: 'ASD-TEST' });

    await waitFor(() => {
      expect(mocked.calls()).toHaveLength(2);
    });

    expect(
      mocked.lastCall()[0].includes('person_number=ASD-TEST'),
    ).toBeTruthy();
    cleanup();
  });

  it('updates isLoading property when fetch is initiated and when response is received', async () => {
    const { result } = renderHook(() =>
      useFetchCustomers(defaultParams, { autofetch: false }),
    );

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      result.current.fetchCustomers();
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('returns expected result response object', async () => {
    const { result } = renderHook(() => useFetchCustomers(defaultParams));

    await waitFor(() => {
      expect(result.current.customers).toBeTruthy();
    });

    expect(result.current.customers).toEqual(customersResponse);
  });
});

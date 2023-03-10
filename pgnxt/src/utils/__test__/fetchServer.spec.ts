import fetchMockJest from 'fetch-mock-jest';

import { catchTestError } from '../../testUtils/catchTestError';
import { fetchServer } from '../fetchServer';

describe('Util fetchServer', () => {
  const url = 'http://test-url.test';
  const defaultResponse = { data: 'test data' };
  let mockCall: any;

  const mockFetch = (response: any = defaultResponse, config: any = {}) => {
    mockCall = fetchMockJest.mock(
      url,
      { body: response, status: 200, ...config },
      {
        overwriteRoutes: true,
      },
    );
  };

  beforeEach(() => {
    fetchMockJest.reset();
    mockFetch();
  });

  it('uses a GET method by default', async () => {
    await fetchServer(url);
    expect(mockCall.lastCall()[1].method).toEqual('get');
  });

  it('allows for custom methods other than GET', async () => {
    await fetchServer(url, { method: 'post' });
    expect(mockCall.lastCall()[1].method).toEqual('post');
  });

  it('accepts custom headers', async () => {
    await fetchServer(url, { headers: { custom: 'custom-header' } });
    expect(mockCall.lastCall()[1].headers.custom).toEqual('custom-header');
  });

  it('returns expected response when it comes as JSON', async () => {
    const response = await fetchServer(url);
    expect(response).toEqual(defaultResponse);
  });

  it('returns expected response when it comes as plain text', async () => {
    const resp = 'plain text response';
    fetchMockJest.reset();
    mockFetch(resp);

    const response = await fetchServer(url);
    expect(response).toEqual(resp);
  });

  it('returns raw response if returnRaw option is provided', async () => {
    const resp = 'plain text response';
    fetchMockJest.reset();
    mockFetch(resp);

    const response = await fetchServer(url, { returnRaw: true });
    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        statusText: 'OK',
      }),
    );
  });

  it('throws an error with basic data', async () => {
    fetchMockJest.reset();
    mockFetch(undefined, { status: 500 });

    const thrownError = await catchTestError(async () => fetchServer(url));
    expect(thrownError).toEqual(
      expect.objectContaining({
        status: 500,
        statusText: 'Internal Server Error',
      }),
    );
  });

  it('throws an error with parsed error response as JSON if available', async () => {
    const error = { cause: 'test error', message: 'test error message' };
    fetchMockJest.reset();
    mockFetch(error, { status: 500 });

    const thrownError = await catchTestError(async () => fetchServer(url));
    expect(thrownError).toEqual(
      expect.objectContaining({
        parsedResponse: error,
      }),
    );
  });

  it('throws an error with parsed error response as text if available', async () => {
    const error = '500: No body';
    fetchMockJest.reset();
    mockFetch(error, {
      status: 500,
    });

    const thrownError = await catchTestError(async () => fetchServer(url));
    expect(thrownError).toEqual(
      expect.objectContaining({
        parsedResponse: error,
      }),
    );
  });
});

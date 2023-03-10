import { InteractionRequiredAuthError } from '@azure/msal-browser';

import { getAccessToken } from '../getAccessToken';

const mockedGetActiveAccount = jest.fn();
const mockedAcquireTokenSilent = jest.fn();
const mockedLoginRedirect = jest.fn();

jest.mock('../../authConfig', () => ({
  ...(jest.requireActual('../../authConfig') as any),
  msalInstance: {
    acquireTokenSilent(...args: any[]) {
      return mockedAcquireTokenSilent.apply(this, args);
    },
    getActiveAccount: () => mockedGetActiveAccount(),
    loginRedirect: () => mockedLoginRedirect(),
  },
}));

describe('Util getAccessToken', () => {
  it('returns null if there is no active account', async () => {
    mockedGetActiveAccount.mockReturnValue('pepe');
    const token = await getAccessToken();

    expect(token).toBeNull();
  });

  it('returns the accessToken successfully', async () => {
    mockedGetActiveAccount.mockReturnValue({});
    mockedAcquireTokenSilent.mockReturnValue({ idToken: 'my-id-token' });

    const token = await getAccessToken();
    expect(token).toEqual('my-id-token');
  });

  it('requests a new login operation if the access token has expired', async () => {
    mockedGetActiveAccount.mockReturnValue({});
    mockedAcquireTokenSilent.mockImplementation(() => {
      throw new InteractionRequiredAuthError();
    });

    await getAccessToken();
    expect(mockedLoginRedirect).toHaveBeenCalled();
  });

  it('forces an id token refresh if exp property has expired', async () => {
    mockedGetActiveAccount.mockReturnValue({
      idTokenClaims: { exp: Date.now() / 1000 - 3600 },
    });

    await getAccessToken();
    expect(mockedAcquireTokenSilent).toHaveBeenCalledWith(
      expect.objectContaining({ forceRefresh: true }),
    );
  });

  it('does not force an id token refresh if exp property has not expired', async () => {
    mockedGetActiveAccount.mockReturnValue({
      idTokenClaims: { exp: Date.now() / 1000 + 3600 },
    });

    await getAccessToken();
    expect(mockedAcquireTokenSilent).toHaveBeenCalledWith(
      expect.objectContaining({ forceRefresh: false }),
    );
  });
});

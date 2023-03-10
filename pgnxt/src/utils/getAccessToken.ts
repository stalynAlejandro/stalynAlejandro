import { InteractionRequiredAuthError } from '@azure/msal-browser';

import { loginRequest, msalInstance } from '../authConfig';

export const getAccessToken = async () => {
  const activeAccount = msalInstance?.getActiveAccount();

  if (activeAccount) {
    try {
      // MSAL looks for accessToken expiration, but we use idToken
      // So, force refresh token if idToken's already expired
      const forceRefresh =
        new Date((activeAccount.idTokenClaims?.exp || 0) * 1000) < new Date();

      const msalTokenInfo = await msalInstance?.acquireTokenSilent({
        ...loginRequest,
        account: activeAccount,
        forceRefresh,
      });

      return msalTokenInfo.idToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        msalInstance.loginRedirect(loginRequest);
      }
    }
  }

  // Do not force login here to avoid endless loops
  return null;
};

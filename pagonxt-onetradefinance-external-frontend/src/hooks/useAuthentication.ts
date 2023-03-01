import { InteractionType } from '@azure/msal-browser';
import {
  useMsal,
  useIsAuthenticated,
  useMsalAuthentication,
} from '@azure/msal-react';
import { useCallback } from 'react';

import { loginRequest } from '../authConfig';

export const useAuthentication = () => {
  const { accounts, instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const { login } = useMsalAuthentication(
    InteractionType.Redirect,
    loginRequest,
  );

  const logout = useCallback(() => {
    instance?.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
  }, [instance]);

  return {
    accounts,
    isAuthenticated,
    login,
    logout,
  };
};

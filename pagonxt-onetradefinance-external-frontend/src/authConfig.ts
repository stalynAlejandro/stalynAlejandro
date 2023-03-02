import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    authority: `https://login.microsoftonline.com/${process.env
      .REACT_APP_MSAL_TENANTID!}`,
    clientId: process.env.REACT_APP_MSAL_CLIENTID!,
    redirectUri: process.env.REACT_APP_MSAL_REDIRECTURI!,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};

export const msalInstance = new PublicClientApplication(msalConfig);

(() => {
  // Notify if MSAL variables are not configured correctly
  if (
    process.env.REACT_APP_USE_AUTHENTICATION === 'msal' &&
    (!process.env.REACT_APP_MSAL_TENANTID ||
      !process.env.REACT_APP_MSAL_CLIENTID ||
      !process.env.REACT_APP_MSAL_REDIRECTURI)
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      'MSAL settings not configured correctly. Please, check MSAL configuration variables.',
    );
  }
  // Set the user account as active
  msalInstance.addEventCallback((response: EventMessage) => {
    if (response.eventType === EventType.LOGIN_SUCCESS) {
      msalInstance.setActiveAccount(
        (response.payload as AuthenticationResult).account,
      );
    }
  });
})();

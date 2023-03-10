import React from 'react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock-jest';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';

import App from '../App';
import { mockUserInfoFetch } from '../../../testUtils/mockUserInfoFetch';
import { renderComponent } from '../../../testUtils/renderComponent';
import sleep from '../../../testUtils/sleep';

describe('Container App', () => {
  let msalTester: MsalReactTester;

  const clickMenuItem = async (testid: string) => {
    const link = (await screen.findByTestId(testid)).querySelector('a');
    if (link) {
      userEvent.click(link);
    } else {
      throw Error(`Link with testid ${testid} not present`);
    }
  };

  fetchMock.mock('*', 200); // as there are multiple pages being rendered, avoid onload fetch errors

  const renderApp = async (waitForRedirect = true) => {
    renderComponent(
      <MsalProvider instance={msalTester.client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MsalProvider>,
    );

    if (waitForRedirect) {
      await msalTester.waitForRedirect();
      await sleep(100);
    }
  };

  beforeAll(() => {
    const originalError = global.console.error;
    global.console.error = jest.fn((...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Please upgrade to at least react-dom@16.9.0')
      ) {
        return false;
      }
      return originalError.call(console, args);
    });
  });

  beforeEach(() => {
    process.env.REACT_APP_USE_AUTHENTICATION = 'msal';
    mockUserInfoFetch();
    msalTester = new MsalReactTester('Redirect');
    msalTester.spyMsal();

    msalTester.isLogged();
  });

  afterEach(() => {
    msalTester.resetSpyMsal();
  });

  afterAll(() => {
    (global.console.error as any).mockRestore();
  });

  it('renders the App correctly', async () => {
    await renderApp();
    expect(await screen.findByTestId('app')).toBeInTheDocument();
  });

  it('renders a loader waiting for redirection if user is not logged in and auth is MSAL', async () => {
    msalTester.isNotLogged();

    await renderApp(false);

    expect(await screen.findByTestId('loader-container')).toBeInTheDocument();
    expect(
      await screen.findByText('T_redirectingLoginPage'),
    ).toBeInTheDocument();
  });

  it('does not render a loader if auth is not MSAL', async () => {
    process.env.REACT_APP_USE_AUTHENTICATION = 'none';
    msalTester.isNotLogged();

    await renderApp(false);

    expect(
      screen.queryByText('T_redirectingLoginPage'),
    ).not.toBeInTheDocument();
  });

  it('shows New Requests page when navigated to it', async () => {
    await renderApp();

    await clickMenuItem('menu-item-newRequests');
    expect(
      await screen.findByTestId('page-title-T_newRequests'),
    ).toBeInTheDocument();
  });

  it('shows Help page when navigated to it', async () => {
    await renderApp();

    await clickMenuItem('menu-item-help');
    expect(await screen.findByTestId('page-title-T_help')).toBeInTheDocument();
  });

  it('shows PendingTasks page when navigated to it', async () => {
    await renderApp();

    await clickMenuItem('menu-item-pendingTasks');
    expect(
      await screen.findByTestId('page-title-T_pendingTasks'),
    ).toBeInTheDocument();
  });

  it('shows QueryOfRequests page when navigated to it', async () => {
    await renderApp();

    await clickMenuItem('menu-item-queryOfRequests');
    expect(
      await screen.findByTestId('page-title-T_queryOfRequests'),
    ).toBeInTheDocument();
  });
});

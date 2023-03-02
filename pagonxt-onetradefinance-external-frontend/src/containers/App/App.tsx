import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { useTranslation } from 'react-i18next';

import theme from '../../resources/theme';
import { StApp } from './AppStyled';
import { StToastContainer } from '../../components/NotificationToast/NotificationToastStyled';
import { AppRoutes } from '../AppRoutes';
import { fetchUser } from '../../redux/features/userSlice';
import { StoreDispatch } from '../../redux/store';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Loader } from '../../components/Loader';

const App: React.FC = () => {
  const usesMsal = process.env.REACT_APP_USE_AUTHENTICATION === 'msal';
  if (usesMsal) {
    // Force authentication and redirect if user is not authenticated
    useAuthentication();
  }

  /* ---- */
  const { t } = useTranslation();
  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StApp className="App" data-testid="app">
        <StToastContainer
          autoClose={false}
          hideProgressBar
          newestOnTop={false}
          pauseOnFocusLoss
          pauseOnHover
          position="top-center"
        />
        {(usesMsal && (
          <>
            <AuthenticatedTemplate>
              <AppRoutes />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <Loader title={t('redirectingLoginPage')} />
            </UnauthenticatedTemplate>
          </>
        )) || <AppRoutes />}
      </StApp>
    </ThemeProvider>
  );
};

export default App;

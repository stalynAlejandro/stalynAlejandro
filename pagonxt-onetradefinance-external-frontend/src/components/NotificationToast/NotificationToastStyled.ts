import { ToastContainer } from 'react-toastify';
import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const StToastContainer = styled(ToastContainer)(
  ({
    theme: {
      colors: { darkgray },
      iconColors: { darkblue, darkgreen, darkyellow },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    &&.Toastify__toast-container {
      width: 60%;
      max-width: 600px;
    }

    .Toastify__toast {
      border: 2px solid transparent;
      background-color: white;
      padding-bottom: 16px;
      color: ${darkgray};

      .Toastify__toast-icon {
        align-self: flex-start;
        margin-top: 5px;
      }

      &--success {
        border-color: #3a8340;
        background-color: #f0f8f0;

        & .Toastify__toast-icon {
          filter: ${darkgreen};
        }
      }

      &--info {
        border-color: #257fa4;
        background-color: #f9fcfd;

        & .Toastify__toast-icon {
          filter: ${darkblue};
        }
      }

      &--error {
        border-color: #cc0000;
        background-color: #fee5e5;

        & .Toastify__toast-icon {
        }
      }

      &--warning {
        border-color: #946f00;
        background-color: #fffaeb;

        & .Toastify__toast-icon {
          filter: ${darkyellow};
        }
      }

      .Toastify__progress-bar {
        &--success {
          background: #3a8340;
        }

        &--error {
          background: #cc0000;
        }

        &--warning {
          background: #946f00;
        }
      }
    }
  `,
);

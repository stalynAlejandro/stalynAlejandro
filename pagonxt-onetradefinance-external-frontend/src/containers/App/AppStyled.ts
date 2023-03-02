import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const StApp = styled.div(
  ({
    theme: {
      colors: { boston },
      typography: {
        fontSizes: { big, regular },
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    height: 100%;
    font-size: ${regular};
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    textarea,
    input,
    select,
    .input-like {
      font-size: ${big};
    }

    .bold {
      font-family: ${bold};
    }

    .nowrap {
      white-space: nowrap;
    }

    .hiddenComponent {
      display: none !important;
    }

    .errorMessage__validationError {
      .errorMessage__headerMessage {
        margin-top: 0;
      }

      .errorMessage__errorList {
        padding-left: 16px;
        list-style-type: none;

        li {
          &::before {
            content: '';
            background-color: ${boston};
            display: inline-block;
            border-radius: 50%;
            width: 5px;
            height: 5px;
            vertical-align: middle;
            margin-right: 8px;
          }

          span {
            vertical-align: baseline;
          }

          .errorMessage__field,
          .errorMessage__parent,
          .errorMessage__limit {
            font-style: italic;
          }
        }
      }
    }

    .fields-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .form-field:not(.form-field-parent .form-field) {
        margin: 10px 0;
        width: calc(50% - 10px);

        @media (max-width: 560px) {
          width: 100%;
        }
      }

      .form-field--wide:not(.form-field-parent .form-field--wide) {
        width: 100%;
      }
    }
  `,
);

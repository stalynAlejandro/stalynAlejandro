import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../../../resources/theme';

export const StRiskLineContainer = styled.div(
  ({
    theme: {
      typography: {
        textFonts: { bold, regular },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    display: flex;
    flex-direction: row;
    width: 100%;

    > div {
      flex: 1;

      span {
        font-family: ${regular};
      }

      .option__bold {
        &,
        & span {
          font-family: ${bold};
        }

        margin-bottom: 6px;
      }
    }

    > div:first-child {
      flex: 0 0 35%;
    }

    > div:last-child {
      flex: 0 0 5%;
    }
  `,
);

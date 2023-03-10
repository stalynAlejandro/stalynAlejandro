import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../../../resources/theme';

export const StCustomerCollectionContainer = styled.div(
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
      align-items: center;
      padding: 0 5px;

      span:not(.option__bold span) {
        font-family: ${regular};
      }

      .option__bold {
        font-family: ${bold};
        margin-bottom: 6px;
      }
    }

    > div:first-child {
      padding-left: 0;
    }

    > div:last-child {
      flex: 0 0 5%;
      padding-right: 0;
      align-items: center;
      display: flex;
    }
  `,
);

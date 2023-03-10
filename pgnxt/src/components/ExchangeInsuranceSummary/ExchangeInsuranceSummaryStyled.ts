import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const StSummaryContainer = styled.div(
  () => css`
    width: 100%;
    background-color: white;
  `,
);

export const StToggleContainer = styled.div(
  ({
    theme: {
      colors: { darkgray, mediumsky },
      typography: {
        fontSizes: { big },
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${darkgray};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    border-style: solid;
    border-color: ${mediumsky};
    border-width: 1px 0 1px 0;

    padding: 14px;

    .exchange-rate {
      font-size: ${big};
      font-family: ${bold};
    }

    .currencies {
      margin: auto;
      & > span {
        margin: 0 4px;
      }
    }

    .used-amount {
      margin-left: auto;
      margin-right: 5px;
    }
  `,
);

export const StToggledContent = styled.div(
  () => css`
    padding: 24px 16px;
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    & > div {
      display: flex;
      flex-direction: column;

      &.actions {
        flex-direction: row;

        button {
          margin: 0 6px;
        }
      }
    }
  `,
);

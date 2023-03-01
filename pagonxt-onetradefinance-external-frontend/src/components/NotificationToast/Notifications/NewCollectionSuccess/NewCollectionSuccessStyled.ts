import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../../resources/theme';

export const StTitle = styled.h2(
  ({
    theme: {
      typography: {
        headlineFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin: 0;
    font-size: 18px;
    font-family: ${bold};
  `,
);

export const StSubtitle = styled.h2(
  ({
    theme: {
      typography: {
        headlineFonts: { regular },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin: 0;
    font-size: 18px;
    font-family: ${regular};
  `,
);

export const StValuesContainer = styled.ul(
  ({
    theme: {
      typography: {
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin: 0;
    margin-top: 20px;
    padding: 0;

    li {
      margin-bottom: 10px;

      span {
        display: inline-block;
        vertical-align: middle;

        &:first-child {
          font-family: ${bold};
          width: 35%;
        }
      }
    }
  `,
);

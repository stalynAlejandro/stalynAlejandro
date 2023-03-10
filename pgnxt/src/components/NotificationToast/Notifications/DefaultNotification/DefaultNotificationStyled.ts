import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../../resources/theme';

export const StTitle = styled.h2(
  ({
    theme: {
      typography: {
        fontSizes: { big },
        headlineFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin: 0;
    margin-bottom: 6px;
    font-size: ${big};
    font-family: ${bold};
  `,
);

export const StDescription = styled.p(
  ({
    theme: {
      typography: {
        fontSizes: { big },
        headlineFonts: { regular },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin: 0;
    font-family: ${regular};
    font-size: ${big};
  `,
);

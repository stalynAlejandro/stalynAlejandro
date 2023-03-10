import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const BoldTitle = styled.h3(
  ({
    theme: {
      colors: { darkergray },
      typography: {
        fontSizes: { big },
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin: 0;
    font-family: ${bold};
    color: ${darkergray};
    font-size: ${big};
    display: flex;
    align-items: center;
  `,
);

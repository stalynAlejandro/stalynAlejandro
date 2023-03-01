import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const StSubtitle = styled.h3(
  ({
    theme: {
      colors: { darkergray },
      typography: {
        fontSizes: { subtitle },
        headlineFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    display: block;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
    color: ${darkergray};
    font-size: ${subtitle};
    font-family: ${bold};
  `,
);

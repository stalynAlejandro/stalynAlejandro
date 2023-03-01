import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const StButton = styled.button(
  ({
    inverse,
    theme: {
      colors: { boston, ruby, santander, white },
      typography: {
        fontSizes: { big },
        textFonts: { bold, regular },
      },
    },
    wide,
  }: {
    disabled: boolean;
    inverse: boolean;
    theme: ThemeProps;
    wide: boolean;
  }) => {
    const normalButton = css`
      background-color: ${santander};
      color: ${white};
    `;

    const inverseButton = css`
      background-color: ${white};
      color: ${santander};
      font-family: ${regular};

      &:hover {
        color: ${boston};
        background-color: ${white};
        border-color: ${boston};
      }

      &:active {
        color: ${ruby};
        background-color: ${white};
        border-color: ${ruby};
      }
    `;

    const wideButton = css`
      max-width: 100%;
      min-width: 184px;
      padding: 8px 15px;
    `;

    return css`
      ${normalButton}
      cursor:pointer;
      font-family: ${bold};
      font-size: ${big};
      padding: 5px 15px;
      align-self: center;
      border: 1px solid ${santander};
      border-radius: 30px;

      &:hover {
        background-color: ${boston};
        border-color: ${boston};
        color: ${white};
      }

      &:active {
        background-color: ${ruby};
        border-color: ${ruby};
        color: ${white};
      }

      ${inverse && inverseButton}
      ${wide && wideButton}
    `;
  },
);

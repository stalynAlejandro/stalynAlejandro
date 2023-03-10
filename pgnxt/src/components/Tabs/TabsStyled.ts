import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const StTabsList = styled.ul(
  () => css`
    display: flex;
    flex-direction: row;
    margin: 0;
  `,
);

export const StTabItem = styled.li(
  ({
    isActive,
    theme: {
      colors: { lightsky, santander },
      typography: {
        textFonts: { bold },
      },
    },
  }: {
    isActive: boolean;
    theme: ThemeProps;
  }) => {
    const activeStyle = css`
      background-color: white;
      border-bottom: 1px solid white;
      margin-bottom: -1px;
      font-family: ${bold};
    `;

    return css`
      width: 176px;
      text-align: center;
      background-color: ${hexToRgba(lightsky, 0.8)};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      ${isActive && activeStyle}

      > div {
        padding: 10px 0;
        width: 100%;
      }

      &::after {
        content: '';
        display: inline-block;
        height: 3px;
        width: 85%;
        background-color: ${isActive ? santander : 'transparent'};
      }
    `;
  },
);

import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';

export const StPlaceholder = styled.span(
  ({
    isFloating,
    theme: {
      typography: {
        fontSizes: { big, small },
        textFonts: { bold, regular },
      },
    },
    wide,
  }: {
    isFloating: boolean;
    theme: ThemeProps;
    wide: boolean;
  }) => {
    const floatingPlaceholder = css`
      top: ${wide ? '12px' : '5px'};
      font-size: ${small};
      font-family: ${regular};
    `;

    const boldFamily = `font-family: ${bold};`;

    const defaultPlaceholder = css`
      input + && {
        left: 20px;
        top: ${wide ? '22px' : '13px'};
        ${wide && boldFamily}

        ${isFloating && floatingPlaceholder}
      }

      .formSelect + && {
        left: 20px;
        top: ${wide ? '18px' : '13px'};
        ${wide && boldFamily}

        ${isFloating && floatingPlaceholder}
      }

      .formSelect:focus-within + && {
        ${floatingPlaceholder}
      }

      textarea + && {
        left: 20px;
        top: 13px;

        ${isFloating && floatingPlaceholder}
      }
    `;

    const fontSize = wide ? `calc(${big} + 2px)` : big;

    return css`
      display: block;
      pointer-events: none;
      opacity: 0.7;
      position: absolute;
      user-select: none;
      transition: 0.2s ease all;
      font-size: ${fontSize};

      ${defaultPlaceholder}

      *:focus + && {
        ${floatingPlaceholder}
      }
    `;
  },
);

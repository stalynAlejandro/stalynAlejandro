import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';

export const StCustomRadioButton = styled.span(() => css``);

export const StLabel = styled.span(
  ({
    theme: {
      typography: {
        fontSizes: { big },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin-left: 10px;
    font-size: ${big};
  `,
);

export const StRadioButtonLabel = styled.label(
  ({
    disabled,
    theme: {
      colors: { mediumgray, turquoise, white },
    },
  }: {
    disabled: boolean;
    theme: ThemeProps;
  }) => css`
    position: relative;

    &:hover {
      ${!disabled && 'cursor: pointer;'}
    }

    [type='radio'] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    ${StCustomRadioButton} {
      display: inline-block;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid ${mediumgray};
      background-color: ${white};
    }

    input[type='radio']:checked ~ ${StCustomRadioButton} {
      background-color: ${turquoise};
      border-color: transparent;
      outline: 4px solid white;
      outline-offset: -6px;
    }
  `,
);

import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';
import { Input } from '../Input';
import { Select } from '../Select';

const resetStyles = css`
  margin: 0;
  border-radius: 0;
  border: none;
  background-color: transparent;
  min-width: auto;
`;

export const StInput = styled(Input)(
  ({
    theme: {
      typography: {
        fontSizes: { big },
      },
    },
    wide,
  }: {
    theme: ThemeProps;
    wide: boolean;
  }) => {
    const wideFontSize = `font-size: calc(${big} + 2px);`;

    return css`
      ${resetStyles}
      flex: 1;

      input {
        ${wide && wideFontSize}
      }
    `;
  },
);

export const StSelect = styled(Select)(
  ({
    theme: {
      colors: { mediumsky, sky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    ${resetStyles}
    width: fit-content;
    min-width: 80px;
    max-width: 50%;
    border-left: 1px solid ${mediumsky};

    && .formSelect__control {
      background-color: ${sky};
      border-radius: 0;
    }
  `,
);

export const StInputSelectContainer = styled.div(
  ({
    hasError,
    theme: {
      colors: { boston, darkersky, lightsky },
      typography: {
        textFonts: { bold },
      },
    },
    wide,
  }: {
    hasError: boolean;
    theme: ThemeProps;
    wide: boolean;
  }) => {
    const errorStyle = `border-bottom-color: ${boston}; border-bottom-width: 2px; `;

    const wideSelectStyle = css`
      ${StInput} {
        font-family: ${bold};
        padding-top: 20px;
        padding-bottom: 20px;
        border: none;

        input {
          opacity: 0.8;
        }
      }

      ${StSelect} {
        .formSelect__control {
          padding-top: 20px;
          padding-bottom: 20px;
        }
      }
    `;

    return css`
      position: relative;
      display: flex;
      min-width: 250px;
      max-width: 100%;

      background-color: white;
      border-radius: 4px 4px 0 0;
      border: 1px solid ${lightsky};
      border-bottom-color: ${darkersky};

      & > .form-field {
        margin: 0;
      }

      .input-select__select {
        border: 0;
      }

      ${hasError && errorStyle}

      &:focus-within {
        border-bottom-width: 3px;
      }

      ${wide && wideSelectStyle}
    `;
  },
);

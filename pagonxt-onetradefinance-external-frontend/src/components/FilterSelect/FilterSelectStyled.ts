import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const StSelectedIndicator = styled.span(
  ({
    theme: {
      colors: { santander },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    border-radius: 50%;
    aspect-ratio: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    flex-basis: 16px;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0 10px;
    border: 1px solid ${santander};
    color: ${santander};
  `,
);

export const StSelectContainer = styled.div(
  ({
    hasValues,
    theme: {
      colors: { darkgray, lightsky, mediumsky, santander, turquoise },
      typography: {
        fontSizes: { regular },
        textFonts: { bold },
      },
    },
  }: {
    hasValues: boolean;
    theme: ThemeProps;
  }) => {
    const withValuesStyles = `
      .filterSelect__value-container {
        color: ${santander};
      }
    `;

    return css`
      .filterSelect {
        border: none;
        height: 100%;
        width: fit-content;

        display: inline-block;

        & input {
          caret-color: transparent;
        }

        &:hover {
          cursor: pointer;
        }
      }

      .filterSelect__placeholder {
        margin: 0;
        color: ${darkgray};
      }

      .filterSelect__dropdown-indicator {
        display: flex;
        width: 18px;
        aspect-ratio: 1;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        position: relative;

        > img {
          position: absolute;
        }
      }

      .filterSelect__control {
        min-height: auto;
        height: 100%;
        padding: 6px 10px;
        border: none;
        cursor: inherit;
        border: 1px solid ${mediumsky};
        background-color: ${hasValues ? 'white' : hexToRgba(lightsky, 0.4)};

        &--is-focused {
          box-shadow: none;
        }

        &:hover {
          border-color: ${turquoise};
        }
      }

      .filterSelect__single-value {
        margin: 0;
        min-width: 0;
        overflow: initial;
      }

      .filterSelect__input-container {
        width: 0;
        padding: 0;
        margin: 0;
      }

      .filterSelect__group,
      .filterSelect__menu-list {
        padding: 4px;
      }

      .option__label {
        display: inline-flex;
        min-width: 0;

        > span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
      }

      .filterSelect__group-heading,
      .filterSelect__option {
        color: inherit;
        font-size: inherit;
        font-weight: inherit;
        text-transform: inherit;
        padding: 8px 10px;
        margin-bottom: 8px;
        border-radius: 4px;
        background-color: white;

        &:hover {
          background-color: ${lightsky};
          cursor: pointer;
        }
      }

      .filterSelect__group-heading:first-child {
        border-top: none;
      }

      .filterSelect__option:hover {
        background-color: ${lightsky};
        cursor: pointer;
      }

      .filterSelect__value-container {
        padding: 0;
        padding-right: 16px;
        overflow: initial;
        opacity: 0.9;
      }

      .filterSelect__indicator-separator {
        display: none;
      }

      .filterSelect__indicator {
        padding: 0;
      }

      .filterSelect__menu {
        margin-top: 0px;
        border-radius: 0;
        border-top: 2px solid ${turquoise};
        z-index: 10;
        min-width: max(100%, 240px);
        max-width: 150%;
        width: max-content;

        .filterSelect__menuTitle {
          padding: 16px;
          padding-bottom: 8px;
          font-family: ${bold};
          text-transform: uppercase;
        }

        .filterSelect__buttonsContainer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-top: 1px solid ${mediumsky};

          button {
            font-size: ${regular};
          }
        }
      }

      ${hasValues && withValuesStyles}
    `;
  },
);

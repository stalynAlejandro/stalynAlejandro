import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';
import { hexToRgba } from '../../../utils/hexToRgba';

export const StOptionContainer = styled.div(
  () => css`
    display: flex;
  `,
);

export const StSelectContainer = styled.label(
  ({
    disabled,
    hasError,
    hasPlaceholder,
    hasValue,
    theme: {
      colors: {
        boston,
        darkergray,
        darkersky,
        darkgray,
        lightersky,
        lightsky,
        mediumsky,
      },
      typography: {
        fontSizes: { big },
      },
    },
    variant,
  }: {
    disabled: boolean;
    hasError: boolean;
    hasPlaceholder: boolean;
    hasValue: boolean;
    theme: ThemeProps;
    variant: 'clean' | 'faded' | 'pijama';
  }) => {
    const errorStyle = `
      border-bottom-color: ${boston}; 
      border-bottom-width: 2px;`;

    const variantFadedStyle = `
      .formSelect__menu {
        background-color: ${lightersky};
      }
    `;

    const variantPijamaStyle = `
      .formSelect__group-heading,
      .formSelect__option {
        border-top: 1px solid ${mediumsky};
      }
      
      .formSelect__option:nth-child(2n) {
        background-color: ${hexToRgba(lightsky, 0.2)};
      }
    `;

    const variantCleanStyle = `
      .formSelect__option {
        &--is-selected:not(.formSelect__menu-list--is-multi .formSelect__option) > div {
          & .option__content:not(.option__content--hasComponent)::after {
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            background-image: url(/images/icon-check.svg);
            background-repeat: no-repeat;
            background-size: 20px;
            filter: brightness(0) invert(1);
          }
        }
      }
    `;

    return css`
      position: relative;
      background-color: white;
      max-width: 100%;
      min-width: 250px;
      border-radius: 4px 4px 0 0;
      border: 1px solid ${lightsky};
      border-bottom-color: ${darkersky};

      ${hasError && errorStyle}

      ${!disabled && '&:hover{cursor:pointer;}'}

      &:focus-within {
        border-bottom-width: 3px;
      }

      .formSelect {
        border: none;
        height: 100%;
      }

      .formSelect__control {
        min-height: auto;
        height: 100%;
        padding: 10px 20px;
        background-color: transparent;
        border: none;
        cursor: inherit;

        &--is-focused {
          box-shadow: none;
        }
      }

      .formSelect__single-value {
        margin: 0;
        min-width: 0;
        overflow: initial;

        grid-area: 1/1/2/3;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
      }

      .formSelect__group,
      .formSelect__menu-list {
        padding: 0;
      }

      .option__content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
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

      .formSelect__group-heading,
      .formSelect__option {
        color: inherit;
        font-size: inherit;
        font-weight: inherit;
        text-transform: inherit;
        padding: 6px 4px;
        margin: 0;
        background-color: transparent;

        &:active {
          background-color: transparent;
        }

        & > div {
          padding: 8px 10px;
          border-radius: 4px;
        }
      }

      .formSelect__group-heading:first-child {
        border-top: none;
      }

      .formSelect__option {
        &:hover {
          & > div {
            background-color: ${lightsky};
            color: ${darkergray};
            cursor: pointer;
          }
        }

        &--is-selected:not(.formSelect__menu-list--is-multi .formSelect__option)
          > div {
          background-color: ${darkersky};
          color: white;
        }

        &--unselect {
          color: ${darkgray};

          button {
            display: block;
            width: 100%;
            text-align: left;
          }
        }
      }

      .formSelect__value-container {
        padding: 0;
        min-width: 0;
        font-size: ${big};
        overflow: initial;
        flex-wrap: nowrap;

        ${hasValue && hasPlaceholder && 'top: 8px;'}

        &:focus-within {
          ${hasPlaceholder && 'top: 8px;'}
        }
      }

      .formSelect__indicator-separator {
        display: none;
      }

      .formSelect__indicator {
        padding: 0;
      }

      .formSelect__clear-indicator {
        display: none;
      }

      .formSelect__menu {
        background-color: 'white';
        margin-top: 1px;
        border-radius: 0;
        border-top: 2px solid ${darkersky};
        border-bottom: 1px solid ${darkersky};
        z-index: 10;
      }

      ${variant === 'pijama' && variantPijamaStyle}
      ${variant === 'clean' && variantCleanStyle}
      ${variant === 'faded' && variantFadedStyle}
    `;
  },
);

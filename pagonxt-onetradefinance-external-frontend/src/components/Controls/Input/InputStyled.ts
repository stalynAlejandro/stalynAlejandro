import NumberFormat from 'react-number-format';
import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';
import { Icon } from '../../Icon';

export const StInput = styled.input(() => css``);

export const StIcon = styled(Icon)(
  () => css`
    position: relative;
    right: -5px;
    top: 1px;
  `,
);

export const StNumberInput = styled(NumberFormat)(() => css``);

export const StInputContainer = styled.label(
  ({
    disabled,
    hasError,
    hasPlaceholder,
    hasValue,
    theme: {
      colors: { boston, darkersky, disabledgray, lightgray, lightsky },
    },
    wide,
  }: {
    disabled: boolean;
    hasError: boolean;
    hasPlaceholder: boolean;
    hasValue: boolean;
    theme: ThemeProps;
    wide: boolean;
  }) => {
    const focusedInput = css`
      top: ${wide ? '10px' : '8px'};
    `;
    const disabledInput = css`
      opacity: 0.6;
      border: 1px solid ${lightgray};
      background-color: ${disabledgray};
    `;
    const errorInput = css`
      border-bottom-width: 2px;
      border-bottom-color: ${boston};
    `;

    return css`
      display: flex;
      position: relative;
      background-color: white;
      border-radius: 4px 4px 0 0;
      min-width: 250px;
      max-width: 100%;
      padding: 12px 20px;
      border: 1px solid ${lightsky};
      border-bottom-color: ${darkersky};

      &:focus-within {
        border-bottom-width: 3px;
      }

      ${disabled && disabledInput}

      ${hasError && errorInput}

      input {
        position: relative;
        width: 100%;
        height: 100%;
        transition: 0.2s ease all;
        z-index: 1;
      }

      ${StInput}, ${StNumberInput} {
        &:focus {
          ${hasPlaceholder && focusedInput}
        }

        ${hasValue && hasPlaceholder && focusedInput};
      }
    `;
  },
);

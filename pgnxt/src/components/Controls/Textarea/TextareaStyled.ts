import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';
import { Icon } from '../../Icon';

export const StContainer = styled.div(() => css``);

export const StCharactersLeft = styled.span(
  ({
    theme: {
      typography: {
        fontSizes: { small },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-size: ${small};
    margin-left: 20px;
  `,
);

export const StClearValueIcon = styled(Icon)(
  () => css`
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
  `,
);

export const StTextarea = styled.textarea(
  () => css`
    min-height: 60px;
    max-height: 160px;
    padding-bottom: 10px;
    position: relative;
    width: 100%;
  `,
);

export const StTextareaContainer = styled.label(
  ({
    disabled,
    hasError,
    hasPlaceholder,
    hasValue,
    theme: {
      colors: { boston, darkersky, lightgray, lightsky },
    },
  }: {
    disabled: boolean;
    hasError: boolean;
    hasPlaceholder: boolean;
    hasValue: boolean;
    theme: ThemeProps;
  }) => {
    const focusedTxt = css`
      top: 10px;
    `;
    const disabledTxt = css`
      opacity: 0.6;
      border: 2px solid ${lightgray};
    `;
    const errorTxt = css`
      border-bottom-width: 2px;
      border-bottom-color: ${boston};
    `;

    return css`
      display: flex;
      position: relative;
      min-height: 80px;
      width: 100%;
      background-color: white;
      border-radius: 4px 4px 0 0;
      padding: 10px 20px;
      border: 1px solid ${lightsky};
      border-bottom-color: ${darkersky};

      &:focus-within {
        border-bottom-width: 3px;
      }

      ${hasError && errorTxt}
      ${disabled && disabledTxt}

      ${StTextarea} {
        &:focus {
          ${hasPlaceholder && focusedTxt}
        }

        ${hasValue && hasPlaceholder && focusedTxt};
      }
    `;
  },
);

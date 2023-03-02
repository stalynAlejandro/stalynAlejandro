import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';
import { Icon } from '../Icon';
import { StTitle } from '../PageTitle/PageTitleStyled';

export const StModalContainer = styled.div(
  ({
    theme: {
      colors: { darkergray },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${hexToRgba(darkergray, 0.6)};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  `,
);

export const StModalContentContainer = styled.div(
  ({
    isWide,
    theme: {
      colors: { darkgray },
    },
  }: {
    isWide: boolean;
    theme: ThemeProps;
  }) => css`
    box-shadow: 0 0 10px ${darkgray};
    position: relative;
    background-color: white;
    border-radius: 4px;
    min-width: 500px;
    ${!isWide && 'max-width: 520px;'}
    width: ${isWide ? '65vw' : '35vw'};
    max-height: calc(100vh - 10%);
    overflow-y: auto;
    padding: 40px 60px;

    @media (max-width: 550px) {
      min-width: auto;
      width: ${isWide ? '95vw' : '90vw'};
      padding: 20px 30px;
    }
  `,
);

export const StCloseIcon = styled(Icon)(
  () => css`
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
  `,
);

export const StModalTitle = styled(StTitle)(
  () => css`
    margin-top: 0;
    margin-bottom: 40px;
  `,
);

export const StModalContent = styled.div(
  () => css`
    font-size: 18px;
  `,
);

export const StModalFooter = styled.div(
  ({ hasContextualButton }: { hasContextualButton: boolean }) => {
    const withContextualButtonStyles = css`
      button {
        width: 25%;
        margin-left: 20px;

        &:first-of-type {
          width: auto;
          margin-left: 0;
          margin-right: auto;
        }
      }
    `;

    return css`
      display: flex;
      justify-content: space-between;

      .filtersModal__acceptButton,
      .filtersModal__cancelButton {
        width: 184px;
      }

      button {
        margin-top: 40px;
        width: 48%;
      }

      ${hasContextualButton && withContextualButtonStyles}
    `;
  },
);

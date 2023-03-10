import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const StLateralModalContainer = styled.div(
  ({
    theme: {
      colors: { darkergray, sky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: 20;

    .lateralModal__background {
      background-color: ${hexToRgba(darkergray, 0.5)};
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .lateralModal__contentWrapper {
      position: absolute;
      top: 0;
      right: 0;
      width: 80%;
      height: 100vh;
      background-color: ${sky};
      display: flex;
      flex-direction: column;

      @media (min-width: 850px) {
        width: 55%;
      }

      .lateralModal__closeIcon {
        position: absolute;
        right: 20px;
        top: 36px;
      }

      .lateralModal__pageTitle {
        border-bottom: none;
        background-color: transparent;

        .pageTitle__wrapper {
          margin-bottom: 32px;
        }
      }

      .lateralModal__childrenContainer {
        overflow-y: auto;
        flex: 1;
      }
    }
  `,
);

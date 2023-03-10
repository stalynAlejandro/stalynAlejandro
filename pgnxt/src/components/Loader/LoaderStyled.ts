import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const StLoaderContainer = styled.div(
  () => css`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${hexToRgba('#FFFFFF', 0.9)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;

    &.loader--contained {
      position: absolute;
    }
  `,
);

export const StPrimaryLoader = styled.div(
  ({
    theme: {
      colors: { santander },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    @keyframes animateCircle {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    position: relative;
    width: 100px;
    aspect-ratio: 1;

    .floating-circle,
    .logo-circle {
      position: absolute;
      left: 50%;
      top: 50%;
      aspect-ratio: 1;
      transform: translate(-50%, -50%);
    }

    .floating-circle {
      width: 80px;
      animation: animateCircle 2s linear infinite;

      &::after {
        content: '';
        display: block;
        background-color: ${santander};
        border-radius: 50%;
        aspect-ratio: 1;
        width: 20px;
      }
    }

    .logo-circle {
      width: 48px;
      background-color: ${santander};
      border-radius: 50%;
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        filter: brightness(0) invert(1);
      }
    }
  `,
);

export const StSecondaryLoader = styled.div(
  ({
    theme: {
      colors: { santander },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    @keyframes animateSmallCircle {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    @keyframes animateSmallCircleDelayed {
      0% {
        transform: translate(-50%, -50%) rotate(-180deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(180deg);
      }
    }

    position: relative;
    width: 40px;
    aspect-ratio: 1;

    .floating-circle {
      width: 40px;
      position: absolute;
      left: 50%;
      top: 50%;
      aspect-ratio: 1;
      animation: animateSmallCircle 2s linear infinite;

      &::after {
        content: '';
        display: block;
        background-color: ${santander};
        border-radius: 50%;
        aspect-ratio: 1;
        width: 14px;
      }
    }

    .floating-circle:not(:first-child) {
      animation: animateSmallCircleDelayed 2s linear infinite;
    }
  `,
);

export const StTitle = styled.h2(
  ({
    theme: {
      colors: { darkgray },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${darkgray};
    margin-top: 16px;
    margin-bottom: 4px;
  `,
);

export const StSubtitle = styled.div(
  ({
    theme: {
      colors: { mediumgray },
      typography: {
        textFonts: { light },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${mediumgray};
    font-family: ${light};
  `,
);

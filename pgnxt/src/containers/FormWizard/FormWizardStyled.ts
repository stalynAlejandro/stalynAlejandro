import styled, { css } from 'styled-components';

import { ContentContainer } from '../../components/ContentContainer';
import { Icon } from '../../components/Icon';
import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const StWizardContainer = styled.div(
  () => css`
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
);

export const StHeader = styled.div(() => css``);

export const StHeaderTitle = styled.h2(
  ({
    theme: {
      colors: { darkgray },
      typography: {
        headlineFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${darkgray};
    font-family: ${bold};
    text-align: center;
    margin: 0;

    > span {
      margin-left: 6px;
    }
  `,
);

export const StTopHeader = styled(ContentContainer)(
  ({
    hideProgressBar,
    theme: {
      colors: { mediumsky },
    },
  }: {
    hideProgressBar: boolean;
    theme: ThemeProps;
  }) => {
    const hiddenBarStyles = `border-bottom: 2px solid ${mediumsky};`;

    return css`
      ${hideProgressBar && hiddenBarStyles}

      > div {
        display: grid;
        grid-template-columns: 30% 40% 20% 10%;
        padding: 20px;
      }
    `;
  },
);

export const StProgressBar = styled.div(
  ({
    progress,
    theme: {
      colors: { lightsky, santander },
    },
  }: {
    progress: number;
    theme: ThemeProps;
  }) => css`
    position: relative;
    height: 4px;
    width: 100%;
    background-color: ${lightsky};

    &::after {
      content: '';
      display: block;
      width: ${progress}%;
      background-color: ${santander};
      height: 4px;
    }
  `,
);

export const StFormContainer = styled.div(
  ({
    theme: {
      colors: { lightsky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    flex: 1;
    background-color: ${hexToRgba(lightsky, 0.3)};
    padding-bottom: 20px;
  `,
);

export const StFooter = styled(ContentContainer)(
  ({
    theme: {
      colors: { mediumsky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    position: sticky;
    bottom: 0;
    background-color: white;
    margin-top: auto;
    margin-bottom: 0;
    border-top: 2px solid ${mediumsky};
    z-index: 5;
  `,
);

export const StFooterStepIndicator = styled.div(
  ({
    theme: {
      colors: { darkergray },
    },
  }: {
    theme: ThemeProps;
  }) => {
    const lineStyles = css`
      content: '';
      display: block;
      width: calc(50% - 20px);
      height: 2px;
      background-color: ${darkergray};
      position: absolute;
      top: calc(50% - 1px);
      z-index: 1;
    `;

    return css`
      width: 100%;
      justify-content: center;
      display: flex;
      position: relative;
      padding: 3px;
      align-items: center;

      &::before {
        ${lineStyles}
        left: 0;
      }

      &::after {
        ${lineStyles}
        right: 0;
      }
    `;
  },
);

const StFooterContent = css`
  max-width: 65%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;

  @media (max-width: 560px) {
    max-width: 100%;
  }
`;

export const StFinishButtonContainer = styled.div(
  () => css`
    ${StFooterContent}

    max-width: 90%;
    min-width: 450px;
    padding: 25px;
    margin-bottom: 0;

    @media (min-width: 720px) {
      max-width: 70%;
    }

    @media (min-width: 960px) {
      max-width: 50%;
    }

    > span {
      margin-left: 4px;
    }
  `,
);

export const StFooterStepsCircles = styled.ul(
  () => css`
    ${StFooterContent}

    li {
      flex-basis: 0;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      &:first-child
        ${StFooterStepIndicator}::before,
        &:last-child
        ${StFooterStepIndicator}::after {
        display: none;
      }
    }
  `,
);

interface FooterStepsProps {
  isActive: boolean;
  isCompleted: boolean;
  theme: ThemeProps;
}

export const StFooterStepTitle = styled.span(
  ({ isActive, isCompleted }: FooterStepsProps) => css`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
    height: 50px;
    ${isCompleted && 'font-weight: bold;'}
    ${isCompleted || isActive ? 'opacity: 1;' : 'opacity:0.7;'}
  `,
);

export const StFooterStepCircle = styled.div(
  ({
    isActive,
    isCompleted,
    theme: {
      colors: { boston, darkergray },
    },
  }: FooterStepsProps) => {
    const completedStyles = css`
      background-color: ${darkergray};
      border-width: 0;

      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background-image: url('/images/icon-check-bold.svg');
        filter: brightness(0) invert(1);
      }
    `;

    const activeStyles = `border-color: ${boston};`;

    return css`
      width: 20px;
      position: relative;
      height: auto;
      aspect-ratio: 1;
      border-radius: 50%;
      border-width: 4px;
      border-style: solid;
      border-color: black;

      ${isCompleted && completedStyles}
      ${isActive && activeStyles}
      ${isCompleted || isActive ? 'opacity: 1;' : 'opacity:0.4;'}
    `;
  },
);

export const StFooterStepsBgLine = styled.div(
  ({ isEnding }: { isEnding: boolean }) => {
    const endingStyles = css`
      width: calc(50% - 25px);
      left: 0;
      right: auto;

      &::after {
        left: auto;
        right: -13px;
      }
    `;

    return css`
      display: block;
      width: calc(50%);
      height: 100%;
      background-color: #e8f3f6;
      position: absolute;
      left: auto;
      right: 0;

      &::after {
        content: '';
        display: block;
        position: absolute;
        height: 100%;
        width: auto;
        aspect-ratio: 1;
        background-color: #e8f3f6;
        border-radius: 50%;
        left: -13px;
        right: auto;
      }

      ${isEnding && endingStyles}
    `;
  },
);

export const StCheckIcon = styled(Icon)(
  () => css`
    filter: brightness(0) invert(1);
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  `,
);

export const StUsername = styled.div(
  () => css`
    position: fixed;
    top: 10px;
    left: 10px;
    opacity: 0.5;
  `,
);

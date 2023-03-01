import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { StepSubtitle } from '../StepSubtitle';
import { TextButton } from '../TextButton';

export const StContextualContainer = styled.div(
  () => css`
    > button {
      margin-left: 16px;
    }
  `,
);

export const StGenericDataContainer = styled.div(
  ({
    theme: {
      colors: { darkgray },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${darkgray};
  `,
);

export const StRequestReference = styled.h2(
  ({
    theme: {
      typography: {
        headlineFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-family: ${bold};
    margin-bottom: 8px;
  `,
);

const StDataContainer = styled.div(
  ({
    theme: {
      colors: { mediumsky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    .viewRequestDetails__dataContent {
      padding: 16px;
      display: flex;
      justify-content: normal;
      border-bottom: 2px solid ${mediumsky};
      flex-wrap: wrap;

      > div {
        width: 25%;
        margin-bottom: 16px;

        &.wide {
          width: 100%;
        }

        > span {
          display: flex;

          &.bold {
            margin-top: 4px;
          }
        }
      }
    }
  `,
);

export const StVisibleDataContainer = styled(StDataContainer)(() => css``);

export const StHiddenDataContainer = styled(StDataContainer)(
  ({
    theme: {
      colors: { sky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    background-color: ${sky};
  `,
);

export const StViewDetailsButtonContainer = styled.div(
  () => css`
    padding-top: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
);

export const StButtonsContainer = styled.div(
  () => css`
    padding-top: 8px;
    margin-bottom: 32px;

    > button {
      margin-right: 32px;
      min-width: 200px;
    }
  `,
);

export const StStepSubtitle = styled(StepSubtitle)(
  ({
    theme: {
      typography: {
        headlineFonts: { regular },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-family: ${regular};
  `,
);

export const StDataTitle = styled(StStepSubtitle)(
  ({
    theme: {
      colors: { mediumsky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    padding-bottom: 8px;
    border-bottom: 2px solid ${mediumsky};
  `,
);

export const StWarningNotificationContent = styled.div(
  () => css`
    > div {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;

      @media (min-width: 600px) {
        flex-direction: row;
      }

      span {
        display: block;
        width: 100%;

        @media (min-width: 600px) {
          &.bold {
            width: min(20%, 150px);
          }
        }
      }
    }
  `,
);

export const StDocumentationFile = styled(TextButton)(
  () => css`
    margin-top: 6px;
    margin-left: -3px;
    display: block;
    text-align: left;
    font-size: 90%;
  `,
);

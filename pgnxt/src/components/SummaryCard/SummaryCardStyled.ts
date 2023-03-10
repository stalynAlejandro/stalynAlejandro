import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { StepSubtitle } from '../StepSubtitle';
import { TextButton } from '../TextButton';

export const StSummaryCardActionItem = styled(TextButton)(() => css``);

export const StSummaryCardSubtitle = styled(StepSubtitle)(() => css``);

export const StSummaryCardContainer = styled.div(
  ({
    theme: {
      colors: { darkgray, mediumsky, turquoise },
      iconColors: { darkturquoise },
      typography: {
        fontSizes: { big },
        headlineFonts: { regular },
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    /* Both vertical & horizontal*/
    border-radius: 4px;
    border: 1px solid ${mediumsky};
    padding: 20px;
    padding-bottom: 30px;
    background-color: white;
    width: 100%;

    .summaryCard__titleContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .summaryCard__title {
        margin: 0;
        font-size: 24px;
        margin-bottom: 24px;
        color: ${darkgray};
        font-family: ${regular};
      }

      .summaryCard__collapsibleArrow {
        filter: ${darkturquoise};
      }
    }

    ul {
      padding: 0;
      margin: 0;

      li {
        margin-top: 16px;
        border-bottom: 1px solid ${mediumsky};
        position: relative;

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
      }
    }

    .summaryCard__infoContainer {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      > div {
        padding: 0 4px;
        width: 25%;
        vertical-align: middle;
        margin-bottom: 12px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    ${StSummaryCardSubtitle} {
      margin-top: 0;
      color: ${turquoise};
      font-size: calc(${big} + 2px);
      font-family: ${regular};
    }

    ${StSummaryCardActionItem} {
      display: flex;
      margin-left: auto;
      margin-bottom: 4px;

      &.summaryCard__editIcon {
        align-items: center;

        &.summaryCard__editIcon--withTitle {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }

    .summaryCard__infoField--collapsible {
      margin-top: 10px;
      flex-basis: 100%;
    }

    .summaryCard__fieldName {
      opacity: 0.8;
      display: block;
    }

    .summaryCard__fieldValue {
      display: flex;
      align-items: center;
      white-space: break-spaces;
      font-family: ${bold};

      &.summaryCard__fieldValue--shortened {
        width: 60%;
      }
    }

    /* Vertical direction */
    &.summaryCard--vertical {
      .summaryCard__infoContainer {
        flex-wrap: wrap;

        > div {
          width: 100%;
          display: flex;
          flex-shrink: 0;
          margin-bottom: 16px;

          .summaryCard__fieldValue {
            margin-left: auto;
            justify-content: end;
          }
        }
      }
    }

    /* Horizontal direction */
    &.summaryCard--horizontal {
      ul li {
        padding-bottom: 24px;
        margin-top: 24px;

        &:first-child {
          margin-top: 8px;
        }

        .summaryCard__fieldName {
          margin-bottom: 4px;
        }

        .summaryCard__infoContainer > div {
          margin-bottom: 16px;
        }
      }
    }
  `,
);

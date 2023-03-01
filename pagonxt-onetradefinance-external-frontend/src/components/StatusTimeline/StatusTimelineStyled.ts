import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const StStatusTimelineContainer = styled.div(
  ({
    theme: {
      colors: { darkergray, darkgray, lightgray, mediumgray, purple },
      typography: {
        fontSizes: { big },
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    .statusTimeline__listItem {
      display: flex;
      flex-direction: row;
      min-height: 48px;
      margin-bottom: 8px;

      .statusTimeline__statusContainer {
        padding-bottom: 20px;

        .statusTimeline__title {
          font-size: ${big};
          font-family: ${bold};
          margin-bottom: 8px;
        }

        .statusTimeline__medatadataContainer {
          color: ${darkgray};

          span {
            vertical-align: baseline;
          }

          .statusTimeline__datetime {
            color: ${mediumgray};
          }
        }

        .statusTimeline__content {
          margin-top: 32px;
        }
      }

      .statusTimeline__pathContainer {
        position: relative;
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &.statusTimeline__listItem--pending .statusTimeline__title {
        color: ${mediumgray};
      }

      &.statusTimeline__listItem--active
        .statusTimeline__pathContainer::before {
        content: '';
        display: block;
        position: absolute;
        width: 20px;
        height: 100%;
        border-radius: 50px;
        background-color: #e8f3f6;
      }

      .statusTimeline__path {
        position: relative;
        flex: 1;
        width: 2px;
        margin-top: 8px;
        border-radius: 4px;

        background-color: ${darkergray};
      }

      &:last-child .statusTimeline__path {
        display: none;
      }

      .statusTimeline__circle {
        z-index: 1;
        display: inline-flex;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        background-color: transparent;
        border-width: 4px;
        border-style: solid;
        border-color: ${lightgray};
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      &.statusTimeline__listItem--active .statusTimeline__circle {
        border-color: ${purple};
      }

      &.statusTimeline__listItem--completed .statusTimeline__circle {
        background-color: ${darkergray};
        padding: 2px;
        color: white;
        border: none;

        img {
          filter: brightness(0) invert(1);
          width: 100%;
        }
      }
    }
  `,
);

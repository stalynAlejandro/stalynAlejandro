import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const StCommentsListContainer = styled.div(
  ({
    theme: {
      colors: { info, mediumgray, mediumsky },
      typography: {
        fontSizes: { big, regular },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    display: flex;
    flex: 1;
    flex-direction: column;

    .commentsList__list {
      overflow-y: auto;

      .commentsList__listItem {
        padding: 16px;
        background-color: white;
        border: 1px solid ${mediumsky};
        margin-bottom: 16px;
        border-radius: 4px;
        font-size: ${big};

        &:hover {
          border-color: ${info};
        }

        .commentsList__commentHeader {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 16px;

          .commentsList__authorAvatar {
            width: 50px;
            aspect-ratio: 1;
            margin-right: 8px;
          }

          .commentsList__commentTitle {
            margin-bottom: 8px;

            span {
              vertical-align: baseline;
            }
          }

          .commentsList__commentDate {
            color: ${mediumgray};
            font-size: ${regular};
          }
        }
      }
    }
  `,
);

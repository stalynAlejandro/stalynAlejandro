import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { ContentContainer } from '../ContentContainer';

export const StFormStepContainer = styled.div(
  () => css`
    padding: 40px 0;
  `,
);

export const StFieldsContainer = styled(ContentContainer)(
  ({
    theme: {
      spacings: { formWidth, reducedFormWidth },
    },
    withLateralContent,
  }: {
    theme: ThemeProps;
    withLateralContent: boolean;
  }) => {
    const withLateralStyles = css`
      > div {
        width: ${formWidth};
      }

      > div > form {
        padding-right: 0;

        @media (min-width: 900px) {
          padding-right: 40px;
        }

        @media (min-width: 1120px) {
          padding-right: 100px;
        }
      }
    `;

    return css`
      && {
        justify-content: center;
      }

      > div {
        width: ${reducedFormWidth};
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-wrap: nowrap;
      }

      > div > form {
        flex: 1;
        padding: 4px;
        overflow: hidden;

        align-content: flex-start;
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .form-file-picker {
          margin-bottom: 20px;
        }

        & + .summary-card {
          width: 400px;
          display: none;
          align-self: flex-start;
          flex-shrink: 0;

          @media (min-width: 900px) {
            display: block;
          }
        }
      }

      ${withLateralContent && withLateralStyles}
    `;
  },
);

import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';
import { Select } from '../Select';

export const StSelect = styled(Select)(
  ({
    theme: {
      colors: { lightsky, mediumsky },
      typography: {
        fontSizes: { small },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    border: none;
    font-size: 12px;

    .formSelect__control {
      min-height: auto;
      background-color: white;
      padding: 2px 8px;
      padding-right: 4px;
      border: 1px solid ${lightsky};
      border-radius: 4px 4px 0 0;

      &:hover {
        border-color: ${mediumsky};
      }

      &--is-focused {
        box-shadow: 0 0 0 1px ${mediumsky};
      }
    }

    .formSelect__value-container {
      font-size: ${small};
      padding: 0;
    }

    .formSelect__indicator {
      padding: 0 5px;
    }

    .formSelect__indicator-separator {
      display: block;
      margin: 0;
      background-color: ${lightsky};
    }

    .formSelect__menu {
      border-top: none;
      border-bottom: none;
    }

    .formSelect__option {
      padding: 4px;
    }
  `,
);
export const StSelectContainer = styled.div(
  () => css`
    position: relative;
  `,
);

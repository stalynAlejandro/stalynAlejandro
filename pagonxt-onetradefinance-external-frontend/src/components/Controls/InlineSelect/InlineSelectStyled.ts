import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';
import { Select } from '../Select';

export const StSelect = styled(Select)(
  ({
    theme: {
      colors: { lightsky, mediumsky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    border: none;

    .formInlineSelect__control {
      min-height: auto;
      border-color: ${lightsky};
      border-radius: 4px 4px 0 0;

      .formInlineSelect__value-container {
        padding-right: 0;
        padding-top: 3px;
      }

      &:hover {
        border-color: ${mediumsky};
      }

      &--is-focused {
        box-shadow: 0 0 0 1px ${mediumsky};
      }
    }

    .formInlineSelect__indicator {
      padding: 0 5px;

      &-separator {
        display: none;
      }
    }

    .formInlineSelect__menu {
      width: fit-content;
      border: 1px solid ${lightsky};
    }
  `,
);

export const StSelectContainer = styled.div(
  () => css`
    position: relative;
  `,
);

export const StDropdownIndicatorContainer = styled.div(
  () => css`
    display: inline-flex;
    flex-direction: column;

    img {
      width: 18px;
    }
  `,
);

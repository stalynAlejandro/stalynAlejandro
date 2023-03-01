import styled, { css } from 'styled-components';

import { BoldTitle } from '../../components/Common/Common';
import { Select } from '../../components/Controls/Select';
import { Modal } from '../../components/Modal';
import { ThemeProps } from '../../resources/theme';

export const StModal = styled(Modal)(
  () => css`
    .modal__contentContainer {
      width: 90vw;

      @media (min-width: 990px) {
        width: 936px;
      }
    }
  `,
);

export const StFilterFieldsContainer = styled.div(
  ({
    theme: {
      colors: { lightersky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .filtersModal__fieldClear {
      width: 100%;
    }

    .filtersModal__fieldContainer {
      display: flex;
      flex-shrink: 0;
      margin: 10px 0;
      width: calc(50% - 10px);

      .form-field {
        background-color: ${lightersky};
        width: 100%;
      }
    }

    @media (max-width: 730px) {
      .filtersModal__fieldContainer {
        width: 100%;
      }

      .filtersModal__fieldClear,
      .filtersModal__fieldSeparator {
        display: none;
      }
    }
  `,
);

export const StBoldTitle = styled(BoldTitle)(
  () => css`
    font-size: 18px;
    margin: 32px 0 10px 0;
  `,
);

export const StSelect = styled(Select)(
  ({
    theme: {
      typography: {
        fontSizes: { big },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    .option__label {
      font-size: ${big};
    }
  `,
);

import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { Modal } from '../Modal';

export const StModal = styled(Modal)(
  ({
    theme: {
      colors: { sky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    & > div {
      background-color: ${sky};
      padding-bottom: 60px;
      width: 90vw;
      max-width: 1044px;
    }

    .modal__content {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }

    .actionModal__action {
      width: 284px;

      @media (max-width: 1150px) {
        width: 260px;
      }

      @media (max-width: 1030px) {
        width: 240px;
      }

      @media (max-width: 960px) {
        width: 220px;
      }

      @media (max-width: 890px) {
        flex: 1;
        margin: 0 8px;
      }
    }
  `,
);

import styled, { css } from 'styled-components';

import { LateralModal } from '../LateralModal';

export const StHistoricModalContainer = styled(LateralModal)(
  () => css`
    .lateralModal__contentWrapper {
      @media (min-width: 620px) {
        width: 80%;
      }

      @media (min-width: 1200px) {
        width: 55%;
      }
    }
  `,
);

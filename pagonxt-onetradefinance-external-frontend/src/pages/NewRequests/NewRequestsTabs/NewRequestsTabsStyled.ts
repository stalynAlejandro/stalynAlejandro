import styled, { css } from 'styled-components';

import { ActionCard } from '../../../components/ActionCard';

export const StActionsContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  `,
);

export const StActionCard = styled(ActionCard)(
  () => css`
    width: 100%;
    margin-bottom: 20px;

    @media (min-width: 800px) {
      width: 49%;
    }
  `,
);

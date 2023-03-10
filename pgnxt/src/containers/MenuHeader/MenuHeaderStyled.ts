import styled, { css } from 'styled-components';

import { ContentContainer } from '../../components/ContentContainer';

export const StMenuHeaderContainer = styled(ContentContainer)(
  ({
    theme: {
      colors: { boston },
    },
  }) => css`
    background-color: ${boston};
  `,
);

export const StContentContainer = styled.div(
  () => css`
    padding-top: 16px;
    padding-bottom: 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
);

export const StLogo = styled.img(
  () => css`
    width: 144px;
    filter: brightness(0) invert(1);
  `,
);

export const StUserContainer = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: white;

    img {
      padding: 1px;
      border-radius: 50%;
      background-color: white;
      margin-right: 8px;
    }
  `,
);

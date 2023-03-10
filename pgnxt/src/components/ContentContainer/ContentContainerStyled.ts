import styled, { css } from 'styled-components';

export const StContentContainer = styled.div(
  ({
    theme: {
      spacings: { maxWidth, sidePadding },
    },
  }) => css`
    width: 100%;
    display: flex;
    justify-content: center;

    & > div {
      width: 100%;
      max-width: ${maxWidth};
      padding-left: ${sidePadding};
      padding-right: ${sidePadding};
    }
  `,
);

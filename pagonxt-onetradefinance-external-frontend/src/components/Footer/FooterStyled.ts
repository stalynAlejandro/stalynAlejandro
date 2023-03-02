import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { ContentContainer } from '../ContentContainer';

export const StFooterContainer = styled(ContentContainer)(
  ({
    theme: {
      colors: { mediumsky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    border-top: 1px solid ${mediumsky};
    margin-top: 60px;
  `,
);

export const StFooter = styled.div(
  () =>
    css`
      padding-top: 32px;
      padding-bottom: 32px;
      display: flex;
      justify-content: space-between;
    `,
);

export const StLogo = styled.img(
  () => css`
    width: 144px;
    align-self: center;
  `,
);

export const StLinks = styled.ul(
  () => css`
    display: flex;
    flex-direction: row;

    li {
      margin: 0 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  `,
);

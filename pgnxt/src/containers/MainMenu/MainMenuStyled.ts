import styled, { css } from 'styled-components';

import { ContentContainer } from '../../components/ContentContainer';
import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const StContentContainer = styled(ContentContainer)(() => css``);

export const StMainMenu = styled.div(
  () => css`
    box-shadow: 0 0 10px lightgray;
    z-index: 10;
  `,
);

export const StMenuItems = styled.ul(
  () => css`
    display: flex;
    flex-direction: row;
    margin: 0;
  `,
);

export const StMenuItem = styled.li(
  ({
    isActive,
    theme: {
      colors: { santander },
    },
  }: {
    isActive: boolean;
    theme: ThemeProps;
  }) => css`
    border-bottom: 1px solid ${isActive ? santander : 'transparent'};
    background-color: ${isActive ? hexToRgba(santander, 0.05) : 'transparent'};
    cursor: pointer;

    a {
      display: inline-block;
      padding: 10px 18px;
      text-decoration: none;
      color: inherit;
      font-size: inherit;
      font-family: inherit;
    }
  `,
);

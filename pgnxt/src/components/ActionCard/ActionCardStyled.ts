import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';
import { Icon } from '../Icon';

export const StActionCardContainer = styled.div(
  ({
    theme: {
      colors: { lightgray, lightsky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    padding: 16px;
    padding-bottom: 0px;
    background-color: ${hexToRgba(lightsky, 0.3)};
    border-radius: 2px;
    box-shadow: 2px 2px 10px ${lightgray};
  `,
);

export const StCardTitle = styled.h2(
  ({
    theme: {
      colors: { darkgray },
      typography: {
        headlineFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${darkgray};
    font-family: ${bold};
    margin: 0;
  `,
);

export const StActionsContainer = styled.ul(
  () =>
    css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    `,
);

export const StAction = styled.li(
  () => css`
    width: 49%;
    padding: 6px;
    cursor: pointer;
    margin: 10px 0;
  `,
);

export const StActionTitleContainer = styled.div(
  () => css`
    margin-bottom: 10px;
  `,
);

export const StActionIcon = styled(Icon)(
  () =>
    css`
      margin-right: 4px;
    `,
);

export const StActionTitle = styled.span(
  ({
    theme: {
      colors: { santander },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${santander};
  `,
);

export const StActionDescription = styled.div(() => css``);

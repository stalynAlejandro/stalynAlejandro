import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { Icon } from '../Icon';

export const StActionItemContainer = styled.div(
  ({
    theme: {
      colors: { darksky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin-bottom: 15px;
    width: 100%;
    background-color: white;
    border-radius: 4px;
    border: 1px solid ${darksky};
    padding: 20px;
    display: flex;
    flex-direction: row;
  `,
);

export const StNameContainer = styled.div(
  () => css`
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
);

export const StIcon = styled(Icon)(
  ({
    theme: {
      iconColors: { darkturquoise },
    },
  }: {
    theme: ThemeProps;
  }) =>
    css`
      margin-right: 20px;
      filter: ${darkturquoise};
    `,
);

export const StName = styled.div(
  ({
    theme: {
      typography: {
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-family: ${bold};
    margin-bottom: 4px;
  `,
);

export const StDescription = styled.div(
  ({
    theme: {
      typography: {
        fontSizes: { small },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-size: ${small};
    opacity: 0.6;
  `,
);

export const StActionContainer = styled.div(
  ({
    theme: {
      colors: { santander },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${santander};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
  `,
);

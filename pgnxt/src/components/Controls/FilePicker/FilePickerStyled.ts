import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';
import { Button } from '../../Button';
import { Icon } from '../../Icon';

export const StFilePickerContainer = styled.div(
  ({
    theme: {
      colors: { mediumsky },
    },
  }: {
    theme: ThemeProps;
  }) => {
    const borderColor = mediumsky;
    return css`
      flex: auto;
      width: 100%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      border: 3px dashed ${mediumsky};
      border-radius: 2px;
      background-color: white;
      outline: none;

      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='${borderColor}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
      border-radius: 4px;
    `;
  },
);

export const StFilePickerInput = styled.input(() => css``);

export const StUploadIcon = styled(Icon)(
  ({
    theme: {
      iconColors: { darkturquoise },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    filter: ${darkturquoise};
    margin-bottom: 16px;
  `,
);

export const StTextLabel = styled.div(
  ({
    theme: {
      typography: {
        fontSizes: { subtitle },
        headlineFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-size: ${subtitle};
    font-family: ${bold};
    margin-bottom: 8px;
  `,
);

export const StSubtextLabel = styled.div(
  ({
    theme: {
      colors: { darkgray },
    },
  }: {
    theme: ThemeProps;
  }) =>
    css`
      color: ${darkgray};
      opacity: 0.6;
      margin-bottom: 20px;
    `,
);

export const StButton = styled(Button)(
  () => css`
    padding-top: 4px;
    padding-bottom: 4px;
  `,
);

import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const StStepTitleContainer = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `,
);

export const StTitleContainer = styled.div(
  () => css`
    margin: 0 20px;
    display: flex;
    align-items: center;
  `,
);

export const StNumber = styled.span(
  ({
    theme: {
      colors: { darkgray },
      typography: {
        fontSizes: { title },
        headlineFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-family: ${bold};
    display: inline-flex;
    margin-right: 12px;
    vertical-align: middle;
    font-size: calc(${title} - 2px);
    color: white;
    border-radius: 4px;
    background-color: ${darkgray};
    align-items: center;
    justify-content: center;
    height: 32px;
    width: auto;
    aspect-ratio: 1;
  `,
);

export const StTitle = styled.h2(
  ({
    theme: {
      typography: {
        fontSizes: { title },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    display: inline-block;
    vertical-align: middle;
    font-size: ${title};
  `,
);

const StRightLine = css`
  margin-left: auto;
  width: auto;
  flex: 1;
`;

export const StLine = styled.div(
  ({
    centerTitle = false,
    isLeft,
    shorterLines,
    theme: {
      colors: { mediumsky },
      spacings: { formWidth, reducedFormWidth },
    },
  }: {
    centerTitle?: boolean;
    isLeft: boolean;
    shorterLines: boolean;
    theme: ThemeProps;
  }) => {
    const notCenteredStyles = css`
      flex: 0 0 auto;
      width: calc((100vw - ${shorterLines ? reducedFormWidth : formWidth}) / 2);
    `;

    return css`
      display: block;
      height: 1px;
      background-color: ${mediumsky};
      position: relative;
      top: calc(50% + 1px);

      ${(!centerTitle && notCenteredStyles) || 'flex: 1;'}

      ${isLeft ? 'margin-right: auto;' : StRightLine}
    `;
  },
);

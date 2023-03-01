import styled, { css } from 'styled-components';
import CurrencyFlag from 'react-currency-flags';

import { ThemeProps } from '../../resources/theme';

export const StCurrencyContainer = styled.span(
  ({
    showBorder,
    showFlag,
    theme: {
      colors: { darkergray, mediumsky },
      typography: {
        fontSizes: { big, small },
      },
    },
  }: {
    showBorder: boolean;
    showFlag: boolean;
    theme: ThemeProps;
  }) => {
    const showBorderStyles = `
    background-color: white;
    color: ${darkergray};
    border: 1px solid ${mediumsky};
    border-radius: 2px;`;

    const flagWoBorderStyles = `
    font-size: ${big};
    width:auto;
  `;

    return css`
      height: 25px;
      width: 40px;

      ${showFlag && 'width: 54px;'}

      font-size: ${small};
      display: inline-flex;
      justify-content: center;
      align-items: center;

      ${showBorder && showBorderStyles}

      ${showFlag && !showBorder && flagWoBorderStyles}
    `;
  },
);

export const StCurrencyFlag = styled(CurrencyFlag)(
  ({ showBorder }: { showBorder: boolean }) => {
    const noBorderStyles = `
      height: 24px;
      width: 24px;
      margin-right: 8px;
      `;

    return css`
      flex-shrink: 0;
      flex-grow: 0;
      border-radius: 50%;
      background-position: center;
      margin-right: 4px;
      height: 16px;
      width: 16px;

      ${!showBorder && noBorderStyles}
    `;
  },
);

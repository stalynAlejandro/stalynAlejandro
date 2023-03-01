import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';

export const StRadioButtonCard = styled.label(
  ({
    isChecked,
    theme: {
      colors: { mediumsky, turquoise },
    },
  }: {
    isChecked: boolean;
    theme: ThemeProps;
  }) => {
    const checkedStyles = `border-color: ${turquoise};`;

    return css`
      padding: 20px;
      border: 1px solid ${mediumsky};
      background-color: white;
      border-radius: 4px;
      display: flex;
      align-items: center;

      ${isChecked && checkedStyles}
    `;
  },
);

export const StDescription = styled.span(
  ({
    theme: {
      typography: {
        fontSizes: { big },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin-left: auto;
    font-size: ${big};
  `,
);

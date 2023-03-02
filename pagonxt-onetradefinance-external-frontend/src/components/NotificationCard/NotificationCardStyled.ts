import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { Icon } from '../Icon';

export const StIcon = styled(Icon)(
  ({
    theme: {
      iconColors: { darkyellow },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    filter: ${darkyellow};
    margin-right: 12px;
  `,
);

export const StTitle = styled.div(
  ({
    theme: {
      typography: {
        fontSizes: { big },
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-size: ${big};
    font-family: ${bold};
  `,
);

export const StSubtitle = styled.div(
  ({
    theme: {
      typography: {
        fontSizes: { big },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-size: ${big};
    margin-top: 6px;
  `,
);

export const StNotificationContainer = styled.div(
  ({
    theme: {
      colors: { darkergray, darkyellow, yellow },
    },
  }: {
    theme: ThemeProps;
    type: string;
  }) => css`
    border: 1px solid ${darkyellow};
    background-color: ${yellow};
    color: ${darkergray};
    border-radius: 4px;
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  `,
);

export const StContentContainer = styled.div(
  () => css`
    margin-top: 16px;
  `,
);

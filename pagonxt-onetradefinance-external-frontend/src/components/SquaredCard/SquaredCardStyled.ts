import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';
import { BoldTitle } from '../Common/Common';
import { Icon } from '../Icon';

export const StSquaredCardContainer = styled.div(
  ({
    theme: {
      colors: { mediumsky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    aspect-ratio: 1;
    width: 270px;
    padding: 20px;
    background-color: white;
    border: 1px solid ${mediumsky};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    box-shadow: 2px 2px 6px ${hexToRgba('#000000', 0.1)};
  `,
);

export const StIcon = styled(Icon)(
  ({
    theme: {
      iconColors: { darkturquoise },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    filter: ${darkturquoise};
    margin-bottom: 20px;
  `,
);

export const StTitle = styled(BoldTitle)(
  ({
    theme: {
      typography: {
        fontSizes: { subtitle },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin-bottom: 56px;
    font-size: ${subtitle};
  `,
);

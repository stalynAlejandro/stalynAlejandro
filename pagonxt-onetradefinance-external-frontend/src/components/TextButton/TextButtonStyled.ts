import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { Icon } from '../Icon';

export const StButton = styled.button(
  ({
    theme: {
      colors: { santander },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${santander};
    cursor: pointer;
  `,
);

export const StLeftIcon = styled(Icon)(
  () =>
    css`
      margin-right: 4px;
    `,
);

export const StRightIcon = styled(Icon)(
  () =>
    css`
      margin-left: 4px;
    `,
);

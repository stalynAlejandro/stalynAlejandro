import styled, { css } from 'styled-components';

import { Checkbox } from '../../../../components/Controls/Checkbox';
import { ThemeProps } from '../../../../resources/theme';

export const StCheckbox = styled(Checkbox)(
  () => css`
    font-size: 16px;
  `,
);

export const StLabelHasAccount = styled.label(
  ({
    theme: {
      typography: {
        fontSizes: { big },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    display: block;
    width: 100%;
    margin-bottom: 20px;

    > span {
      font-size: ${big};
      margin-right: 20px;
    }

    > label {
      margin-right: 16px;
    }
  `,
);

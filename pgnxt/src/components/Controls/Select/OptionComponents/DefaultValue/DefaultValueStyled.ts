import styled, { css } from 'styled-components';

import { Currency } from '../../../../Currency';

export const StCurrency = styled(Currency)(
  ({ context }: { context: string }) => css`
    position: relative;
    flex-shrink: 0;

    ${context === 'value' && 'top: -8px;'}
  `,
);

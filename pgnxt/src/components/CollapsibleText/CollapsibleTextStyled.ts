import styled, { css } from 'styled-components';

import { TextButton } from '../TextButton';

export const StCollapsibleTextContainer = styled.div(
  ({ align }: { align: string }) => {
    const alignRight = `align-items: end;`;

    return css`
      width: 100%;
      display: flex;
      flex-direction: column;

      ${align === 'right' && alignRight}
    `;
  },
);

export const StCollapsibleText = styled.div(
  ({ isCollapsed }: { isCollapsed: boolean }) => {
    const collapsed = `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;

    return css`
      max-width: 100%;

      > div {
        ${isCollapsed && collapsed}
      }
    `;
  },
);

export const StTextButton = styled(TextButton)(
  () => css`
    align-self: end;
    margin-top: 8px;
  `,
);

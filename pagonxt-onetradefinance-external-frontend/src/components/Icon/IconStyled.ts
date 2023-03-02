import styled, { css } from 'styled-components';

export const StIcon = styled.img(
  ({ onClick, size }: { onClick: any; size?: number }) => css`
    width: ${size}px;
    display: inline-block;
    ${onClick && 'cursor: pointer;'}
  `,
);

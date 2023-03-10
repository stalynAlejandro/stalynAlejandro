import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';

export const StCheckboxContainer = styled.label(
  ({
    theme: {
      colors: { lightgray, turquoise },
      iconColors: { darkturquoise },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    flex-direction: row;
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    input[type='checkbox'] {
      width: 0;
      height: 0;
      opacity: 0;
      margin: 0;
    }

    input[type='checkbox'] + div {
      background-color: white;
      border-radius: 2px;
      width: 20px;
      padding: 2px;
      aspect-ratio: 1;
      overflow: hidden;
      border: 1px solid ${lightgray};
      display: inline-flex;
      margin-right: 10px;
      flex-shrink: 0;
      flex-grow: 0;
      justify-content: center;
      align-items: center;
    }

    input[type='checkbox']:checked + div {
      border-color: ${turquoise};
      outline: 2px solid ${turquoise};
    }

    input[type='checkbox']:checked + div::after {
      content: '';
      width: 130%;
      aspect-ratio: 1;
      flex-shrink: 0;
      background-image: url(/images/icon-check-bold.svg);
      filter: ${darkturquoise};
    }

    span {
      display: inline-flex;
    }
  `,
);

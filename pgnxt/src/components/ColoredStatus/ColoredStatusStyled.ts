import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';

export const statusColors: {
  [key: string]: { borderColor: string; color: string };
} = {
  confirmed: {
    borderColor: '#1BB3BC',
    color: '#D2F0F2',
  },
  default: {
    borderColor: '#63BA68',
    color: '#e0f2e1',
  },
  draft: {
    borderColor: '#b8672b',
    color: '#efdbd3',
  },
  executing: {
    borderColor: '#1db3bc',
    color: '#d2f0f2',
  },
  pending: {
    borderColor: '#ffcc35',
    color: '#fff5d7',
  },
  returned: {
    borderColor: '#a44270',
    color: '#ecd7e1',
  },
};

export const StColoredStatus = styled.div(
  ({
    status,
    theme: {
      colors: { darkgray },
      typography: {
        textFonts: { bold },
      },
    },
  }: {
    status: string;
    theme: ThemeProps;
  }) => {
    const { borderColor, color } = statusColors[status] || statusColors.default;

    return css`
      background-color: ${color};
      border: 2px solid ${borderColor};
      color: ${darkgray};
      font-family: ${bold};
      border-radius: 10px;
      display: inline-block;
      font-size: 12px;
      padding: 2px 6px;
      text-align: center;
      white-space: nowrap;
      width: 100%;
    `;
  },
);

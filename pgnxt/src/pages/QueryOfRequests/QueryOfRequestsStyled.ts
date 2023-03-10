import styled, { css } from 'styled-components';

import { ManagementTable } from '../../containers/ManagementTable';
import { ThemeProps } from '../../resources/theme';

export const StManagementTable = styled(ManagementTable)(
  ({
    theme: {
      typography: {
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    td.table-td-code,
    td.table-td-operationId {
      font-family: ${bold};
    }
  `,
);

import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';
import { Table } from '../../components/Table';
import { TextButton } from '../../components/TextButton';
import { SearchByInput } from '../../components/SearchByInput';

export const StTable = styled(Table)(
  ({
    theme: {
      colors: { lightersky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    & tbody:first-of-type > tr {
      td {
        background-color: white;
      }

      &.table__tr--odd > td {
        background-color: ${lightersky};
      }
    }

    tbody tr td,
    thead tr th {
      padding: 12px 15px;
    }
  `,
);

export const StSearchByInput = styled(SearchByInput)(
  () => css`
    max-width: 33%;
    margin-right: 15px;
  `,
);

export const StFiltersContainer = styled.div(
  () => css`
    margin: 30px 0;
    display: flex;
    align-items: end;
  `,
);

export const StPropFiltersContainer = styled.div(
  () => css`
    position: relative;

    > span {
      position: absolute;
      top: -18px;
      font-size: 12px;
      opacity: 0.8;
    }

    ul {
      display: inline-flex;
      margin: 0;

      li {
        margin: 0 5px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  `,
);

export const StAllFiltersButton = styled(TextButton)(
  ({
    theme: {
      colors: { darkgray, lightsky, mediumsky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    border: 1px solid ${mediumsky};
    background-color: ${hexToRgba(lightsky, 0.4)};
    border-radius: 4px;
    padding: 3px 10px;
    color: ${darkgray};
  `,
);

import styled, { css } from 'styled-components';

import { ContentContainer } from '../../components/ContentContainer';
import { Input } from '../../components/Controls/Input';
import { Table } from '../../components/Table';
import { ThemeProps } from '../../resources/theme';

export const StInsuranceSelectorContainer = styled.div(() => css``);

export const StInputsContainer = styled(ContentContainer)(
  () => css`
    background-color: white;

    & > div {
      display: flex;
      flex-direction: row;
      padding-top: 32px;
      padding-bottom: 24px;

      > .form-field {
        margin-right: 24px;
      }
    }
  `,
);

export const StTitle = styled.h2(
  ({
    theme: {
      colors: { darkgray },
      typography: {
        fontSizes: { title },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    color: ${darkgray};
    font-size: ${title};
  `,
);

export const StCurrencyPairContainer = styled.div(
  ({
    theme: {
      colors: { darkgray },
      typography: {
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin-bottom: 20px;

    > span {
      color: ${darkgray};
      margin-right: 10px;

      &:first-child {
        font-family: ${bold};
      }
    }
  `,
);

export const StContinueButtonContainer = styled.div(
  () => css`
    display: flex;
    padding-top: 20px;
    flex-direction: row;
    justify-content: flex-end;
  `,
);

export const StAvailableAmountContainer = styled.div(
  () => css`
    & > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &:first-child {
        margin-bottom: 4px;
      }
    }
  `,
);

export const StAmountInput = styled(Input)(
  () => css`
    min-width: auto;
    width: 150px;
    margin-left: auto;
  `,
);

export const StTable = styled(Table)(
  ({
    theme: {
      colors: { lightersky },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    .exchangeInsuranceSelector__amountInput {
      background-color: ${lightersky};
    }

    tbody tr:nth-child(2n) {
      background-color: ${lightersky};

      .exchangeInsuranceSelector__amountInput {
        background-color: white;
      }
    }

    td.table-td-useAmount,
    th.table-th-a80vailableAmount {
      text-align: right;
    }

    th.table-th-useAmount h3,
    th.table-th-availableAmount h3 {
      justify-content: flex-end;
    }

    td.table-td-availableAmount .exchangeInsuranceSelector__amountContainer,
    td.table-td-availableAmount .exchangeInsuranceSelector__amountHint,
    td.table-td-availableAmount .exchangeInsuranceSelector__amountValue {
      display: flex;
      justify-content: end;
      align-items: center;
    }

    td.table-td-availableAmount .exchangeInsuranceSelector__amountHint {
      width: 72px;
    }

    td.table-td-availableAmount .exchangeInsuranceSelector__amountValue {
      min-width: 100px;
    }
  `,
);

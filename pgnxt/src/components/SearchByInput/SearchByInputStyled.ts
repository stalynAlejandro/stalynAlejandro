import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { Icon } from '../Icon';
import { Select } from '../Controls/Select';
import { hexToRgba } from '../../utils/hexToRgba';

export const StSearchInputContainer = styled.label(
  ({
    theme: {
      colors: { lightgray },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    border-radius: 4px;
    border: 1px solid ${lightgray};
    position: relative;
    background-color: white;
    display: inline-flex;
    align-items: center;
    padding-right: 16px;
    flex: 1;
    min-width: 340px;

    input {
      flex: 1;
      min-width: 100px;
    }
  `,
);

export const StSearchIcon = styled(Icon)(
  () => css`
    filter: brightness(0) opacity(0.4);
  `,
);

export const StSelect = styled(Select)(
  ({
    theme: {
      colors: { lightgray },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    flex: 1;
    max-width: 40%;
    min-width: 180px;
    border: none;
    border-radius: 0;
    border-right: 1px solid ${hexToRgba(lightgray, 0.5)};
    background-color: transparent;

    .formSelect__control {
      padding-left: 16px;
      padding-right: 16px;
    }

    .formSelect + .select-placeholder {
      left: 16px;
    }
  `,
);

export const StInput = styled.input(
  () => css`
    padding: 10px 16px;
  `,
);

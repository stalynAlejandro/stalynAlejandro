import styled, { css } from 'styled-components';

import { hexToRgba } from '../../utils/hexToRgba';
import { ContentContainer } from '../ContentContainer';
import { TextButton } from '../TextButton';

export const StTitleContainer = styled(ContentContainer)(
  ({
    theme: {
      colors: { lightsky, mediumsky },
    },
  }) => css`
    background-color: ${hexToRgba(lightsky, 0.25)};
    border-bottom: 1px solid ${mediumsky};
  `,
);

export const StTitle = styled.h1(
  ({
    theme: {
      colors: { santander },
      typography: {
        headlineFonts: { regular },
      },
    },
  }) => css`
    font-family: ${regular};
    margin: 0;

    &::after {
      content: '';
      display: block;
      margin-top: 6px;
      width: 36px;
      height: 3px;
      background-color: ${santander};
    }
  `,
);

export const StWrapper = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > div {
      display: flex;
      justify-content: space-between;
      align-self: normal;
    }

    margin-top: 32px;
    margin-bottom: 60px;
  `,
);

export const StBackButton = styled(TextButton)(
  () => css`
    margin-bottom: 10px;
  `,
);

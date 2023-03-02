import styled, { css } from 'styled-components';

import { Checkbox } from '../components/Controls/Checkbox';
import { RadioButtonCard } from '../components/Controls/RadioButtonCard';
import { Textarea } from '../components/Controls/Textarea';
import { FormStepContainer } from '../components/FormStepContainer';
import { StepSubtitle } from '../components/StepSubtitle';
import { FormWizard } from '../containers/FormWizard';
import { ThemeProps } from '../resources/theme';

export const StFormWizard = styled(FormWizard)(
  () => css`
    .form__exchangeInsurancesSummaryContainer {
      width: 100%;
      margin: 24px 0;

      h3 {
        margin-top: 0;
      }
    }
  `,
);

const StButtonContainer = styled.div(
  () => css`
    display: flex;
    width: 100%;
    margin-top: 16px;
  `,
);

export const StButtonContainerRight = styled(StButtonContainer)(
  () => css`
    justify-content: flex-end;

    button {
      margin-left: 16px;
    }
  `,
);

export const StButtonContainerLeft = styled(StButtonContainer)(
  () => css`
    justify-content: flex-start;

    button {
      margin-right: 16px;
    }
  `,
);

export const StIconContainerRight = styled.div(
  () => css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 4px;
  `,
);

export const StTextarea = styled(Textarea)(() => css``);

export const StRadioButtonCard = styled(RadioButtonCard)(() => css``);

export const StLineContainer = styled.div(
  () =>
    css`
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    `,
);

export const StCloserSubtitle = styled(StepSubtitle)(
  () => css`
    margin-bottom: 6px;
  `,
);

export const StSummaryFormStepContainer = styled(FormStepContainer)(
  ({
    theme: {
      spacings: { formWidth },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    & .fields-container > div,
    & .fields-container > div > form {
      width: calc(${formWidth} + 200px);
      max-width: 100%;
    }

    .stepTitle__title {
      margin-bottom: 40px;
      position: relative;
      top: 8px;
    }
  `,
);

export const StCheckbox = styled(Checkbox)(
  () => css`
    font-size: 16px;
  `,
);

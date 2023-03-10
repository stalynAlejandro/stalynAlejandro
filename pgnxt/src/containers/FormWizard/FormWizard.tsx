import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';
import cx from 'classnames';
import { useSelector } from 'react-redux';

import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Modal } from '../../components/Modal';
import { TextButton } from '../../components/TextButton';
import {
  StWizardContainer,
  StHeader,
  StHeaderTitle,
  StTopHeader,
  StProgressBar,
  StFormContainer,
  StFooter,
  StFooterStepTitle,
  StFooterStepCircle,
  StFooterStepsCircles,
  StFooterStepsBgLine,
  StFooterStepIndicator,
  StFinishButtonContainer,
  StUsername,
} from './FormWizardStyled';
import { getUser } from '../../redux/selectors/user';

export interface FormWizardProps {
  actualStep?: number;
  canGoBack?: boolean;
  children?: React.ReactNode;
  className?: string;
  hideProgressBar?: boolean;
  onClose: () => void;
  onFinish?: () => void;
  onSaveDraft?: (userTriggered?: boolean) => any;
  onStepChange: (step: number) => void;
  stepList: {
    key: string;
    skipInList?: boolean;
    title: string;
  }[];
  title: string;
}

const FormWizard: React.FC<FormWizardProps> = ({
  actualStep,
  canGoBack,
  children,
  className,
  hideProgressBar,
  onClose,
  onFinish,
  onSaveDraft,
  onStepChange,
  stepList,
  title,
}) => {
  const { t } = useTranslation();
  const { userDisplayedName } = useSelector(getUser);

  const [discardModalIsOpen, setDiscardModalIsOpen] = useState(false);
  const [isUsernameDisplayed, setIsUsernameDisplayed] = useState(false);

  const stepsInList = stepList.filter((st) => !st.skipInList);

  const onCloseWizard = () => {
    setDiscardModalIsOpen(false);
    onClose();
  };

  const completedPercentage = ((actualStep! + 1) / stepList.length) * 100;

  useHotkeys('shift+p', () => {
    setIsUsernameDisplayed((current) => !current);
  });

  return (
    <StWizardContainer
      className={className}
      data-testid="form-wizard-container"
    >
      <StHeader>
        <StTopHeader hideProgressBar={!!hideProgressBar}>
          {isUsernameDisplayed && <StUsername>{userDisplayedName}</StUsername>}
          <div>
            {(actualStep! > 0 && !onFinish && canGoBack && (
              <TextButton
                icon="chevron-left"
                label={t('back')}
                onClick={() => onStepChange(actualStep! - 1)}
              />
            )) || <div />}
            <StHeaderTitle>
              <Icon icon="santander" size={32} />
              <span>{t(title)}</span>
            </StHeaderTitle>
            {(onSaveDraft && !onFinish && (
              <TextButton
                icon="clock"
                label={t('saveForLater')}
                onClick={onSaveDraft}
              />
            )) || <div />}
            <TextButton
              icon="close"
              iconPosition="right"
              label={t('discard')}
              onClick={() => setDiscardModalIsOpen(true)}
            />
          </div>
        </StTopHeader>
        {!hideProgressBar && (
          <StProgressBar
            data-progress={completedPercentage}
            data-testid="form-wizard-progress-bar"
            progress={completedPercentage}
          />
        )}
      </StHeader>
      <StFormContainer>{children}</StFormContainer>
      <StFooter data-testid="form-wizard-footer">
        <div>
          {(onFinish && (
            <StFinishButtonContainer data-testid="form-wizard-footer-buttons">
              <Button
                inverse
                label={t('cancel')}
                wide
                onClick={() => setDiscardModalIsOpen(true)}
              />
              <Button label={t('confirm')} wide onClick={onFinish} />
            </StFinishButtonContainer>
          )) || (
            <StFooterStepsCircles data-testid="form-wizard-footer-steps">
              {stepsInList.map((step, i) => (
                <li
                  key={`form-step-${step.key}`}
                  className={cx({
                    'footer-step': true,
                    'footer-step--is-active': i === actualStep!,
                    'footer-step--is-completed': i <= actualStep!,
                  })}
                >
                  {/* The text label */}
                  <StFooterStepTitle
                    isActive={i === actualStep!}
                    isCompleted={i <= actualStep!}
                  >
                    {t(step.title)}
                  </StFooterStepTitle>
                  {/* The circle and lines */}
                  <StFooterStepIndicator>
                    {/* If it's actual step or the next (0), and it's not the last step shown */}
                    {/* (0 ===== 0) ----- O */}
                    {(i === actualStep! || i === actualStep! + 1) &&
                      actualStep! !== stepsInList.length - 1 && (
                        <StFooterStepsBgLine
                          data-testid="footer-step-bg-line"
                          isEnding={i === actualStep! + 1} // know if it's the beginning or the end of the line
                        />
                      )}
                    {/* The circle */}
                    <StFooterStepCircle
                      data-testid="footer-step-circle"
                      isActive={i === actualStep!}
                      isCompleted={i < actualStep!}
                    />
                  </StFooterStepIndicator>
                </li>
              ))}
            </StFooterStepsCircles>
          )}
        </div>
      </StFooter>
      <Modal
        acceptButton={{ label: t('confirm'), onClick: onCloseWizard }}
        cancelButton={{ label: t('cancel'), onClick: () => null }}
        isOpen={discardModalIsOpen}
        title={t('discard')}
        onClose={() => setDiscardModalIsOpen(false)}
      >
        {t('discardCollectionPromptMessage')}
      </Modal>
    </StWizardContainer>
  );
};

FormWizard.defaultProps = {
  actualStep: 0,
  canGoBack: true,
  children: null,
  className: '',
  hideProgressBar: false,
  onFinish: undefined,
  onSaveDraft: undefined,
};

export default FormWizard;

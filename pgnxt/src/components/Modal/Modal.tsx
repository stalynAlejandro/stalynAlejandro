import React from 'react';

import { ButtonProps } from '../Button/Button';
import { Button } from '../Button';
import {
  StCloseIcon,
  StModalContainer,
  StModalContent,
  StModalContentContainer,
  StModalFooter,
  StModalTitle,
} from './ModalStyled';
import { TextButton } from '../TextButton';
import { TextButtonProps } from '../TextButton/TextButton';

interface ModalProps {
  acceptButton?: ButtonProps;
  cancelButton?: ButtonProps;
  children: React.ReactNode;
  className?: string;
  contextualButton?: TextButtonProps;
  'data-testid'?: string;
  isOpen?: boolean;
  isWide?: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  acceptButton,
  cancelButton,
  children,
  className,
  contextualButton,
  'data-testid': testId,
  isOpen,
  isWide,
  onClose,
  title,
}) =>
  (isOpen && (
    <StModalContainer
      className={className}
      data-testid={testId || 'modal-container'}
    >
      <StModalContentContainer
        className="modal__contentContainer"
        isWide={!!isWide}
      >
        <StCloseIcon
          className="modal__closeIcon"
          icon="close"
          onClick={onClose}
        />
        <StModalTitle className="modal__title">{title}</StModalTitle>
        <StModalContent className="modal__content" data-testid="modal-content">
          {children}
        </StModalContent>
        <StModalFooter hasContextualButton={!!contextualButton}>
          {contextualButton && <TextButton {...contextualButton} />}
          {cancelButton && (
            <Button
              {...cancelButton}
              inverse
              onClick={() => {
                cancelButton.onClick();
                onClose();
              }}
            />
          )}
          {acceptButton && (
            <Button
              {...acceptButton}
              onClick={() => {
                acceptButton.onClick();
                onClose();
              }}
            />
          )}
        </StModalFooter>
      </StModalContentContainer>
    </StModalContainer>
  )) ||
  null;

Modal.defaultProps = {
  acceptButton: undefined,
  cancelButton: undefined,
  className: '',
  contextualButton: undefined,
  'data-testid': '',
  isOpen: false,
  isWide: false,
};

export default Modal;

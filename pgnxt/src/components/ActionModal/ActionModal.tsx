import React from 'react';

import { SquaredCard } from '../SquaredCard';
import { SquaredCardProps } from '../SquaredCard/SquaredCard';
import { StModal } from './ActionModalStyled';

interface ActionModalProps {
  actions?: SquaredCardProps[];
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  title: string;
}

const ActionModal: React.FC<ActionModalProps> = ({
  actions,
  children,
  isOpen,
  onClose,
  title,
}) => (
  <StModal
    data-testid="action-modal"
    isOpen={isOpen}
    isWide
    title={title}
    onClose={onClose}
  >
    {!!actions?.length && (
      <div className="actionModal__actionsContainer">
        {actions.map(({ icon, label, onClick, title: actionTitle }) => (
          <SquaredCard
            key={`action-modal-action-${actionTitle}`}
            className="actionModal__action"
            icon={icon}
            label={label}
            title={actionTitle}
            onClick={onClick}
          />
        ))}
      </div>
    )}
    {children}
  </StModal>
);

ActionModal.defaultProps = {
  actions: [],
  isOpen: false,
};

export default ActionModal;

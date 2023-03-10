import React from 'react';

import {
  StActionCardContainer,
  StCardTitle,
  StActionsContainer,
  StAction,
  StActionIcon,
  StActionTitle,
  StActionDescription,
  StActionTitleContainer,
} from './ActionCardStyled';

interface ActionCardProps {
  className?: string;
  items: {
    description: string;
    icon?: string;
    onClick?: () => void;
    title: string;
  }[];
  title: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ className, items, title }) => (
  <StActionCardContainer className={className} data-testid="action-card">
    <StCardTitle>{title}</StCardTitle>
    <StActionsContainer>
      {items.map(({ description, icon, onClick, title: actionTitle }) => (
        <StAction key={`action-card-${actionTitle}`} onClick={onClick}>
          <StActionTitleContainer>
            {icon && <StActionIcon icon={icon} size={26} />}
            <StActionTitle>{actionTitle}</StActionTitle>
          </StActionTitleContainer>
          <StActionDescription>{description}</StActionDescription>
        </StAction>
      ))}
    </StActionsContainer>
  </StActionCardContainer>
);

ActionCard.defaultProps = {
  className: '',
};

export default ActionCard;

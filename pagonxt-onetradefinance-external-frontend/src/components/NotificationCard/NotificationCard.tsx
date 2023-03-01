import React from 'react';

import {
  StContentContainer,
  StIcon,
  StNotificationContainer,
  StSubtitle,
  StTitle,
} from './NotificationCardStyled';

interface NotificationCardProps {
  children: React.ReactNode;
  className?: string;
  description: string;
  title: string;
  type: 'warning' | 'error' | 'success';
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  children,
  className,
  description,
  title,
  type,
}) => (
  <StNotificationContainer
    className={className}
    data-testid="notification-card"
    type={type}
  >
    <StIcon icon="circled-info" />
    <div>
      <StTitle>{title}</StTitle>
      <StSubtitle>{description}</StSubtitle>
      <StContentContainer>{children}</StContentContainer>
    </div>
  </StNotificationContainer>
);

NotificationCard.defaultProps = {
  className: '',
};

export default NotificationCard;

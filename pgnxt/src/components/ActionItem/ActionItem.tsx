import React from 'react';

import {
  StActionItemContainer,
  StIcon,
  StNameContainer,
  StDescription,
  StActionContainer,
  StName,
} from './ActionItemStyled';

interface ActionItemProps {
  children?: React.ReactNode;
  className?: string;
  description: string;
  icon?: string;
  name: string;
  type?: string;
}

const ActionItem: React.FC<ActionItemProps> = ({
  children,
  className,
  description,
  icon,
  name,
  type,
}) => (
  <StActionItemContainer
    className={className}
    data-testid="action-item"
    data-type={type}
  >
    <StIcon icon={icon!} size={30} />
    <StNameContainer>
      <StName>{name}</StName>
      <StDescription>{description}</StDescription>
    </StNameContainer>
    {children && <StActionContainer>{children}</StActionContainer>}
  </StActionItemContainer>
);

ActionItem.defaultProps = {
  children: null,
  className: '',
  icon: 'file',
  type: '',
};

export default ActionItem;

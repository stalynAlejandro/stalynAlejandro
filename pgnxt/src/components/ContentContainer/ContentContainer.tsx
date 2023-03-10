import React from 'react';

import { StContentContainer } from './ContentContainerStyled';

interface ContentContainerProps {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className,
  'data-testid': dataTestId,
}) => (
  <StContentContainer className={className} data-testid={dataTestId}>
    {children}
  </StContentContainer>
);

ContentContainer.defaultProps = {
  children: null,
  className: '',
  'data-testid': 'content-container',
};

export default ContentContainer;

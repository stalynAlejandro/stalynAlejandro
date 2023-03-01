import React from 'react';
import cx from 'classnames';

import { TextButtonProps } from '../TextButton/TextButton';
import {
  StTitleContainer,
  StTitle,
  StWrapper,
  StBackButton,
} from './PageTitleStyled';

interface PageTitleProps {
  backButton?: TextButtonProps;
  children?: React.ReactNode;
  className?: string;
  contextualNode?: React.ReactNode;
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  backButton,
  children,
  className,
  contextualNode,
  title,
}) => (
  <StTitleContainer
    className={cx({ [className!]: !!className, pageTitle__container: true })}
    data-testid={`page-title-${title.split(' ').join('')}`}
  >
    <div>
      <StWrapper className="pageTitle__wrapper">
        {backButton && <StBackButton {...backButton} />}
        <div>
          <StTitle className="pageTitle__title">{title}</StTitle>
          {contextualNode}
        </div>
      </StWrapper>
      {children}
    </div>
  </StTitleContainer>
);

PageTitle.defaultProps = {
  backButton: undefined,
  children: null,
  className: '',
  contextualNode: null,
};

export default PageTitle;

import React from 'react';
import cx from 'classnames';

import { StLateralModalContainer } from './LateralModalStyled';
import { PageTitle } from '../PageTitle';
import { Loader } from '../Loader';
import { ContentContainer } from '../ContentContainer';
import { Icon } from '../Icon';

interface LateralModalProps {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
  isLoading?: boolean;
  onClose: () => void;
  title: string;
}

const LateralModal: React.FC<LateralModalProps> = ({
  children,
  className,
  'data-testid': dataTestId,
  isLoading,
  onClose,
  title,
}) => (
  <StLateralModalContainer
    className={cx({ [className!]: !!className })}
    data-testid={dataTestId || 'lateral-modal'}
  >
    <div
      className="lateralModal__background"
      role="presentation"
      onClick={onClose}
    />
    <div className="lateralModal__contentWrapper">
      {isLoading && <Loader contained />}
      <PageTitle className="lateralModal__pageTitle" title={title} />
      <Icon
        className="lateralModal__closeIcon"
        icon="close"
        size={26}
        onClick={onClose}
      />
      <ContentContainer className="lateralModal__childrenContainer">
        {children}
      </ContentContainer>
    </div>
  </StLateralModalContainer>
);

LateralModal.defaultProps = {
  children: null,
  className: '',
  'data-testid': '',
  isLoading: false,
};

export default LateralModal;

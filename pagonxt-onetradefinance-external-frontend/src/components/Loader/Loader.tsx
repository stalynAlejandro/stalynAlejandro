import React from 'react';
import cx from 'classnames';

import { Icon } from '../Icon';
import {
  StLoaderContainer,
  StPrimaryLoader,
  StSecondaryLoader,
  StTitle,
  StSubtitle,
} from './LoaderStyled';

interface LoaderProps {
  className?: string;
  contained?: boolean;
  primary?: boolean;
  subtitle?: string;
  title?: string;
}

const PrimaryLoader: React.FC = () => (
  <StPrimaryLoader>
    <div className="floating-circle" />
    <div className="logo-circle">
      <Icon icon="santander" size={32} />
    </div>
  </StPrimaryLoader>
);

const SecondaryLoader: React.FC = () => (
  <StSecondaryLoader>
    <div className="floating-circle" />
    <div className="floating-circle" />
  </StSecondaryLoader>
);

const Loader: React.FC<LoaderProps> = ({
  className,
  contained,
  primary,
  subtitle,
  title,
}) => (
  <StLoaderContainer
    className={cx({
      [className!]: !!className,
      'loader--contained': contained,
    })}
    data-testid="loader-container"
  >
    {(primary && <PrimaryLoader />) || <SecondaryLoader />}
    {title && <StTitle>{title}</StTitle>}
    {subtitle && <StSubtitle>{subtitle}</StSubtitle>}
  </StLoaderContainer>
);

Loader.defaultProps = {
  className: '',
  contained: false,
  primary: true,
  subtitle: '',
  title: '',
};

export default Loader;

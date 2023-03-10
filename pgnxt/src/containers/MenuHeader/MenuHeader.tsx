import React from 'react';
import { useSelector } from 'react-redux';

import { Icon } from '../../components/Icon';
import { getUser } from '../../redux/selectors/user';
import {
  StMenuHeaderContainer,
  StLogo,
  StContentContainer,
  StUserContainer,
} from './MenuHeaderStyled';

const MenuHeader: React.FC = () => {
  const { userDisplayedName } = useSelector(getUser);

  return (
    <StMenuHeaderContainer data-testid="menu-header">
      <StContentContainer>
        <StLogo
          alt="Banco Santander"
          data-testid="app-logo"
          src="/images/SantanderLogo.png"
        />
        {userDisplayedName && (
          <StUserContainer>
            <Icon icon="user-circle" />
            <span>{userDisplayedName}</span>
          </StUserContainer>
        )}
      </StContentContainer>
    </StMenuHeaderContainer>
  );
};

export default MenuHeader;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, matchPath } from 'react-router-dom';

import Navigation from '../../constants/navigation';
import { MenuHeader } from '../MenuHeader';
import {
  StContentContainer,
  StMainMenu,
  StMenuItem,
  StMenuItems,
} from './MainMenuStyled';

const MainMenu: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const menuItems: { key: string; label: string; to: string }[] = [
    {
      key: 'newRequests',
      label: t('newRequests'),
      to: Navigation.newRequests,
    },
    {
      key: 'pendingTasks',
      label: t('pendingTasks'),
      to: Navigation.pendingTasks,
    },
    {
      key: 'queryOfRequests',
      label: t('queryOfRequests'),
      to: Navigation.queryOfRequests,
    },
    {
      key: 'help',
      label: t('help'),
      to: Navigation.help,
    },
  ];

  return (
    <StMainMenu data-testid="page-main-menu">
      <MenuHeader />
      <StContentContainer>
        <div>
          <StMenuItems>
            {menuItems.map(({ key, label, to }) => (
              <StMenuItem
                key={`menu-item-${key}`}
                data-testid={`menu-item-${key}`}
                isActive={Boolean(matchPath(pathname, to))}
              >
                <NavLink to={to}>{label}</NavLink>
              </StMenuItem>
            ))}
          </StMenuItems>
        </div>
      </StContentContainer>
    </StMainMenu>
  );
};

export default MainMenu;

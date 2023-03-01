import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import { MenuHeader } from '..';
import userTypes from '../../../enums/userTypes';
import store from '../../../redux/store';
import { userSlice } from '../../../redux/features/userSlice';
import { UserInfoDto } from '../../../api/types/UserInfoDto';

const mockedUser = {
  country: 'ES',
  mail: 'isabel@onetradefinance.pagonxt.com@mail.com',
  middleOffice: null,
  office: '1234',
  userDisplayedName: 'Isabel@onetradefinance.pagonxt.com',
  userId: 'isabel@onetradefinance.pagonxt.com',
  userType: userTypes.BACKOFFICE,
};

describe('Container MenuHeader', () => {
  const defaultProps = {};

  const renderWithProps = (props: any = {}) => {
    renderComponent(<MenuHeader {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    store.dispatch(userSlice.actions.setUserInfo(mockedUser));
  });

  it('renders the component successfully and shows the logo', () => {
    renderWithProps();

    expect(screen.getByTestId('app-logo')).toHaveAttribute(
      'src',
      '/images/SantanderLogo.png',
    );
  });

  it('does not render the user name if no userDisplayedName is available', () => {
    store.dispatch(
      userSlice.actions.setUserInfo({ userDisplayedName: '' } as UserInfoDto),
    );
    renderWithProps();

    expect(screen.queryByTestId('icon-user-circle')).not.toBeInTheDocument();
    expect(
      screen.queryByText(mockedUser.userDisplayedName),
    ).not.toBeInTheDocument();
  });

  it('renders the user name if there is user information retrieved', () => {
    renderWithProps();

    expect(screen.queryByTestId('icon-user-circle')).toBeInTheDocument();
    expect(
      screen.queryByText(mockedUser.userDisplayedName),
    ).toBeInTheDocument();
  });
});

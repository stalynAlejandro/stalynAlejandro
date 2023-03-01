import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import Navigation from '../../../constants/navigation';
import { renderComponent } from '../../../testUtils/renderComponent';
import MainMenu from '../MainMenu';

describe('Container MainMenu', () => {
  const defaultProps = {};

  const renderWithProps = (props: any = {}) => {
    renderComponent(
      <BrowserRouter>
        <MainMenu {...defaultProps} {...props} />
      </BrowserRouter>,
    );
  };

  it('renders the component successfully with its page links', () => {
    renderWithProps();

    expect(screen.getByTestId('menu-header')).toBeInTheDocument();
    expect(screen.getByText('T_newRequests')).toBeInTheDocument();
    expect(screen.getByText('T_pendingTasks')).toBeInTheDocument();
    expect(screen.getByText('T_queryOfRequests')).toBeInTheDocument();
    expect(screen.getByText('T_help')).toBeInTheDocument();
  });

  it('redirects to the specified page when the menu item is clicked', () => {
    renderWithProps();

    expect(window.location.pathname).toEqual('/');

    act(() => userEvent.click(screen.getByText('T_newRequests')));
    expect(window.location.pathname).toEqual(Navigation.newRequests);
  });

  it('shows the current page as active', () => {
    renderWithProps();

    act(() => userEvent.click(screen.getByText('T_newRequests')));
    expect(screen.getByText('T_newRequests')).toHaveClass('active');

    act(() => userEvent.click(screen.getByText('T_pendingTasks')));
    expect(screen.getByText('T_newRequests')).not.toHaveClass('active');
    expect(screen.getByText('T_pendingTasks')).toHaveClass('active');
  });
});

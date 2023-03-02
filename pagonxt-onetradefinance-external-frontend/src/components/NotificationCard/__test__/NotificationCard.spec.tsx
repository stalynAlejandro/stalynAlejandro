import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import NotificationCard from '../NotificationCard';

describe('Component NotificationCard', () => {
  const defaultProps = {
    description: 'My longer description text',
    title: 'My title',
  };

  const renderWithProps = (
    props: any = {},
    children: React.ReactNode = null,
  ) => {
    renderComponent(
      <NotificationCard {...defaultProps} {...props}>
        {children}
      </NotificationCard>,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();

    expect(screen.getByTestId('notification-card')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('adds the provided className successfully to the component class attribute', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('notification-card')).toHaveClass('test-class');
  });

  it('renders the provided children correctly', () => {
    renderWithProps(undefined, <span>My child component</span>);
    expect(screen.getByText('My child component')).toBeInTheDocument();
  });
});

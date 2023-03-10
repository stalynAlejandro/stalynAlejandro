import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import { StatusTimeline } from '..';
import { formatDate } from '../../../utils/dates';

describe('Component StatusTimeline', () => {
  const defaultProps = {
    statusList: [
      {
        datetime: '2022-09-16T09:58:25.841Z',
        metadata: <span>Metadata A</span>,
        name: 'Status A',
      },
      {
        name: 'Status B',
      },
      {
        active: true,
        children: <div data-testid="test-children">My test children</div>,
        name: 'Status C',
      },
      {
        name: 'Status D',
      },
    ],
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<StatusTimeline {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('status-timeline')).toBeInTheDocument();
  });

  it('renders all statuses titles', () => {
    renderWithProps();

    defaultProps.statusList.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders datetime if provided', () => {
    renderWithProps();
    expect(
      screen.getByText(
        formatDate(new Date(defaultProps.statusList[0].datetime!), true),
      ),
    ).toBeInTheDocument();
  });

  it('renders metadata if provided', () => {
    renderWithProps();
    expect(screen.getByText('Metadata A')).toBeInTheDocument();
  });

  it('renders children if provided', () => {
    renderWithProps();
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByText('My test children')).toBeInTheDocument();
  });

  it('adds provided className prop to element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('status-timeline')).toHaveClass('test-class');
  });
});

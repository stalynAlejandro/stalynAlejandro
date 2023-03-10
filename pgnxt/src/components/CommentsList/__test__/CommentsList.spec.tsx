import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import { CommentsList } from '..';
import { formatDate } from '../../../utils/dates';

describe('Component CommentsList', () => {
  const defaultProps = {
    comments: [
      {
        content: 'Second comment content',
        taskName: 'Task B',
        timestamp: '2022-09-13T12:45:47.119Z',
        userDisplayedName: 'Test Name',
      },
      {
        content: 'First comment content',
        taskName: 'Task A',
        timestamp: '2022-09-10T12:45:47.119Z',
        userDisplayedName: 'Back Office',
      },
    ],
  };

  const getNameInitials = (name: string) =>
    name
      .split(' ')
      .map((str) => str[0])
      .join('')
      .toUpperCase();

  const renderWithProps = (props: any = {}) => {
    renderComponent(<CommentsList {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('comments-list')).toBeInTheDocument();
  });

  it('renders the provided comments correctly', () => {
    renderWithProps();

    defaultProps.comments.forEach(
      ({ content, taskName, timestamp, userDisplayedName }) => {
        expect(
          screen.getByText(
            `T_commentAuthorInTask--author:${userDisplayedName}--task:${taskName}`,
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            `T_publishedAt--date:${formatDate(
              new Date(timestamp || ''),
              false,
              'dd/MM/yyyy, HH:mm',
            )}`,
          ),
        ).toBeInTheDocument();

        expect(screen.getByText(content)).toBeInTheDocument();
      },
    );
  });

  it.skip('renders the avatar of the user correctly', async () => {
    renderWithProps();

    await Promise.all(
      defaultProps.comments.map(async ({ userDisplayedName }) => {
        await waitFor(async () => {
          expect(
            await screen.findByText(getNameInitials(userDisplayedName), {
              selector: '.sb-avatar__text span',
            }),
          ).toBeInTheDocument();
        });
      }),
    );
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('comments-list')).toHaveClass('test-class');
  });
});

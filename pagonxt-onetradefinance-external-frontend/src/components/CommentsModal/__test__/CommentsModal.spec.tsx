import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import userEvent from '@testing-library/user-event';

import { renderComponentWithToast } from '../../../testUtils/renderComponent';
import { CommentsModal } from '..';
import ApiUrls from '../../../constants/apiUrls';
import { getApiLocale } from '../../../utils/getApiLocale';
import { get as commentsMockedResponse } from '../../../testUtils/mocks/data/requestComments';

describe('Component CommentsModal', () => {
  let mocked: any;
  const defaultProps = {
    onClose: jest.fn(),
    requestId: 'task-id-123',
  };

  const mockCommentsFetch = (
    mockedResponse: any = commentsMockedResponse,
    config: any = {},
  ) =>
    fetchMockJest.mock(
      ApiUrls.requestComments(defaultProps.requestId, getApiLocale()),
      { body: mockedResponse, status: 200, ...config },
      {
        delay: 300,
        overwriteRoutes: true,
      },
    );

  const renderWithProps = (props: any = {}) => {
    renderComponentWithToast(<CommentsModal {...defaultProps} {...props} />);
  };

  const renderAwaitingComments = async (props: any = {}) => {
    renderWithProps(props);

    await waitFor(() => {
      expect(screen.getByTestId('comments-list')).toBeInTheDocument();
    });
  };

  beforeEach(() => {
    jest.resetAllMocks();
    fetchMockJest.mockClear();
    mocked = mockCommentsFetch();
  });

  it('renders the component successfully', async () => {
    renderWithProps();
    expect(await screen.findByTestId('comments-modal')).toBeInTheDocument();
  });

  it('displays a loader when the comments are loading', async () => {
    renderWithProps();
    expect(await screen.findByTestId('loader-container')).toBeInTheDocument();
  });

  it('the loader disappears once the comments are retrieved and elements are shown', async () => {
    renderWithProps();

    expect(screen.getByTestId('loader-container')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('comments-list')).toBeInTheDocument();
    });
  });

  it('executes the provided onClose method when clicking the close icon', async () => {
    renderWithProps();
    userEvent.click(await screen.findByTestId('icon-close'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('executes the provided onClose method when clicking the faded background', async () => {
    renderWithProps();
    userEvent.click(document.querySelector('.lateralModal__background')!);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders the comments list with the retrieved comments', async () => {
    await renderAwaitingComments();

    commentsMockedResponse.entity.forEach(({ content }) => {
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });

  it('does not fetch for comments if a comments prop is provided and has data', async () => {
    const comments = [
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
    ];

    await renderAwaitingComments({ comments });

    expect(screen.getByText(comments[0].content)).toBeInTheDocument();
    expect(mocked).not.toHaveFetched();
  });

  it('displays the provided title prop correctly', async () => {
    const title = 'My title';
    await renderAwaitingComments({ title });
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('shows an error message if the comments fetch operation fails', async () => {
    fetchMockJest.mockClear();
    mockCommentsFetch(
      {
        another: 'typeofobject',
      },
      { status: 500 },
    );

    renderWithProps();

    await waitFor(() => {
      expect(
        screen.getByText('T_errors.couldNotRetrieveComments'),
      ).toBeInTheDocument();
    });
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('comments-modal')).toHaveClass('test-class');
  });
});

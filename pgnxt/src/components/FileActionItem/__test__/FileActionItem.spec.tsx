import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../testUtils/renderComponent';
import FileActionItem from '../FileActionItem';
import { mockFile } from '../../../testUtils/mockFile';
import { formatDate } from '../../../utils/dates';

describe('Component FileActionItem', () => {
  const defaultProps = {
    file: mockFile({ name: 'My file.pdf' }),
    onDelete: jest.fn(),
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<FileActionItem {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.file.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `T_uploadedOnN--date:${formatDate(
          new Date(defaultProps.file.uploadedDate || ''),
          true,
        )}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('icon-trash')).toBeInTheDocument();
  });

  it('executes the provided onDelete method if clicked', () => {
    renderWithProps();
    userEvent.click(screen.getByTestId('icon-trash'));

    expect(defaultProps.onDelete).toHaveBeenCalledWith(defaultProps.file.name);
  });

  it('adds the data-type attribute if type prop is provided', () => {
    renderWithProps({ type: 'file-type' });
    expect(screen.getByTestId('action-item')).toHaveAttribute(
      'data-type',
      'file-type',
    );
  });
});

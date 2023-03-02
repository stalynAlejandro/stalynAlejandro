import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../testUtils/renderComponent';
import ActionModal from '../ActionModal';

describe('Component ActionModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'My modal title',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(
      <ActionModal {...defaultProps} {...props}>
        <span>Test Children</span>
      </ActionModal>,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('action-modal')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders the provided children elements', () => {
    renderWithProps();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('renders the provided actions', () => {
    const actions = [
      {
        icon: 'close',
        label: 'Action A Label',
        onClick: jest.fn(),
        title: 'Action A',
      },
      {
        icon: 'open',
        label: 'Action B Label',
        onClick: jest.fn(),
        title: 'Action B',
      },
    ];

    renderWithProps({
      actions,
    });

    expect(screen.getByText(actions[0].title)).toBeInTheDocument();
    expect(screen.getByText(actions[1].title)).toBeInTheDocument();

    userEvent.click(screen.getByText(`T_${actions[0].label}`));
    expect(actions[0].onClick).toHaveBeenCalled();

    userEvent.click(screen.getByText(`T_${actions[1].label}`));
    expect(actions[1].onClick).toHaveBeenCalled();
  });

  it('executes the provided onClose method when closing the modal', () => {
    renderWithProps();

    userEvent.click(screen.getByTestId('icon-close'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not render when isOpen prop is sent as false', () => {
    renderWithProps({ isOpen: false });

    expect(screen.queryByTestId('action-modal')).not.toBeInTheDocument();
    expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();
  });
});

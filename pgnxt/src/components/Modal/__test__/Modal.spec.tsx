import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../testUtils/renderComponent';
import Modal from '../Modal';

describe('Component Modal', () => {
  const defaultProps = {
    acceptButton: { label: 'Accept', onClick: jest.fn() },
    cancelButton: { label: 'Cancel', onClick: jest.fn() },
    contextualButton: { label: 'Context', onClick: jest.fn() },
    isOpen: true,
    isWide: false,
    onClose: jest.fn(),
    title: 'Modal title',
  };

  const renderWithProps = (
    props: any = {},
    children: React.ReactNode = null,
  ) => {
    renderComponent(
      <Modal {...defaultProps} {...props}>
        {children}
      </Modal>,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders the component with its children', () => {
    renderWithProps(undefined, <span>Test element</span>);
    expect(screen.getByText('Test element')).toBeInTheDocument();
  });

  it('executes the provided method for the acceptButton when it is clicked', () => {
    renderWithProps();
    const acceptButton = screen.getByText(defaultProps.acceptButton.label);
    userEvent.click(acceptButton);

    expect(defaultProps.acceptButton.onClick).toHaveBeenCalled();
  });

  it('executes the provided method for the cancelButton when it is clicked', () => {
    renderWithProps();
    const cancelButton = screen.getByText(defaultProps.cancelButton.label);
    userEvent.click(cancelButton);

    expect(defaultProps.cancelButton.onClick).toHaveBeenCalled();
  });

  it('executes the provided onClose method when it is closed', () => {
    renderWithProps();
    const closeIcon = screen.getByTestId('icon-close');
    userEvent.click(closeIcon);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('executes the provided onClose method when the cancelButton is clicked', () => {
    renderWithProps();
    const cancelButton = screen.getByText(defaultProps.cancelButton.label);
    userEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('executes the provided method for the contextualButton when it is clicked', () => {
    renderWithProps();
    const contextualButton = screen.getByText(
      defaultProps.contextualButton.label,
    );
    userEvent.click(contextualButton);

    expect(defaultProps.contextualButton.onClick).toHaveBeenCalled();
  });

  it('does not render if isOpen prop is sent as false', () => {
    renderWithProps({ isOpen: false });

    expect(screen.queryByTestId('modal-container')).not.toBeInTheDocument();
    expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();
  });
});

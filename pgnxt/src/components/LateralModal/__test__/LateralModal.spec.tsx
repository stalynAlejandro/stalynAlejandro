import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponentWithToast } from '../../../testUtils/renderComponent';
import { LateralModal } from '..';

describe('Component LateralModal', () => {
  const defaultProps = {
    onClose: jest.fn(),
    title: 'Test title',
  };

  const renderWithProps = (
    props: any = {},
    children: React.ReactNode = null,
  ) => {
    renderComponentWithToast(
      <LateralModal {...defaultProps} {...props}>
        {children}
      </LateralModal>,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('lateral-modal')).toBeInTheDocument();
  });

  it('displays a loader when isLoading is provided as true', () => {
    renderWithProps({ isLoading: true });
    expect(screen.getByTestId('loader-container')).toBeInTheDocument();
  });

  it('executes the provided onClose method when clicking the close icon', () => {
    renderWithProps();
    userEvent.click(screen.getByTestId('icon-close'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('executes the provided onClose method when clicking the faded background', () => {
    renderWithProps();
    userEvent.click(document.querySelector('.lateralModal__background')!);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders the provided title', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders the provided children correctly', () => {
    renderWithProps(undefined, <span>My test children</span>);
    expect(screen.getByText('My test children')).toBeInTheDocument();
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('lateral-modal')).toHaveClass('test-class');
  });

  it('adds the provided data-testid to the element', () => {
    renderWithProps({ 'data-testid': 'test-id' });
    expect(screen.getByTestId('test-id')).toBeInTheDocument();
  });
});

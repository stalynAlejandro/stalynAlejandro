import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../testUtils/renderComponent';
import TextButton from '../TextButton';

describe('Component TextButton', () => {
  const defaultProps = {
    icon: 'clock',
    label: 'myButton',
    onClick: jest.fn(),
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<TextButton {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();

    expect(screen.getByTestId('text-button')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('executes the provided onClick method when clicked', () => {
    renderWithProps();
    userEvent.click(screen.getByTestId('text-button'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('shows the provided icon correctly', () => {
    renderWithProps({ icon: 'analysis' });
    expect(screen.getByTestId('icon-analysis')).toBeInTheDocument();
  });

  it('positions the icon to the left by default if no position is provided', () => {
    renderWithProps();
    expect(
      screen.getByTestId('text-button').querySelector('img + span'),
    ).toBeInTheDocument();
  });

  it('positions the icon correctly', () => {
    renderWithProps({ iconPosition: 'right' });
    expect(
      screen.getByTestId('text-button').querySelector('span + img'),
    ).toBeInTheDocument();
  });

  it('resizes the icon successfully if iconSize is provided', () => {
    renderWithProps({ iconSize: 10 });
    expect(
      screen.getByTestId('text-button').querySelector('img'),
    ).toHaveAttribute('size', '10');
  });

  it('adds the provided className to the element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('text-button')).toHaveClass('test-class');
  });
});

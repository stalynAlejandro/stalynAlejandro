import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import ActionItem from '../ActionItem';

describe('Component ActionItem', () => {
  const defaultProps = {
    description: 'My description.',
    name: 'My name',
  };

  const renderWithProps = (
    props: any = {},
    children: React.ReactNode = null,
  ) => {
    renderComponent(
      <ActionItem {...defaultProps} {...props}>
        {children}
      </ActionItem>,
    );
  };

  it('renders the component correctly', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  it('renders the file icon as default if none provided', () => {
    renderWithProps();
    expect(screen.getByTestId('icon-file')).toBeInTheDocument();
  });

  it('renders the icon provided', () => {
    renderWithProps({ icon: 'check' });
    expect(screen.getByTestId('icon-check')).toBeInTheDocument();
  });

  it('adds the data-type attribute if type prop is provided', () => {
    renderWithProps({ type: 'test-type' });
    expect(screen.getByTestId('action-item')).toHaveAttribute(
      'data-type',
      'test-type',
    );
  });

  it('adds provided className prop to element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('action-item')).toHaveClass('test-class');
  });

  it('renders successfully the provided children', () => {
    renderWithProps({}, <div>Test string</div>);
    expect(screen.getByText('Test string')).toBeInTheDocument();
  });
});

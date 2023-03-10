import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../../testUtils/renderComponent';
import FloatingPlaceholder from '../FloatingPlaceholder';

describe('Control FloatingPlaceholder', () => {
  const defaultProps = {
    label: 'My label',
    onClick: jest.fn(),
  };

  const renderWithProps = (
    props: any = {},
    children: React.ReactNode = null,
  ) => {
    renderComponent(
      <>
        <input />
        <FloatingPlaceholder {...defaultProps} {...props}>
          {children}
        </FloatingPlaceholder>
      </>,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('floating-placeholder')).toBeInTheDocument();
    expect(screen.getByTestId('floating-placeholder')).not.toHaveStyle({
      top: '5px',
    });
  });

  it('adds the provided className to element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('floating-placeholder')).toHaveClass(
      'test-class',
    );
  });

  it('floats when isFloating prop is provided', () => {
    renderWithProps({ isFloating: true });
    expect(screen.getByTestId('floating-placeholder')).toHaveStyle({
      top: '5px',
    });
  });

  it('renders the provided children correctly', () => {
    renderWithProps({}, <span>Test child</span>);
    expect(screen.getByText('Test child')).toBeInTheDocument();
  });
});

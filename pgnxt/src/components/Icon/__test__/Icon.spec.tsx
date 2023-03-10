import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../testUtils/renderComponent';
import Icon from '../Icon';

describe('Component Icon', () => {
  const defaultProps = {
    icon: 'clock',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<Icon {...defaultProps} {...props} />);
  };

  it('renders the component successfully with the provided icon', () => {
    renderWithProps();

    const iconEl = screen.getByTestId('icon-clock');
    expect(iconEl).toBeInTheDocument();
    expect(iconEl).toHaveAttribute(
      'src',
      `/images/icon-${defaultProps.icon}.svg`,
    );
  });

  it('triggers the provided onClick method', () => {
    const props = { onClick: jest.fn() };
    renderWithProps(props);

    userEvent.click(screen.getByTestId('icon-clock'));
    expect(props.onClick).toHaveBeenCalled();
  });

  it('adds the provided data-testid to the element', () => {
    renderWithProps({ 'data-testid': 'icon-test-id' });
    expect(screen.getByTestId('icon-test-id')).toBeInTheDocument();
  });

  it('adds the provided className to the element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('icon-clock')).toHaveClass('test-class');
  });
});

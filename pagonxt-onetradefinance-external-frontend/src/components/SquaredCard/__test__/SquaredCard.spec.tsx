import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../testUtils/renderComponent';
import SquaredCard from '../SquaredCard';

describe('Component SquaredCard', () => {
  const defaultProps = {
    icon: 'file',
    onClick: jest.fn(),
    title: 'My card title',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<SquaredCard {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('squared-card')).toBeInTheDocument();
  });

  it('renders the provided icon correctly', () => {
    renderWithProps();
    expect(screen.getByTestId(`icon-${defaultProps.icon}`)).toBeInTheDocument();
  });

  it('renders the provided title', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('executes the provided onClick method when clicking the button', () => {
    renderWithProps();

    userEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it(`sets the button label to 'continue' by default`, () => {
    renderWithProps();
    expect(screen.queryByText('T_continue')).toBeInTheDocument();
  });

  it('sets the button label to the provided label prop', () => {
    const label = 'my text';
    renderWithProps({ label });

    expect(screen.getByText(`T_${label}`)).toBeInTheDocument();
  });

  it('adds the provided className to element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('squared-card')).toHaveClass('test-class');
  });
});

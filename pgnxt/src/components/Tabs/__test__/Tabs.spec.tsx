import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../testUtils/renderComponent';
import Tabs from '../Tabs';

describe('Component Tabs', () => {
  const defaultProps = {
    items: [
      {
        key: 'tabA',
        label: 'tabA',
      },
      {
        key: 'tabB',
        label: 'tabB',
      },
    ],
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<Tabs {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('tab-list')).toBeInTheDocument();
    expect(screen.getByText('tabA')).toBeInTheDocument();
    expect(screen.getByText('tabB')).toBeInTheDocument();
  });

  it('selects the first tab if no activeTab is provided', () => {
    renderWithProps();

    expect(screen.getByText('tabA').closest('li')).toHaveAttribute(
      'data-isactive',
      'true',
    );
    expect(screen.getByText('tabB').closest('li')).toHaveAttribute(
      'data-isactive',
      'false',
    );
  });

  it('selects the correct tab when activeTab is provided', () => {
    renderWithProps({ activeTab: 'tabB' });
    expect(screen.getByText('tabA').closest('li')).toHaveAttribute(
      'data-isactive',
      'false',
    );
    expect(screen.getByText('tabB').closest('li')).toHaveAttribute(
      'data-isactive',
      'true',
    );
  });

  it('adds the provided className to the element classes', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('tab-list')).toHaveClass('test-class');
  });

  it('executes the provided onTabClick method when a tab is clicked', () => {
    const onTabClick = jest.fn();
    renderWithProps({ onTabClick });

    const tabB = screen.getByText('tabB').closest('li');
    act(() => userEvent.click(tabB!.querySelector('[role="button"]')!));

    expect(onTabClick).toHaveBeenCalledWith('tabB');
  });

  it('changes the active tab when clicking on a tab in the list', () => {
    renderWithProps();
    const tabA = screen.getByText('tabA').closest('li');
    const tabB = screen.getByText('tabB').closest('li');

    expect(tabA).toBeInTheDocument();
    expect(tabB).toBeInTheDocument();

    expect(tabA).toHaveAttribute('data-isactive', 'true');
    expect(tabB).toHaveAttribute('data-isactive', 'false');

    act(() => userEvent.click(tabB!.querySelector('[role="button"]')!));

    expect(tabA).toHaveAttribute('data-isactive', 'false');
    expect(tabB).toHaveAttribute('data-isactive', 'true');
  });
});

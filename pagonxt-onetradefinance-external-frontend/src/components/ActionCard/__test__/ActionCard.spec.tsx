import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ActionCard from '../ActionCard';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component ActionCard', () => {
  const title = 'Card title';
  const items = [
    {
      description: 'First description',
      onClick: jest.fn(),
      title: 'First item',
    },
    {
      description: 'Second description',
      onClick: jest.fn(),
      title: 'Second item',
    },
  ];

  beforeEach(() => {
    renderComponent(<ActionCard items={items} title={title} />);
  });

  it('renders the component correctly', () => {
    expect(screen.getByTestId('action-card')).toBeInTheDocument();
  });

  it('renders the provided title', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders the provided description in the items props', () => {
    expect(screen.getByText(items[0].title)).toBeInTheDocument();
    expect(screen.getByText(items[1].title)).toBeInTheDocument();
  });

  it('executes the onClick method prop provided for the actions in the items props', () => {
    userEvent.click(screen.getByText(items[0].title));
    expect(items[0].onClick).toHaveBeenCalled();
    expect(items[1].onClick).not.toHaveBeenCalled();

    userEvent.click(screen.getByText(items[1].title));
    expect(items[1].onClick).toHaveBeenCalled();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../testUtils/renderComponent';
import SummaryCard from '../SummaryCard';

describe('Component CollapsibleText', () => {
  const defaultProps = {
    sections: [
      {
        fields: [
          {
            label: 'Section A - Field 1',
            value: 'Value Field A1',
          },
          {
            collapsible: true,
            label: 'Section A - Field 2',
            value: 'Value Field A2',
          },
        ],
        key: 'sectionA',
        onEdit: jest.fn(),
        title: 'Section A',
      },
      {
        fields: [
          {
            label: 'Section B - Field 1',
            value: 'Value Field B1',
          },
          {
            label: 'Section B - Field 2',
            value: <span>Value Field B2</span>,
          },
        ],
        key: 'sectionB',
        title: 'Section B',
      },
    ],
    title: 'Card Test Title',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<SummaryCard {...defaultProps} {...props} />);
  };

  it('renders the component successfully with the provided title', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders correctly without the title if it is not provided', () => {
    renderWithProps({ title: '' });
    expect(screen.getByTestId('summary-card')).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();
  });

  it('renders all the sections correctly', () => {
    renderWithProps();
    defaultProps.sections.forEach(({ title }) => {
      expect(screen.getByText(`T_${title}`)).toBeInTheDocument();
    });
  });

  it('shows Edit button only on those sections with onEdit prop present', () => {
    renderWithProps();
    defaultProps.sections.forEach(({ key, onEdit }) => {
      if (onEdit) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen
            .getByTestId(`summary-card-section-${key}`)
            .querySelector('[data-testid="icon-edit"]'),
        ).toBeInTheDocument();
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen
            .getByTestId(`summary-card-section-${key}`)
            .querySelector('[data-testid="icon-edit"]'),
        ).not.toBeInTheDocument();
      }
    });
    expect(screen.getByTestId('summary-card')).toBeInTheDocument();
  });

  it('renders correctly the all the fields labels', () => {
    renderWithProps();

    defaultProps.sections.forEach(({ fields }) => {
      fields.forEach(({ label }) => {
        expect(screen.getByText(`T_${label}`)).toBeInTheDocument();
      });
    });
  });

  it('renders correctly the values that are components', () => {
    renderWithProps();
    // The field that has this text is rendering it with a <span> element
    expect(screen.getByText('Value Field B2')).toBeInTheDocument();
  });

  it('renders a collapsible component if collapsible prop is set to true for that field', () => {
    renderWithProps();

    const collapsibleField = defaultProps.sections[0].fields[1];
    const collapsibleElement = screen.getByTestId('collapsible-text');

    expect(collapsibleElement).toHaveTextContent(`${collapsibleField.value}`);
  });

  it('renders collapsible controls to container if collapsible prop is provided as true', () => {
    renderWithProps({ collapsible: true });
    expect(screen.getByTestId('collapsible-trigger')).toBeInTheDocument();
  });

  it('renders the contents collapsed by default if collapsible is provided as true', () => {
    renderWithProps({ collapsible: true });
    expect(screen.queryByTestId('collapsible-text')).not.toBeInTheDocument();
  });

  it('renders the contents when uncollapse icon is triggered', () => {
    renderWithProps({ collapsible: true });
    expect(screen.queryByTestId('collapsible-text')).not.toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId('collapsible-trigger')));
    expect(screen.queryByTestId('collapsible-text')).toBeInTheDocument();
  });
});

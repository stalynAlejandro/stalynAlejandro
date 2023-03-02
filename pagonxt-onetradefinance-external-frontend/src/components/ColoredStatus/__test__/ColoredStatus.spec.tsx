import React from 'react';
import { cleanup, screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import ColoredStatus from '../ColoredStatus';
import { statusColors } from '../ColoredStatusStyled';

describe('Component ColoredStatus', () => {
  const defaultProps = {
    status: 'approved',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<ColoredStatus {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(
      screen.getByText(`T_statuses.${defaultProps.status}`),
    ).toBeInTheDocument();
  });

  it('applies different colors for different status', () => {
    Object.keys(statusColors).forEach((status) => {
      renderWithProps({ status });
      const statusEl = screen.getByText(`T_statuses.${status}`);
      expect(statusEl).toHaveStyle({
        backgroundColor: statusColors[status].color,
      });
      expect(statusEl).toHaveStyle({
        borderColor: statusColors[status].borderColor,
      });
      cleanup();
    });
  });

  it('applies default color for unknown statuses', () => {
    renderWithProps({ status: 'unknown' });
    const statusEl = screen.getByText(`T_statuses.unknown`);

    expect(statusEl).toHaveStyle({
      backgroundColor: statusColors.default.color,
    });
    expect(statusEl).toHaveStyle({
      borderColor: statusColors.default.borderColor,
    });
  });
});

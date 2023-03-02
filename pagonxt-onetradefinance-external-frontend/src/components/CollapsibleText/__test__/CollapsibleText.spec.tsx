import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import CollapsibleText from '../CollapsibleText';

describe('Component CollapsibleText', () => {
  const defaultProps = {
    text: 'My short text is short',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<CollapsibleText {...defaultProps} {...props} />);
  };

  it('renders the component successfully with the provided text', () => {
    // This is the only test as Jest does not simulate nor execute CSS, so we cannot check ellipsis nor overflow props
    renderWithProps();
    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
  });
});

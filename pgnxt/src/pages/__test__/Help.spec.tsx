import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { renderComponent } from '../../testUtils/renderComponent';
import { Help } from '../Help';

describe('Page Help', () => {
  it('renders the page successfully', () => {
    renderComponent(
      <BrowserRouter>
        <Help />
      </BrowserRouter>,
    );
    expect(
      screen.getByText('T_help', { selector: '.pageTitle__title' }),
    ).toBeInTheDocument();
  });
});

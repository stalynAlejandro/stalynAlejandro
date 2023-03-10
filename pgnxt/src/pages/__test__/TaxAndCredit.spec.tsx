import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { renderComponent } from '../../testUtils/renderComponent';
import { TaxAndCredit } from '../TaxAndCredit';

describe('Page TaxAndCredit', () => {
  it('renders the page successfully', () => {
    renderComponent(
      <BrowserRouter>
        <TaxAndCredit />
      </BrowserRouter>,
    );
    expect(
      screen.getByText('T_taxAndCredit', { selector: '.pageTitle__title' }),
    ).toBeInTheDocument();
  });
});

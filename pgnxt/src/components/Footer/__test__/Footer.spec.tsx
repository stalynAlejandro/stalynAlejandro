import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import Footer from '../Footer';

describe('Component Footer', () => {
  const renderWithProps = () => {
    renderComponent(<Footer />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('page-footer')).toBeInTheDocument();
  });

  it('renders the logo correctly', () => {
    renderWithProps();
    const logoEl = screen
      .getByTestId('page-footer')
      .getElementsByTagName('img')?.[0];
    expect(logoEl).toHaveAttribute('src', '/images/SantanderLogo.png');
  });

  it('renders the list of links correctly', () => {
    renderWithProps();
    expect(screen.getByText('T_legalInformation')).toBeInTheDocument();
    expect(screen.getByText('T_privacy')).toBeInTheDocument();
    expect(screen.getByText('T_termsAndConditions')).toBeInTheDocument();
  });
});

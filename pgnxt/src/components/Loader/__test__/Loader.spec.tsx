import { screen } from '@testing-library/react';

import { renderComponent } from '../../../testUtils/renderComponent';
import Loader from '../Loader';

describe('Component Loader', () => {
  const renderWithProps = (props: any = {}) => {
    renderComponent(<Loader {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('loader-container')).toBeInTheDocument();
  });

  it('renders the title if provided', () => {
    const title = 'My title';
    renderWithProps({ title });

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders the subtitle if provided', () => {
    const subtitle = 'My subtitle';
    renderWithProps({ subtitle });

    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it('renders the title and subtitle if both are provided', () => {
    const title = 'My title';
    const subtitle = 'My subtitle';
    renderWithProps({ subtitle, title });

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it('renders the primary loader by default', () => {
    renderWithProps();

    expect(document.querySelectorAll('.floating-circle')).toHaveLength(1);
    expect(document.querySelectorAll('.logo-circle')).toHaveLength(1);
  });

  it('renders the secondary loader if primary prop is set to false', () => {
    renderWithProps({ primary: false });

    expect(document.querySelectorAll('.floating-circle')).toHaveLength(2);
    expect(document.querySelectorAll('.logo-circle')).toHaveLength(0);
  });
});

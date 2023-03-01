import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../testUtils/renderComponent';
import PageTitle from '../PageTitle';

describe('Component PageTitle', () => {
  const defaultProps = {
    title: 'My title',
  };

  const renderWithProps = (
    props: any = {},
    children: React.ReactNode = null,
  ) => {
    renderComponent(
      <PageTitle {...defaultProps} {...props}>
        {children}
      </PageTitle>,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(
      screen.getByTestId(
        `page-title-${defaultProps.title.split(' ').join('')}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders the provided children correctly', () => {
    renderWithProps({}, <div>Test child</div>);
    expect(screen.getByText('Test child')).toBeInTheDocument();
  });

  it('renders the back button correctly if provided', () => {
    const backButton = {
      icon: 'warning',
      label: 'My button',
      onClick: jest.fn(),
    };

    renderWithProps({
      backButton,
    });

    expect(screen.getByTestId(`icon-${backButton.icon}`)).toBeInTheDocument();
    expect(screen.getByText(backButton.label)).toBeInTheDocument();

    userEvent.click(screen.getByText(backButton.label));
    expect(backButton.onClick).toHaveBeenCalled();
  });

  it('renders the contextual nodes provided correctly', () => {
    renderWithProps({ contextualNode: <span>Hello my test</span> });
    expect(screen.getByText('Hello my test')).toBeInTheDocument();
  });
});

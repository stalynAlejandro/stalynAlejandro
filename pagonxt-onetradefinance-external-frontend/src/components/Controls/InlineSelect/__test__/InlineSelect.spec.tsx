import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../../testUtils/renderComponent';
import FormControlWrapper from '../../../../testUtils/FormControlWrapper';
import InlineSelect from '../InlineSelect';

describe('Control InlineSelect', () => {
  const defaultProps = {
    onChange: jest.fn(),
    options: [
      { label: '2021', value: '2021' },
      { label: '2022', value: '2022' },
    ],
    value: '2022',
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(
      <FormControlWrapper
        component={InlineSelect}
        {...defaultProps}
        {...props}
      />,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('inline-select')).toBeInTheDocument();
  });

  it('executes the provided onChange method when the value changes', () => {
    renderWithProps();
    act(() =>
      userEvent.click(
        screen
          .getByTestId('inline-select')
          .querySelector('.formInlineSelect__control')!,
      ),
    );
    act(() => userEvent.click(screen.getByText(defaultProps.options[0].label)));

    expect(defaultProps.onChange).toHaveBeenCalledWith(defaultProps.options[0].value);
  });

  it('shows the double chevron icon in stead of the single chevron one', () => {
    renderWithProps();
    expect(screen.getByTestId('icon-chevron-updown')).toBeInTheDocument();
  });
});

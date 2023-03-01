import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../../testUtils/renderComponent';
import FormControlWrapper from '../../../../testUtils/FormControlWrapper';
import MiniSelect from '../MiniSelect';

describe('Control MiniSelect', () => {
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
        component={MiniSelect}
        {...defaultProps}
        {...props}
      />,
    );
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('mini-select')).toBeInTheDocument();
  });

  it('executes the provided onChange method when the value changes', () => {
    renderWithProps();
    act(() =>
      userEvent.click(
        screen
          .getByTestId('mini-select')
          .querySelector('.formSelect__control')!,
      ),
    );
    act(() => userEvent.click(screen.getByText(defaultProps.options[0].label)));

    expect(defaultProps.onChange).toHaveBeenCalledWith(defaultProps.options[0].value);
  });

  it('does not throw any error if onChange is not defined', () => {
    renderWithProps({ onChange: undefined });

    act(() =>
      userEvent.click(
        screen
          .getByTestId('mini-select')
          .querySelector('.formSelect__control')!,
      ),
    );

    expect(() =>
      act(() =>
        userEvent.click(screen.getByText(defaultProps.options[0].label)),
      ),
    ).not.toThrow();
  });
});

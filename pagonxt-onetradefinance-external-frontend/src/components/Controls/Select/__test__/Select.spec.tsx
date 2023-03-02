import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../../testUtils/renderComponent';
import FormControlWrapper from '../../../../testUtils/FormControlWrapper';
import Select, { Option, SelectProps } from '../Select';
import theme from '../../../../resources/theme';
import { textIncludes } from '../../../../helpers/textIncludes';

describe('Control Select', () => {
  const options: Option[] = [
    { label: 'Opt A', value: 'optA' },
    { component: () => <span>Opt B</span>, value: 'optB' },
    { label: 'Opt C', value: 'optC' },
    { label: 'Opt D', value: { id: 123, randomProp: 'Abc' } },
  ];

  const groupedOptions = [
    {
      label: 'Group A',
      options,
    },
  ];

  const defaultProps = {
    onChange: jest.fn(),
    options,
    value: '',
  };

  const renderWithProps = (props: Partial<SelectProps> = {}) => {
    renderComponent(
      <FormControlWrapper component={Select} {...defaultProps} {...props} />,
    );
  };

  const getComponent = () => screen.getByTestId('form-select');

  const getSelectControl = () =>
    getComponent().querySelector('.formSelect__control');

  const clickOption = (text: string) => {
    try {
      act(() => userEvent.click(getSelectControl()!));
      act(() => userEvent.click(screen.getByText(text)));
    } catch (err) {
      // do nothing
    }
  };

  describe('Common behaviour', () => {
    it('renders the component successfully', () => {
      renderWithProps();

      expect(getComponent()).toBeInTheDocument();
      expect(getSelectControl()).toBeInTheDocument();
    });

    it('displays empty select value if no value from within the options is provided', () => {
      renderWithProps();
      expect(getSelectControl()).toHaveTextContent('');
    });

    it('executes provided onChange method when value changes', () => {
      renderWithProps();

      clickOption(options[2].label!);

      expect(defaultProps.onChange).toHaveBeenCalledWith(options[2].value);
    });

    it('executes provided onChange method and sends the selected value even if it is a complex object', () => {
      renderWithProps();

      clickOption(options[3].label!);

      expect(defaultProps.onChange).toHaveBeenCalledWith(options[3].value);
    });

    it('closes the options menu when selecting an option if isMulti is not provided as true', () => {
      renderWithProps();

      act(() => userEvent.click(getSelectControl()!));
      expect(screen.getByText(options[0].label!)).toBeInTheDocument();
      expect(screen.getByText(options[2].label!)).toBeInTheDocument();

      act(() => userEvent.click(screen.getByText(options[0].label!)));
      expect(screen.queryAllByText(options[0].label!)).toHaveLength(1); // Selected option, text will appear in input
      expect(screen.queryByText(options[2].label!)).not.toBeInTheDocument();
    });

    it('selects the correct option taking into account the value prop', () => {
      renderWithProps({ value: options[3].value });
      expect(getSelectControl()).toHaveTextContent(options[3].label!);
    });

    it('selects the correct option using the valueKey prop as key reference', () => {
      renderWithProps({
        value: {
          randomProp: 'Abc',
        },
        valueKey: 'randomProp',
      });
      expect(getSelectControl()).toHaveTextContent(options[3].label!);
    });

    it('renders correctly groups of options and selects the correct option within', () => {
      renderWithProps({ options: groupedOptions, value: options[2].value });
      expect(getSelectControl()).toHaveTextContent(options[2].label!);

      act(() => userEvent.click(getSelectControl()!));
      expect(getComponent()).toHaveTextContent(
        `${groupedOptions[0].label} (T_nResults--results:4)`,
      );
      expect(getComponent()).toHaveTextContent(
        groupedOptions[0].options[0].label!,
      );
      expect(getComponent()).toHaveTextContent(
        groupedOptions[0].options[2].label!,
      );
    });

    it('renders correctly options without groups', () => {
      renderWithProps();
      act(() => userEvent.click(getSelectControl()!));

      expect(getComponent()).toHaveTextContent(options[0].label!);
      expect(getComponent()).toHaveTextContent(options[2].label!);
    });

    it('adds the provided className to element class', () => {
      renderWithProps({ className: 'my-class' });
      expect(getComponent()).toHaveClass('my-class');
    });

    it('shows visual guide if error prop is provided', () => {
      renderWithProps({ error: true });
      expect(getComponent()).toHaveStyle({
        borderBottomColor: theme.colors.boston,
      });
    });

    it('does not call provided onChange when disabled prop is provided as true', () => {
      renderWithProps({ disabled: true });

      clickOption(options[3].label!);
      expect(defaultProps.onChange).not.toHaveBeenCalled();
    });

    it('renders correctly options with a Component prop to render', () => {
      renderWithProps();
      act(() => userEvent.click(getSelectControl()!));

      expect(screen.getByText('Opt B')).toBeInTheDocument();
      expect(screen.getByText('Opt B').closest('div')).toHaveClass(
        'option__content--hasComponent',
      );
    });
  });

  describe('Searchable select', () => {
    it('searches for coincidences if isSearchable is provided', () => {
      renderWithProps({
        filterOption: ({ value }: any, input: string) =>
          textIncludes(value, input),
        isSearchable: true,
      });

      act(() => userEvent.type(getSelectControl()!, 'C'));

      expect(screen.getByText('Opt C')).toBeInTheDocument();
      expect(screen.queryByText('Opt A')).not.toBeInTheDocument();
    });
  });

  describe('Multiple selection', () => {
    it('lets multiple selection if isMulti prop is provided as true', () => {
      renderWithProps({ isMulti: true });

      act(() => userEvent.click(getSelectControl()!));
      act(() => userEvent.click(screen.getByText(options[0].label!)));
      act(() => userEvent.click(screen.getByText(options[2].label!)));

      expect(defaultProps.onChange).toHaveBeenCalledWith([
        options[0].value,
        options[2].value,
      ]);
    });

    it('shows checkbox correctly checked for options when isMulti is true', () => {
      const targetOption = options[0];
      renderWithProps({ isMulti: true, value: [targetOption.value] });
      act(() => userEvent.click(getSelectControl()!));

      const checkedOption = getComponent()
        .querySelector('input:checked')
        ?.parentElement?.closest('.formSelect__option');

      expect(getComponent().querySelectorAll('input:checked')).toHaveLength(1);
      expect(checkedOption).toBeDefined();
      expect(checkedOption).toHaveTextContent(`${targetOption.label}`);
      expect(
        screen
          .getByText(`${options[2].label}`)
          ?.parentElement?.closest('.formSelect__option')
          ?.querySelector('input'),
      ).not.toBeChecked();
    });

    it('does not close select menu when selecting options if isMulti is true', () => {
      renderWithProps({ isMulti: true });

      act(() => userEvent.click(getSelectControl()!));
      expect(screen.queryByText(options[0].label!)).toBeInTheDocument();
      expect(screen.queryByText(options[2].label!)).toBeInTheDocument();

      act(() => userEvent.click(screen.getByText(options[0].label!)));
      expect(screen.queryAllByText(options[0].label!)).toHaveLength(2); // This will be present twice
      expect(screen.queryByText(options[2].label!)).toBeInTheDocument();
    });

    it('shows selected values labels separated by comma in input box', () => {
      renderWithProps({
        isMulti: true,
        value: [options[0].value, options[2].value],
      });
      expect(getSelectControl()).toHaveTextContent(
        [options[0].label, options[2].label].join(', '),
      );
    });
  });

  describe('Clearable select', () => {
    it('shows a first option without value if isClearable is true', () => {
      renderWithProps({ isClearable: true });
      act(() => userEvent.click(getSelectControl()!));

      expect(
        screen.getByText('T_selectEmptyOptionMessage'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('unselect-option')).toBeInTheDocument();
    });

    it('clears the value and closes the menu if the unselect-option is clicked', () => {
      renderWithProps({ isClearable: true });
      act(() => userEvent.click(getSelectControl()!));
      act(() =>
        userEvent.click(screen.getByText('T_selectEmptyOptionMessage')),
      );

      expect(defaultProps.onChange).toHaveBeenCalledWith(undefined);
      expect(
        screen.queryByText('T_selectEmptyOptionMessage'),
      ).not.toBeInTheDocument();
    });
  });
});

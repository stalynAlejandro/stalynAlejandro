import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../testUtils/renderComponent';
import FiltersModal, {
  FilterFieldProps,
  FiltersModalProps,
  FiltersProps,
} from '../FiltersModal';
import { formatDate } from '../../../utils/dates';
import { formatNumber } from '../../../utils/formatNumber';
import { changeInputValue } from '../../../testUtils/changeInputValue';

describe('Container FiltersModal', () => {
  const defaultProps: FiltersModalProps = {
    description: 'My description',
    filters: [
      {
        fields: [
          {
            key: 'fieldA',
            options: [
              {
                label: 'Field A Opt 1',
                value: 'fieldA-1',
              },
              {
                label: 'Field A Opt 2',
                value: 'fieldA-2',
              },
            ],
            placeholder: 'Field A',
            type: 'select',
          },
          {
            key: 'fieldB',
            placeholder: 'Field B',
            type: 'date',
          },
          {
            key: 'fieldC',
            options: [
              {
                label: 'Field C Opt 1',
                value: 'fieldC-1',
              },
              {
                label: 'Field C Opt 2',
                value: 'fieldC-2',
              },
            ],
            placeholder: 'Field C',
            type: 'select',
          },
        ],
        title: 'Section A',
      },
      {
        fields: [
          {
            key: 'fieldD',
            placeholder: 'Field D',
            type: 'text',
          },
          {
            key: 'fieldE',
            placeholder: 'Field E',
            type: 'number',
          },
          {
            key: 'fieldF',
            options: [
              {
                label: 'Field F Opt 1',
                value: 'fieldF-1',
              },
              {
                label: 'Field F Opt 2',
                value: 'fieldF-2',
              },
            ],
            placeholder: 'Field F',
            type: 'select',
          },
        ],
        title: 'Section B',
      },
    ],
    filterValues: {
      fieldA: ['fieldA-1'],
      fieldB: '2022-07-22T00:00:00.000Z',
      fieldC: ['fieldC-1', 'fieldC-2'],
      fieldD: 'Test value',
      fieldE: '1234',
    },
    isOpen: true,
    onApply: jest.fn(),
    onCancel: jest.fn(),
    onClose: jest.fn(),
    title: 'My title',
  };

  const getFiltersByType = (
    filters: FiltersModalProps['filters'] = defaultProps.filters,
  ) => {
    const filtersByType: { [key: string]: FiltersProps['fields'] } = {};

    filters.forEach(({ fields }) => {
      fields.forEach((field) => {
        if (!filtersByType[field.type]) {
          filtersByType[field.type] = [];
        }
        filtersByType[field.type].push(field);
      });
    });

    return filtersByType;
  };

  const getOptionsDictionary = () => {
    const dictionary: { [key: string]: string } = {};

    defaultProps.filters.forEach((filter) => {
      filter.fields.forEach((field) => {
        if ('options' in field) {
          field.options.forEach((opt) => {
            dictionary[opt.value] = opt.label;
          });
        }
      });
    });

    return dictionary;
  };

  const renderWithProps = (props: Partial<FiltersModalProps> = {}) => {
    renderComponent(<FiltersModal {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();

    expect(screen.getByTestId('modal-container')).toBeInTheDocument();

    // Title and description
    expect(screen.getByText(`T_${defaultProps.title}`)).toBeInTheDocument();
    expect(
      screen.getByText(`T_${defaultProps.description}`),
    ).toBeInTheDocument();

    // Filter section titles
    defaultProps.filters.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    // Modal buttons
    expect(screen.getByText('T_cleanAll')).toBeInTheDocument();
    expect(screen.getByText('T_apply')).toBeInTheDocument();
    expect(screen.getByText('T_cancel')).toBeInTheDocument();
  });

  it('does not render if the isOpen prop is sent as false', () => {
    renderWithProps({ isOpen: false });

    expect(screen.queryByTestId('modal-container')).not.toBeInTheDocument();
    expect(
      screen.queryByText(`T_${defaultProps.title}`),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('T_cleanAll')).not.toBeInTheDocument();
  });

  it('renders the filters controls correctly', () => {
    renderWithProps();
    const filtersByType = getFiltersByType();

    expect(screen.queryAllByTestId('form-select')).toHaveLength(
      filtersByType.select.length,
    );
    expect(screen.queryAllByTestId('date-picker')).toHaveLength(
      filtersByType.date.length,
    );
    expect(screen.queryAllByTestId('form-input')).toHaveLength(
      filtersByType.text.length,
    );
    expect(screen.queryAllByTestId('form-input-numeric')).toHaveLength(
      filtersByType.number.length,
    );
  });

  it('displays the provided values for the filters in their controls', () => {
    renderWithProps();

    const filtersByType = getFiltersByType();
    const { filterValues } = defaultProps;
    const optionsDictionary = getOptionsDictionary();

    filtersByType.select.forEach((field: FilterFieldProps) => {
      if (filterValues[field.key] && 'options' in field) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen.getByText(
            filterValues[field.key]
              .map((val: string) => optionsDictionary[val])
              .join(', '),
          ),
        ).toBeInTheDocument();
      }
    });

    filtersByType.text.forEach(({ key: fieldKey }) => {
      if (filterValues[fieldKey]) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen.getByDisplayValue(filterValues[fieldKey]),
        ).toBeInTheDocument();
      }
    });

    filtersByType.date.forEach(({ key: fieldKey }) => {
      if (filterValues[fieldKey]) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen.getByDisplayValue(
            formatDate(new Date(filterValues[fieldKey])),
          ),
        ).toBeInTheDocument();
      }
    });

    filtersByType.number.forEach(({ key: fieldKey }) => {
      if (filterValues[fieldKey]) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen.getByDisplayValue(formatNumber(filterValues[fieldKey])),
        ).toBeInTheDocument();
      }
    });
  });

  it('resets the filters values to empty when clicking the Clear button', () => {
    renderWithProps();

    act(() => userEvent.click(screen.getByText('T_cleanAll')));

    const filtersByType = getFiltersByType();
    const { filterValues } = defaultProps;
    const optionsDictionary = getOptionsDictionary();

    filtersByType.select.forEach((field: FilterFieldProps) => {
      if (filterValues[field.key] && 'options' in field) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen.queryByText(
            filterValues[field.key]
              .map((val: string) => optionsDictionary[val])
              .join(', '),
          ),
        ).not.toBeInTheDocument();
      }
    });

    filtersByType.text.forEach(({ key: fieldKey }) => {
      if (filterValues[fieldKey]) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen.queryByDisplayValue(filterValues[fieldKey]),
        ).not.toBeInTheDocument();
      }
    });

    filtersByType.date.forEach(({ key: fieldKey }) => {
      if (filterValues[fieldKey]) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen.queryByDisplayValue(
            formatDate(new Date(filterValues[fieldKey])),
          ),
        ).not.toBeInTheDocument();
      }
    });

    filtersByType.number.forEach(({ key: fieldKey }) => {
      if (filterValues[fieldKey]) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          screen.queryByDisplayValue(formatNumber(filterValues[fieldKey])),
        ).not.toBeInTheDocument();
      }
    });
  });

  it('allows changing the selected and written values in the filters fields', async () => {
    renderWithProps();

    const { filterValues } = defaultProps;
    const optionsDictionary = getOptionsDictionary();

    // Text
    await act(async () =>
      changeInputValue(
        screen.getByDisplayValue(filterValues.fieldD),
        `${filterValues.fieldD}ab`,
      ),
    );
    expect(
      screen.getByDisplayValue(`${filterValues.fieldD}ab`),
    ).toBeInTheDocument();

    // Select
    await act(async () =>
      userEvent.click(
        screen.getByText(optionsDictionary[filterValues.fieldA[0]]),
      ),
    );
    await act(async () =>
      userEvent.click(screen.getByText(optionsDictionary['fieldA-2'])),
    );
    expect(
      screen.getByText(
        [
          optionsDictionary[filterValues.fieldA[0]],
          optionsDictionary['fieldA-2'],
        ].join(', '),
      ),
    ).toBeInTheDocument();

    // Number
    await act(async () =>
      changeInputValue(
        screen.getByDisplayValue(formatNumber(filterValues.fieldE)),
        formatNumber(`${filterValues.fieldE}5`),
      ),
    );
    expect(
      screen.getByDisplayValue(formatNumber(`${filterValues.fieldE}5`)),
    ).toBeInTheDocument();

    // Date
    const selectedDate = new Date(filterValues.fieldB);
    const targetDate = new Date(
      Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), 15),
    );

    await act(async () =>
      userEvent.click(
        screen.getByTestId('date-picker').querySelector('label')!,
      ),
    );
    await act(() => userEvent.click(screen.getByText(targetDate.getDate())));

    expect(
      screen.getByDisplayValue(formatDate(targetDate)),
    ).toBeInTheDocument();

    // Check the onApply sends the correct values
    await act(() => userEvent.click(screen.getByText('T_apply')));
    expect(defaultProps.onApply).toHaveBeenCalledWith({
      ...filterValues,
      fieldA: ['fieldA-1', 'fieldA-2'],
      fieldB: new Date(targetDate),
      fieldD: `${filterValues.fieldD}ab`,
      fieldE: formatNumber(`${filterValues.fieldE}5`, 2, '.', ''),
    });
  });

  it('executes the provided onApply method when clicking the Apply button', () => {
    renderWithProps();

    act(() => userEvent.click(screen.getByText('T_apply')));
    expect(defaultProps.onApply).toHaveBeenCalled();
  });

  it('executes the provided onCancel method when clicking the Cancel button', () => {
    renderWithProps();

    act(() => userEvent.click(screen.getByText('T_cancel')));
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it('executes the provided onClose method when clicking the Close button', () => {
    renderWithProps();

    act(() => userEvent.click(screen.getByTestId('icon-close')));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('executes the provided onApply method with all values emptied if Clean button is pressed', () => {
    renderWithProps();

    act(() => userEvent.click(screen.getByText('T_cleanAll')));
    act(() => userEvent.click(screen.getByText('T_apply')));

    expect(defaultProps.onApply).toHaveBeenCalledWith({});
  });

  it('displays the related fields in order', () => {
    const fields: FilterFieldProps[] = [
      {
        key: 'fieldA',
        placeholder: 'Field A',
        relatedField: 'fieldC',
        type: 'number',
      },
      {
        key: 'fieldB',
        placeholder: 'Field B',
        type: 'number',
      },
      {
        key: 'fieldC',
        placeholder: 'Field C',
        type: 'number',
      },
    ];

    renderWithProps({
      filters: [
        {
          fields,
          title: 'Section A',
        },
      ],
    });

    const filterEls = Array.from(
      document.querySelectorAll('.filtersModal__fieldContainer'),
    );

    expect(filterEls[0]).toHaveTextContent(fields[0].placeholder);
    expect(filterEls[1]).toHaveTextContent(fields[2].placeholder);
    expect(filterEls[2]).toHaveTextContent(fields[1].placeholder);
  });

  it('renders a hyphen as the separator if none is specified and there are related fields', () => {
    const fields: FilterFieldProps[] = [
      {
        key: 'fieldA',
        placeholder: 'Field A',
        relatedField: 'fieldC',
        type: 'number',
      },
      {
        key: 'fieldB',
        placeholder: 'Field B',
        type: 'number',
      },
      {
        key: 'fieldC',
        placeholder: 'Field C',
        type: 'number',
      },
    ];

    renderWithProps({
      filters: [
        {
          fields,
          title: 'Section A',
        },
      ],
    });

    const filterEl = document.querySelector(
      '.filtersModal__fieldContainer--separator',
    );
    expect(filterEl).toBeInTheDocument();
    expect(filterEl?.nextSibling).toHaveTextContent('-');
  });

  it('renders the specified separator for the field if it has a related field', () => {
    const fields: FilterFieldProps[] = [
      {
        key: 'fieldA',
        placeholder: 'Field A',
        relatedField: 'fieldC',
        separator: '&',
        type: 'number',
      },
      {
        key: 'fieldB',
        placeholder: 'Field B',
        type: 'number',
      },
      {
        key: 'fieldC',
        placeholder: 'Field C',
        type: 'number',
      },
    ];

    renderWithProps({
      filters: [
        {
          fields,
          title: 'Section A',
        },
      ],
    });

    const filterEl = document.querySelector(
      '.filtersModal__fieldContainer--separator',
    );
    expect(filterEl).toBeInTheDocument();
    expect(filterEl?.nextSibling).toHaveTextContent('&');
  });
});

import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../testUtils/renderComponent';
import ManagementTable, { ManagementTableProps } from '../ManagementTable';
import { changeInputValue } from '../../../testUtils/changeInputValue';
import { FilterFieldProps } from '../../FiltersModal/FiltersModal';
import { formatNumber } from '../../../utils/formatNumber';

describe('Container ManagementTable', () => {
  const colKeys = ['A', 'B', 'C', 'D'];

  const defaultProps: ManagementTableProps = {
    cols: colKeys.map((letter) => ({
      key: `col-${letter}`,
      label: `Column ${letter}`,
    })),
    filters: [
      {
        fields: [
          {
            key: 'filter-A-1',
            options: [
              {
                label: 'Opt A.1.a',
                value: 'opt-a1a',
              },
              {
                label: 'Opt A.1.b',
                value: 'opt-a1b',
              },
            ],
            placeholder: 'Filter A.1',
            type: 'select',
          },
          {
            key: 'filter-A-2',
            placeholder: 'Filter A.2',
            type: 'date',
          },
        ],
        title: 'Filter A Section',
      },
      {
        fields: [
          {
            key: 'filter-B-1',
            placeholder: 'Filter B.1',
            type: 'number',
          },
          {
            key: 'filter-B-2',
            options: [
              {
                label: 'Opt B.2.a',
                value: 'opt-b2a',
              },
              {
                label: 'Opt B.2.b',
                value: 'opt-b2b',
              },
            ],
            placeholder: 'Filter B.2',
            type: 'select',
          },
        ],
        title: 'Filter B Section',
      },
    ],
    onFiltersChange: jest.fn(),
    quickFilterKeys: ['filter-A-1', 'filter-B-2'],
    rows: colKeys.reduce(
      (prv, letter) => ({
        ...prv,
        [`row-${letter}`]: colKeys.reduce(
          (rowpr, rowlt) => ({
            ...rowpr,
            [`col-${rowlt}`]: `Row ${letter} Col ${rowlt}`,
          }),
          {},
        ),
      }),
      {},
    ),
    searchByFields: [
      { key: 'field-text-A', label: 'Text A Placeholder' },
      { key: 'field-text-B', label: 'Text B Placeholder' },
    ],
    searchPlaceholder: 'Search placeholder',
  };

  const flatFilterFields = defaultProps.filters
    ?.map(({ fields }) => fields)
    .flat();

  const renderWithProps = (props: Partial<ManagementTableProps> = {}) => {
    renderComponent(<ManagementTable {...defaultProps} {...props} />);
  };

  describe('Common behaviour', () => {
    it('renders the component successfully', () => {
      renderWithProps();
      expect(screen.getByTestId('management-table')).toBeInTheDocument();
    });
  });

  describe('Search by input', () => {
    it('renders the "Search by" text field if searchByFields are provided', () => {
      renderWithProps();
      expect(screen.getByTestId('search-by-input')).toBeInTheDocument();
    });

    it('does not render the "Search by" text field if no searchByFields are provided', () => {
      renderWithProps({ searchByFields: [] });
      expect(screen.queryByTestId('search-by-input')).not.toBeInTheDocument();
    });

    it('renders the placeholder if there is only one searchByField', () => {
      renderWithProps({ searchByFields: [defaultProps.searchByFields![0]] });
      expect(
        screen.getByPlaceholderText(defaultProps.searchPlaceholder!),
      ).toBeInTheDocument();
    });

    it('renders the selected search field label if there is more than one searchByField', () => {
      renderWithProps();
      expect(
        screen.getByText(`T_${defaultProps.searchByFields![0].label}`),
      ).toBeInTheDocument();
    });

    it('changes the selected searchByField correctly and executes the provided onFiltersChange method', async () => {
      renderWithProps();
      jest.clearAllMocks();

      await act(() =>
        userEvent.click(
          screen.getByText(`T_${defaultProps.searchByFields![0].label}`),
        ),
      );
      await act(() =>
        userEvent.click(
          screen.getByText(`T_${defaultProps.searchByFields![1].label}`),
        ),
      );

      expect(
        screen.queryByText(`T_${defaultProps.searchByFields![0].label}`),
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(`T_${defaultProps.searchByFields![1].label}`),
      ).toBeInTheDocument();

      expect(defaultProps.onFiltersChange).toHaveBeenCalled();
    });

    it('changes the value of the filter correctly when writing in the search by input and executes the provided onFiltersChange method', async () => {
      jest.useFakeTimers();
      renderWithProps();
      jest.clearAllMocks();
      const inputEl = screen.getByTestId('search-by-input-input');

      await act(async () => {
        changeInputValue(inputEl, 'test');
        // ManagementTable sets debounceMs in SearchByInput
        jest.advanceTimersByTime(700);
      });

      expect(defaultProps.onFiltersChange).toHaveBeenCalledWith({
        [defaultProps.searchByFields![0].key]: 'test',
        [defaultProps.searchByFields![1].key]: '',
      });
      jest.useRealTimers();
    });
  });

  describe('Quick filters', () => {
    it('shows the provided quick select filters', () => {
      renderWithProps();

      expect(screen.getByText('T_filterBy')).toBeInTheDocument();
      defaultProps.quickFilterKeys!.forEach((filterKey: string) => {
        expect(
          screen.queryByTestId(`filter-select-${filterKey}`),
        ).toBeInTheDocument();
        expect(
          screen.queryByText(
            `${
              flatFilterFields?.find((f) => f.key === filterKey)?.placeholder
            }`,
          ),
        ).toBeInTheDocument();
      });
    });

    it('does not show quick select filters if they are not provided', () => {
      renderWithProps({ quickFilterKeys: [] });

      expect(screen.queryByText('T_filterBy')).not.toBeInTheDocument();
      defaultProps.quickFilterKeys!.forEach((filterKey: string) => {
        expect(
          screen.queryByTestId(`filter-select-${filterKey}`),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(
            `${
              flatFilterFields?.find((f) => f.key === filterKey)?.placeholder
            }`,
          ),
        ).not.toBeInTheDocument();
      });
    });

    it.skip('updates the value of the select filter when it is changed and executes the provided onFiltersChange method', async () => {
      renderWithProps();

      const filterKey = defaultProps.quickFilterKeys![0];
      const filterSelectEl = screen.getByTestId(`filter-select-${filterKey}`)!;
      const { getByText } = within(filterSelectEl);

      const optionsField: FilterFieldProps & { options?: any } =
        flatFilterFields!.find((f) => f.key === filterKey && 'options' in f)!;

      await act(() => {
        userEvent.click(getByText(optionsField.placeholder));
      });

      await act(() => {
        userEvent.click(getByText(optionsField.options[0].label));
      });

      await act(() => {
        userEvent.click(getByText('T_apply'));
      });

      await waitFor(() => {
        expect(getByText('1')).toBeInTheDocument();
      });

      expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          'filter-A-1': [optionsField.options[0].value],
        }),
      );
    });

    it.skip('shows a count display with the number of values selected for the filter', async () => {
      renderWithProps();

      const filterKey = defaultProps.quickFilterKeys![0];
      const filterSelectEl = screen.getByTestId(`filter-select-${filterKey}`)!;
      const { getByText } = within(filterSelectEl);

      const optionsField: FilterFieldProps & { options?: any } =
        flatFilterFields!.find((f) => f.key === filterKey && 'options' in f)!;

      await act(() => {
        userEvent.click(getByText(optionsField.placeholder));
      });

      await act(() => {
        userEvent.click(getByText(optionsField.options[0].label));
      });

      expect(getByText('1')).toBeInTheDocument();
    });

    it('clears the values selected of the filter when clcking the count display', async () => {
      renderWithProps();

      const filterKey = defaultProps.quickFilterKeys![0];
      const filterSelectEl = screen.getByTestId(`filter-select-${filterKey}`)!;
      const { getByText } = within(filterSelectEl);

      const optionsField: FilterFieldProps & { options?: any } =
        flatFilterFields!.find((f) => f.key === filterKey && 'options' in f)!;

      await act(() => {
        userEvent.click(getByText(optionsField.placeholder));
      });

      await act(() => {
        userEvent.click(getByText(optionsField.options[0].label));
      });

      act(() => userEvent.click(getByText('1')));
      expect(defaultProps.onFiltersChange).toHaveBeenCalledWith({});
    });

    it('opens the modal with all the filters when clicking the "All filters" button', () => {
      renderWithProps();

      act(() => userEvent.click(screen.getByText('T_allFilters')));
      expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    });
  });

  describe('All filters modal', () => {
    it('displays all the filters provided with their categories', () => {
      renderWithProps();

      act(() => userEvent.click(screen.getByText('T_allFilters')));
      const { getByText } = within(screen.getByTestId('modal-container'));

      expect(getByText('T_allFilters')).toBeInTheDocument();
      expect(getByText('T_filterAtLeastOne')).toBeInTheDocument();

      defaultProps.filters!.forEach((fs) => {
        expect(getByText(fs.title)).toBeInTheDocument();

        fs.fields.forEach((f) => {
          expect(getByText(`T_${f.placeholder}`)).toBeInTheDocument();
        });
      });
    });

    it('closes the modal when clicking on the close icon', () => {
      renderWithProps();

      act(() => userEvent.click(screen.getByText('T_allFilters')));
      expect(screen.getByText('T_filterAtLeastOne')).toBeInTheDocument();

      act(() => userEvent.click(screen.getByTestId('icon-close')));
      expect(screen.queryByText('T_filterAtLeastOne')).not.toBeInTheDocument();
    });

    it('updates the values of the modal filters correctly and executes the provided onFiltersChanged method when Apply button is clicked', async () => {
      renderWithProps();
      act(() => userEvent.click(screen.getByText('T_allFilters')));
      jest.clearAllMocks();

      const { getByText } = within(screen.getByTestId('modal-container'));

      const targetFilter: FilterFieldProps & { options?: any } =
        flatFilterFields?.find((f) => f.type === 'select')!;

      await act(() => {
        userEvent.click(
          getByText(`T_${targetFilter!.placeholder}`)
            .closest('label')!
            .querySelector('.formSelect__control')!,
        );
      });

      await act(() => {
        userEvent.click(getByText(targetFilter.options[0].label));
      });

      act(() => userEvent.click(screen.getByText('T_apply')));
      expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          'filter-A-1': [targetFilter.options[0].value],
        }),
      );
    });

    it.skip('does not update the modal filters when the Cancel button is clicked', async () => {
      renderWithProps();
      act(() => userEvent.click(screen.getByText('T_allFilters')));
      jest.clearAllMocks();

      const { getByText } = within(screen.getByTestId('modal-container'));

      const targetFilter: FilterFieldProps & { options?: any } =
        flatFilterFields?.find((f) => f.type === 'select')!;

      await act(() => {
        userEvent.click(
          getByText(`T_${targetFilter!.placeholder}`)
            .closest('label')!
            .querySelector('.formSelect__control')!,
        );
      });

      await act(() => {
        userEvent.click(getByText(targetFilter.options[0].label));
      });

      act(() => userEvent.click(screen.getByText('T_cancel')));
      expect(defaultProps.onFiltersChange).not.toHaveBeenCalled();
    });

    it('loads the provided filterValues and displays them correctly', () => {
      const { options } = (flatFilterFields?.find(
        (f) => f.key === 'filter-B-2',
      ) || {}) as FilterFieldProps & { options?: any };

      renderWithProps({
        filterValues: {
          'filter-B-1': '20',
          'filter-B-2': [options[0].value],
        },
      });
      act(() => userEvent.click(screen.getByText('T_allFilters')));

      expect(screen.getByDisplayValue(formatNumber('20'))).toBeInTheDocument();
      expect(screen.getByText(options[0].label)).toBeInTheDocument();
    });
  });
});

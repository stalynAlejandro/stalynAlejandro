import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TableProps } from '../../components/Table/Table';
import {
  StTable,
  StSearchByInput,
  StFiltersContainer,
  StPropFiltersContainer,
  StAllFiltersButton,
} from './ManagementTableStyled';
import { FilterSelect } from '../../components/FilterSelect';
import { FiltersModal } from '../FiltersModal';
import { FiltersProps, FilterValuesProps } from '../FiltersModal/FiltersModal';
import { SearchByInputProps } from '../../components/SearchByInput/SearchByInput';

export interface ManagementTableProps extends TableProps {
  filterValues?: FilterValuesProps;
  filters?: FiltersProps[];
  onFiltersChange: (filtersValues: any) => void;
  quickFilterKeys?: string[] | null;
  rows: {
    [id: string]: {
      [key: string]:
        | string
        | number
        | { component: () => React.ReactNode; value: string };
    };
  };
  searchByFields?: SearchByInputProps['searchByFields'];
  searchPlaceholder?: string;
}

const ManagementTable: React.FC<ManagementTableProps> = ({
  cols,
  filters,
  filterValues: filterValuesProp,
  onFiltersChange,
  quickFilterKeys,
  rows,
  searchByFields,
  searchPlaceholder,
  ...rest
}) => {
  const { t } = useTranslation();
  const [allFiltersDialogOpen, setAllFiltersDialogOpen] = useState(false);

  const [filterValues, setFilterValues] = useState<FilterValuesProps>(
    filterValuesProp!,
  );

  const updateFilterValue = (fieldKey: string, fieldValue: any) => {
    setFilterValues((current) => ({ ...current, [fieldKey]: fieldValue }));
  };

  const onApplyNewFilters = (newFiltersValues: FilterValuesProps) => {
    setFilterValues(newFiltersValues);
  };

  const flatFilterFields = filters?.map(({ fields }) => fields).flat();

  useEffect(() => {
    onFiltersChange(filterValues);
  }, [filterValues]);

  return (
    <div data-testid="management-table">
      <StFiltersContainer>
        {searchByFields && searchByFields.length > 0 && (
          <StSearchByInput
            debounceMs={700}
            placeholder={searchPlaceholder}
            searchByFields={searchByFields}
            onChange={({ key, text }) => {
              if (key) {
                // Avoid keeping value to old keys: if we change keys, we reset the value for the previous one
                searchByFields.forEach((field) => {
                  updateFilterValue(field.key, '');
                });

                // After resetting all values, set the value for the current key
                updateFilterValue(key, text);
              }
            }}
          />
        )}
        {/* Filters */}
        {quickFilterKeys!.length > 0 && filters!.length > 0 && (
          <StPropFiltersContainer>
            <span>{t('filterBy')}</span>
            <ul>
              {flatFilterFields!
                .filter(
                  ({ key, type }) =>
                    type === 'select' && quickFilterKeys?.includes(key),
                )
                .map(
                  ({
                    key,
                    options,
                    placeholder: filterPlaceholder,
                    title,
                  }: any) => (
                    <li
                      key={`filter-select-li-${key}`}
                      data-testid={`filter-select-${key}`}
                    >
                      <FilterSelect
                        key={`filter-select-for-${key}`}
                        options={options}
                        placeholder={
                          cols.find((col) => col.key === key)?.label ||
                          filterPlaceholder ||
                          t(`filterKeys.${key}`)
                        }
                        title={title}
                        value={filterValues[key]}
                        onChange={(selectedValues) =>
                          updateFilterValue(key, selectedValues)
                        }
                      />
                    </li>
                  ),
                )}
              <li key="filter-select-li-all" data-testid="filter-select-all">
                <StAllFiltersButton
                  icon="add"
                  iconPosition="right"
                  label={t('allFilters')}
                  onClick={() => setAllFiltersDialogOpen(true)}
                />
              </li>
            </ul>
          </StPropFiltersContainer>
        )}
      </StFiltersContainer>
      {/* Table */}
      <StTable cols={cols} rows={rows} {...rest} />
      {filters!.length > 0 && (
        <FiltersModal
          description="filterAtLeastOne"
          filters={filters!}
          filterValues={filterValues}
          isOpen={allFiltersDialogOpen}
          title="allFilters"
          onApply={onApplyNewFilters}
          onCancel={() => setAllFiltersDialogOpen(false)}
          onClose={() => setAllFiltersDialogOpen(false)}
        />
      )}
    </div>
  );
};

ManagementTable.defaultProps = {
  filters: [],
  filterValues: {},
  quickFilterKeys: [],
  searchByFields: undefined,
  searchPlaceholder: '',
};

export default ManagementTable;

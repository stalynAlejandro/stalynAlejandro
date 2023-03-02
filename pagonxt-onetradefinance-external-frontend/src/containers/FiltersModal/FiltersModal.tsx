import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { DatePicker } from '../../components/Controls/DatePicker';
import { Input } from '../../components/Controls/Input';
import { FilterSelectOptionProps } from '../../components/FilterSelect/FilterSelect';
import {
  StBoldTitle,
  StFilterFieldsContainer,
  StModal,
  StSelect,
} from './FiltersModalStyled';

interface TextFieldProps {
  type: 'text' | 'date';
}

interface SelectFieldProps {
  options: FilterSelectOptionProps[];
  type: 'select';
}

interface NumberFieldProps {
  type: 'number';
}

interface CommonFieldProps {
  key: string;
  placeholder: string;
  relatedField?: string;
  separator?: string;
  title?: string;
}

export type FilterFieldProps = CommonFieldProps &
  (TextFieldProps | SelectFieldProps | NumberFieldProps);

export interface FiltersProps {
  fields: FilterFieldProps[];
  title: string;
}

export interface FilterValuesProps {
  [key: string]: any;
}

export interface FiltersModalProps {
  description: string;
  filterValues: FilterValuesProps;
  filters: FiltersProps[];
  isOpen: boolean;
  onApply: (newFilters: FilterValuesProps) => void;
  onCancel: () => void;
  onClose: () => void;
  title: string;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  description,
  filters,
  filterValues,
  isOpen,
  onApply,
  onCancel,
  onClose,
  title,
}) => {
  const { t } = useTranslation();
  const [displayedFilterValues, setDisplayedFilterValues] =
    useState<FilterValuesProps>(filterValues);

  const getReorganizedFiltersByRelation = () => {
    const addedKeys: string[] = [];
    const reorganizedFilters = filters.map((filter) => ({
      ...filter,
      fields: filter.fields.reduce((acc, cur, i, originalFields) => {
        const relatedField =
          (!!cur.relatedField &&
            originalFields.find((field) => field.key === cur.relatedField)) ||
          undefined;

        const newAccumulative: FilterFieldProps[] = [...acc];

        // If it has not been added, add it and remove the relatedField if doesn't exist
        if (!addedKeys.includes(cur.key)) {
          newAccumulative.push({ ...cur, relatedField: relatedField?.key });
        }

        // If relatedField exists, add it next to the current field
        if (relatedField) {
          newAccumulative.push(relatedField);
          addedKeys.push(relatedField.key);
        }

        return newAccumulative;
      }, [] as FilterFieldProps[]),
    }));

    return reorganizedFilters;
  };

  // Reorganize filters to make sure related filters are one next to another
  const reorganizedFiltersByRelation = getReorganizedFiltersByRelation();

  const updateFilterValue = (fieldKey: string, fieldValue: any) => {
    setDisplayedFilterValues((current) => {
      const newValues = {
        ...current,
      };

      if (
        (typeof fieldValue === 'string' || Array.isArray(fieldValue)) &&
        !fieldValue.length
      ) {
        delete newValues[fieldKey];
      } else {
        newValues[fieldKey] = fieldValue;
      }

      return newValues;
    });
  };

  const restoreFilterValues = () => {
    setDisplayedFilterValues(filterValues);
  };

  const onClean = () => {
    setDisplayedFilterValues({});
  };

  const handleOnCancel = () => {
    restoreFilterValues();
    onCancel();
  };

  const handleOnApply = () => {
    onApply(displayedFilterValues);
  };

  const handleOnClose = () => {
    restoreFilterValues();
    onClose();
  };

  useEffect(() => {
    restoreFilterValues();
  }, [filterValues]);

  return (
    <StModal
      acceptButton={{
        className: 'filtersModal__acceptButton',
        label: t('apply'),
        onClick: handleOnApply,
      }}
      cancelButton={{
        className: 'filtersModal__cancelButton',
        label: t('cancel'),
        onClick: handleOnCancel,
      }}
      contextualButton={{
        className: 'filtersModal__cleanButton',
        label: t('cleanAll'),
        onClick: onClean,
      }}
      isOpen={isOpen}
      isWide
      title={t(title)}
      onClose={handleOnClose}
    >
      {t(description)}
      {reorganizedFiltersByRelation?.map(({ fields, title: sectionTitle }) => (
        <React.Fragment key={`filter-section-${sectionTitle}`}>
          {sectionTitle && <StBoldTitle>{sectionTitle}</StBoldTitle>}
          <StFilterFieldsContainer>
            {fields?.map((field, i) => (
              <React.Fragment key={`filter-field-${field.placeholder}`}>
                {i % 2 !== 0 && field.relatedField && (
                  <div className="filtersModal__fieldClear" />
                )}
                <div
                  className={cx({
                    filtersModal__fieldContainer: true,
                    'filtersModal__fieldContainer--separator':
                      !!field.relatedField,
                  })}
                  data-testid={`filter-field-${field.key}`}
                >
                  {(field.type === 'select' && (
                    <StSelect
                      isMulti
                      options={field.options}
                      placeholder={t(field.placeholder)}
                      value={displayedFilterValues[field.key] || []}
                      variant="faded"
                      onChange={(selectedOptions: any[]) => {
                        updateFilterValue(field.key, selectedOptions);
                      }}
                    />
                  )) ||
                    (field.type === 'date' && (
                      <DatePicker
                        placeholder={t(field.placeholder)}
                        value={`${displayedFilterValues[field.key] || ''}`}
                        onChange={(val) => updateFilterValue(field.key, val)}
                      />
                    )) ||
                    (field.type === 'number' && (
                      <Input
                        placeholder={t(field.placeholder)}
                        type="number"
                        value={`${displayedFilterValues[field.key] || ''}`}
                        onChange={(val) => updateFilterValue(field.key, val)}
                      />
                    )) || (
                      <Input
                        placeholder={t(field.placeholder)}
                        value={`${displayedFilterValues[field.key] || ''}`}
                        onChange={(val) => updateFilterValue(field.key, val)}
                      />
                    )}
                </div>
                {!!field.relatedField && (
                  <div className="filtersModal__fieldSeparator">
                    {field.separator || '-'}
                  </div>
                )}
              </React.Fragment>
            ))}
          </StFilterFieldsContainer>
        </React.Fragment>
      ))}
    </StModal>
  );
};

export default FiltersModal;

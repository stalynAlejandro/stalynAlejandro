import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import Select, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MenuProps,
  MultiValueProps,
  OptionProps,
} from 'react-select';

import { renderFunctionText } from '../../utils/renderFunctionText';
import { Button } from '../Button';
import { Checkbox } from '../Controls/Checkbox';
import { Icon } from '../Icon';
import { TextButton } from '../TextButton';
import { StSelectContainer, StSelectedIndicator } from './FilterSelectStyled';
import { arrayDiff } from '../../utils/arrayDiff';

export interface FilterSelectOptionProps {
  label: any;
  value: any;
}

interface FilterSelectProps {
  className?: string;
  onChange: (values: any) => void;
  options?: FilterSelectOptionProps[];
  placeholder?: string | (() => React.ReactNode);
  title?: string | (() => React.ReactNode);
  value?: any[];
}

const formatOptionLabel = ({ label }: any) => renderFunctionText(label);

const Option: React.FC<OptionProps> = (props) => {
  const { isSelected, label } = props;
  return (
    <components.Option {...props}>
      <Checkbox
        checked={isSelected}
        label={label}
        wrapper="div"
        onChange={() => null}
      />
    </components.Option>
  );
};

const getMultiValueContainer = (
  placeholder: FilterSelectProps['placeholder'],
) => {
  const MultiValueContainer: React.FC<MultiValueProps> = ({ index }) =>
    (!index && <span>{renderFunctionText(placeholder!)}</span>) || null;

  return MultiValueContainer;
};

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
  const { selectProps } = props;

  return (
    <components.DropdownIndicator {...props}>
      <Icon
        icon={`${
          selectProps.menuIsOpen ? 'chevron-up-bold' : 'chevron-down-bold'
        }`}
      />
    </components.DropdownIndicator>
  );
};

const ClearIndicator: React.FC<ClearIndicatorProps> = (props) => (
  <StSelectedIndicator data-testid="filter-select-indicator">
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {props.getValue().length}
  </StSelectedIndicator>
);

const getCustomMenu = (
  title: FilterSelectProps['title'],
  onApply: () => void,
  onClean: () => void,
) => {
  const CustomMenu: React.FC<MenuProps> = (props) => {
    const { t } = useTranslation();
    const {
      children,
      selectProps: { onMenuClose },
    } = props;

    return (
      <components.Menu {...props}>
        <>
          {title && (
            <div className="filterSelect__menuTitle">
              {renderFunctionText(title)}
            </div>
          )}
          {children}
          <div className="filterSelect__buttonsContainer">
            <Button
              label={t('apply')}
              onClick={() => {
                onApply();
                onMenuClose();
              }}
            />
            <TextButton label={t('cleanAll')} onClick={onClean} />
          </div>
        </>
      </components.Menu>
    );
  };

  return CustomMenu;
};

const FilterSelect: React.FC<FilterSelectProps> = ({
  className,
  onChange,
  options,
  placeholder,
  title,
  value,
}) => {
  const [hasUnappliedChanges, setHasUnappliedChanges] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    FilterSelectOptionProps[]
  >([]);

  const onApplySelection = () => {
    onChange(
      selectedOptions?.map((opt: FilterSelectOptionProps) => opt.value) || [],
    );
  };

  const onCleanSelection = () => {
    onChange([]);
  };

  useEffect(() => {
    if (options!.length > 0) {
      const selectedOpts = options!.filter((opt) =>
        (value || []).some((val) => val === opt.value),
      );

      setSelectedOptions(selectedOpts);
    }
  }, [value, options]);

  useEffect(() => {
    const valueDifferences = arrayDiff(
      value,
      selectedOptions.map((opt) => opt.value),
    );

    if (selectedOptions?.length && valueDifferences.length) {
      setHasUnappliedChanges(true);
    } else {
      setHasUnappliedChanges(false);
    }
  }, [value, selectedOptions]);

  return (
    <StSelectContainer
      className={cx({
        filterSelect: true,
        'filterSelect--unapplied': hasUnappliedChanges,
        [className!]: !!className,
      })}
      data-testid="filter-select"
      hasValues={selectedOptions.length > 0}
    >
      <Select
        blurInputOnSelect={false}
        className="filterSelect"
        classNamePrefix="filterSelect"
        closeMenuOnSelect={false}
        components={{
          ClearIndicator,
          DropdownIndicator,
          Menu: getCustomMenu(title || '', onApplySelection, onCleanSelection),
          MultiValue: getMultiValueContainer(placeholder || ''),
          Option,
        }}
        formatOptionLabel={formatOptionLabel}
        hideSelectedOptions={false}
        isMulti
        options={options}
        placeholder={renderFunctionText(placeholder!)}
        value={selectedOptions}
        onChange={(selectedOpts: any) => {
          setSelectedOptions(selectedOpts);
        }}
      />
    </StSelectContainer>
  );
};

FilterSelect.defaultProps = {
  className: '',
  options: [],
  placeholder: '',
  title: '',
  value: undefined,
};

export default FilterSelect;

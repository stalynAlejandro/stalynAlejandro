/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useState } from 'react';
import ReactSelect, {
  components,
  Props,
  OptionsOrGroups,
  GroupBase,
  OptionContext,
  OptionProps,
  ValueContainerProps,
  MenuListProps,
  DropdownIndicatorProps,
} from 'react-select';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { Icon } from '../../Icon';
import { FloatingPlaceholder } from '../FloatingPlaceholder';
import { FormField } from '../types/FormField';
import { StSelectContainer, StOptionContainer } from './SelectStyled';
import i18n from '../../../i18n';
import { DefaultValue } from './OptionComponents/DefaultValue';
import { isOptionSelected } from '../../../helpers/isOptionSelected';
import { Checkbox } from '../Checkbox';

export interface Option {
  component?: React.FC<{ context: OptionContext; label?: string; value: any }>;
  label?: string;
  value: any;
}

interface GroupedOption {
  readonly label?: Option['label'];
  readonly options: readonly Option[];
}

export interface SelectProps extends FormField, Props {
  formatOptionLabel?: (option: any, metadata: any) => React.ReactNode;
  isSearchable?: boolean;
  key?: string;
  onChange?: (val: any | any[]) => void;
  options?: OptionsOrGroups<Option, GroupedOption>;
  value: any | any[];
  valueKey?: string;
  variant?: 'clean' | 'faded' | 'pijama';
}

const formatGroupLabel = ({ label = '', options }: GroupBase<any>) => (
  <div>
    {/* eslint-disable-next-line react/no-danger */}
    <span dangerouslySetInnerHTML={{ __html: label! }} />{' '}
    <span>({i18n.t('nResults', { results: options.length }).toString()})</span>
  </div>
);

const defaultFormatOptionLabel = (
  { component: Component, label = '', value }: Option,
  { context }: { context: OptionContext },
) => (
  <div
    className={cx({
      option__content: true,
      'option__content--hasComponent': !!Component,
    })}
  >
    {(Component && (
      <Component context={context} label={label} value={value} />
    )) || <DefaultValue context={context} label={label} value={value} />}
  </div>
);

const DropdownIndicator: React.FC<DropdownIndicatorProps> = ({
  selectProps,
}) => (
  <Icon
    icon={`${selectProps.menuIsOpen ? 'chevron-up-bold' : 'chevron-down-bold'}`}
  />
);

const MenuList: React.FC<MenuListProps> = (props) => {
  const {
    children,
    clearValue,
    selectProps: { isClearable, isMulti, onMenuClose, options },
  } = props;
  const { t } = useTranslation();

  return (
    <components.MenuList {...props}>
      {!isMulti && options && isClearable && (
        <div
          className="formSelect__option formSelect__option--unselect"
          data-testid="unselect-option"
        >
          <div>
            <button
              type="button"
              onClick={() => {
                clearValue();
                onMenuClose();
              }}
            >
              {t('selectEmptyOptionMessage')}
            </button>
          </div>
        </div>
      )}
      {children}
    </components.MenuList>
  );
};

const ValueContainer: React.FC<ValueContainerProps<Option[]>> = (props) => {
  const { children, selectProps } = props;
  const { isMulti, value: values } = selectProps;

  return (
    <components.ValueContainer {...props}>
      {isMulti &&
        ((!!values?.length && (
          <div className="formSelect__single-value">
            <div className="option__content">
              <DefaultValue
                context="value"
                label={values!.map((opt) => (opt as Option).label).join(', ')}
                value={{}}
              />
            </div>
          </div>
        )) || <span />)}
      {children}
    </components.ValueContainer>
  );
};

const CustomOption: React.FC<OptionProps<Option>> = (props) => {
  const { children, isMulti, isSelected } = props;

  return (
    <components.Option {...props}>
      <StOptionContainer>
        {isMulti && (
          <div style={{ pointerEvents: 'none' }}>
            <Checkbox checked={isSelected} label="" onChange={() => null} />
          </div>
        )}
        {children}
      </StOptionContainer>
    </components.Option>
  );
};

const Select = forwardRef<any, SelectProps>(
  (
    {
      className = '',
      disabled = false,
      error = false,
      formatOptionLabel,
      isMulti,
      isSearchable,
      key,
      onChange,
      options,
      placeholder = '',
      value = '',
      valueKey = '',
      variant,
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const hasValue = Array.isArray(value) ? !!value.length : !!value;
    const [selectedOptions, setSelectedOptions] = useState<Option[]>();

    useEffect(() => {
      let selected: any[] = [];

      if (!options?.length) {
        setSelectedOptions(selected);
        return;
      }

      // It's GroupedOptions
      options!.some((option: Option | GroupedOption) => {
        if ('options' in option) {
          // If it's an array, we check if the option value is inside the values selected
          selected = option.options.filter((opt: any) =>
            isOptionSelected(opt, value, valueKey),
          );
        } else if (isOptionSelected(option, value, valueKey)) {
          selected.push(option);
        }

        // If it's not multi, we only need one option selected
        return !isMulti && selected.length;
      });

      setSelectedOptions(selected);
    }, [value, options]);

    return (
      <StSelectContainer
        key={key}
        className={cx(className, 'form-field')}
        data-testid="form-select"
        disabled={!!disabled}
        hasError={!!error}
        hasPlaceholder={!!placeholder}
        hasValue={hasValue}
        variant={variant!}
      >
        <ReactSelect
          ref={ref}
          blurInputOnSelect={!isMulti}
          className="formSelect"
          classNamePrefix="formSelect"
          closeMenuOnSelect={!isMulti}
          components={{
            DropdownIndicator,
            MenuList,
            MultiValueContainer: () => null,
            Option: CustomOption as any,
            ValueContainer: ValueContainer as any,
            ...(rest.components || {}),
          }}
          formatGroupLabel={formatGroupLabel}
          formatOptionLabel={formatOptionLabel}
          hideSelectedOptions={false}
          isDisabled={disabled}
          isMulti={isMulti}
          isSearchable={isSearchable}
          noOptionsMessage={() => t('noOptionsSelect')}
          options={options}
          placeholder=""
          value={hasValue ? selectedOptions : ''}
          onChange={(val: any) => {
            let selectedValue: any;

            if (val === null) {
              selectedValue = undefined;
            } else if ('value' in val) {
              selectedValue = val.value;
            } else if (Array.isArray(val)) {
              selectedValue = val.map((opt) => opt.value);
            }

            onChange?.(selectedValue);
          }}
          {...rest}
        />
        {placeholder && (
          <FloatingPlaceholder
            className="select-placeholder"
            isFloating={hasValue}
          >
            {placeholder}
          </FloatingPlaceholder>
        )}
      </StSelectContainer>
    );
  },
);

Select.defaultProps = {
  formatOptionLabel: defaultFormatOptionLabel,
  isSearchable: false,
  key: '',
  onChange: () => null,
  options: [],
  valueKey: '',
  variant: 'clean',
};

export default Select;

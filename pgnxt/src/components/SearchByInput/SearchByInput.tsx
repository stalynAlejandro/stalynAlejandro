import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';

import {
  StSelect,
  StInput,
  StSearchIcon,
  StSearchInputContainer,
} from './SearchByInputStyled';

export interface SearchByInputProps {
  className?: string;
  debounceMs?: number;
  onChange?: ({ key, text }: { key: string; text: string }) => void;
  placeholder?: string;
  searchByFields: {
    key: string;
    label: string;
  }[];
}

const SearchByInput: React.FC<SearchByInputProps> = ({
  className,
  debounceMs,
  onChange,
  placeholder,
  searchByFields,
}) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  const [searchKey, setSearchKey] = useState<string>(
    searchByFields[0]?.key || '',
  );
  const multipleKeys = searchByFields?.length > 1 || false;

  const handleOnChange = useCallback(
    (value: string = searchText) => {
      onChange!({ key: searchKey, text: value });
    },
    [searchText, searchKey],
  );

  const debouncedOnChange = useMemo(
    () =>
      debounce((val: string) => {
        handleOnChange(val);
      }, debounceMs),
    [onChange, debounceMs],
  );

  useEffect(() => {
    handleOnChange();
  }, [searchKey]);

  // Cancel the debounced call if unmounted
  useEffect(
    () => () => {
      debouncedOnChange.cancel();
    },
    [debouncedOnChange],
  );

  return (
    <StSearchInputContainer className={className} data-testid="search-by-input">
      {multipleKeys && (
        <StSelect
          options={searchByFields.map(({ key, label }) => ({
            label: t(label),
            value: key,
          }))}
          placeholder={t('searchBy')}
          value={searchKey}
          onChange={setSearchKey}
        />
      )}
      <StInput
        data-testid="search-by-input-input"
        placeholder={
          !multipleKeys
            ? placeholder
            : t(
                searchByFields.find(({ key }) => key === searchKey)?.label ||
                  '',
              )
        }
        type="text"
        value={searchText}
        onChange={({ target: { value } }) => {
          setSearchText(value);
          debouncedOnChange(value);
        }}
      />
      <StSearchIcon icon="search" />
    </StSearchInputContainer>
  );
};

SearchByInput.defaultProps = {
  className: '',
  debounceMs: 0,
  onChange: () => null,
  placeholder: '',
};

export default SearchByInput;

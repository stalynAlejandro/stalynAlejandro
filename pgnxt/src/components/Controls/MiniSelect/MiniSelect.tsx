import React from 'react';

import { Option } from '../Select/Select';
import { StSelect, StSelectContainer } from './MiniSelectStyled';

interface MiniSelectProps {
  className?: string;
  isSearchable?: boolean;
  key?: string;
  onChange?: (val: any) => void;
  options: Option[];
  placeholder?: string;
  value: any;
}
const MiniSelect: React.FC<MiniSelectProps> = ({
  className,
  isSearchable,
  key,
  onChange,
  options,
  placeholder,
  value,
}) => (
  <StSelectContainer key={key} className={className} data-testid="mini-select">
    <StSelect
      className="formMiniSelect"
      isSearchable={isSearchable}
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </StSelectContainer>
);

MiniSelect.defaultProps = {
  className: '',
  isSearchable: false,
  key: '',
  onChange: () => null,
  placeholder: '',
};

export default MiniSelect;

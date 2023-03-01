import React from 'react';

import { Icon } from '../../Icon';
import { Option } from '../Select/Select';
import {
  StSelect,
  StSelectContainer,
  StDropdownIndicatorContainer,
} from './InlineSelectStyled';

interface InlineSelectProps {
  className?: string;
  key?: string;
  onChange: (val: any) => void;
  options: Option[];
  value: any;
}

const DropdownIndicator: React.FC = () => (
  <StDropdownIndicatorContainer>
    <Icon icon="chevron-updown" />
  </StDropdownIndicatorContainer>
);

const InlineSelect: React.FC<InlineSelectProps> = ({
  className,
  key,
  onChange,
  options,
  value,
}) => (
  <StSelectContainer
    key={key}
    className={className}
    data-testid="inline-select"
  >
    <StSelect
      className="formInlineSelect"
      classNamePrefix="formInlineSelect"
      components={{
        DropdownIndicator,
      }}
      options={options}
      value={value}
      onChange={onChange}
    />
  </StSelectContainer>
);

InlineSelect.defaultProps = {
  className: '',
  key: '',
};

export default InlineSelect;

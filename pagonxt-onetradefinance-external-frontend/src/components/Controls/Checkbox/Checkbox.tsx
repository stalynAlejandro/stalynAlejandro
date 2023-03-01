import React from 'react';
import { IntrinsicElementsKeys } from 'styled-components';

import { renderFunctionText } from '../../../utils/renderFunctionText';
import { StCheckboxContainer } from './CheckboxStyled';

interface CheckboxProps {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  label?: string;
  onChange: (checked: boolean) => void;
  wrapper?: IntrinsicElementsKeys;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  className,
  disabled,
  label,
  onChange,
  wrapper,
}) => {
  const commonProps = {
    disabled,
    onChange: ({
      target: { checked: isChecked },
    }: {
      target: { checked: boolean };
    }) => onChange(isChecked),
    type: 'checkbox',
  };

  return (
    <StCheckboxContainer
      as={wrapper}
      className={className}
      data-testid="checkbox"
    >
      {/* Uncontrolled component if checked prop is not provided, controlled otherwise */}
      {(checked === undefined && <input {...commonProps} />) || (
        <input {...commonProps} checked={checked} />
      )}
      <div />
      {label && (
        <span className="checkbox__label">{renderFunctionText(label)}</span>
      )}
    </StCheckboxContainer>
  );
};

Checkbox.defaultProps = {
  checked: undefined,
  className: '',
  disabled: false,
  label: '',
  wrapper: 'label',
};

export default Checkbox;

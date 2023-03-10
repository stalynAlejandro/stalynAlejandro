import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { FloatingPlaceholder } from '../FloatingPlaceholder';
import { FormField } from '../types/FormField';
import {
  StTextarea,
  StTextareaContainer,
  StContainer,
  StCharactersLeft,
  StClearValueIcon,
} from './TextareaStyled';

interface TextareaProps extends FormField {
  autoHeight?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

const Textarea: React.FC<TextareaProps> = ({
  autoHeight,
  className = '',
  disabled = false,
  error = false,
  maxLength,
  onChange,
  optional,
  placeholder,
  value,
  ...rest
}) => {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoHeight && textareaRef?.current) {
      textareaRef.current.style.height = '0px';

      if (
        value &&
        textareaRef.current.offsetHeight < textareaRef.current.scrollHeight
      ) {
        textareaRef.current.style.height = `${
          textareaRef.current.scrollHeight + 10
        }px`;
      }
    }
  }, [value]);

  return (
    <StContainer
      className={cx(className, 'form-field form-field--wide')}
      data-testid="textarea-container"
    >
      <StTextareaContainer
        disabled={!!disabled}
        hasError={!!error}
        hasPlaceholder={!!placeholder}
        hasValue={!!value}
      >
        <StTextarea
          ref={textareaRef}
          data-testid="textarea-control"
          disabled={!!disabled}
          maxLength={maxLength}
          value={value}
          onChange={({ target: { value: val } }) => onChange(val)}
          {...rest}
        />
        <FloatingPlaceholder
          className="textarea-placeholder"
          isFloating={!!value}
        >
          {placeholder}
          {optional && ` ${t('fieldOptional')}`}
        </FloatingPlaceholder>
        {!!value && (
          <StClearValueIcon
            icon="clear"
            size={16}
            onClick={() => {
              onChange('');
            }}
          />
        )}
      </StTextareaContainer>
      {maxLength && (
        <StCharactersLeft>
          {t('nCharactersLeft', { left: maxLength - (value?.length || 0) })}
        </StCharactersLeft>
      )}
    </StContainer>
  );
};

Textarea.defaultProps = {
  autoHeight: true,
  maxLength: undefined,
  placeholder: '',
};

export default Textarea;

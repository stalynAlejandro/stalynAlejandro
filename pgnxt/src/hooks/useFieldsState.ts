import { useCallback, useEffect, useState } from 'react';
import { AnySchema } from 'yup';

import { validateFieldsSchema } from '../utils/validateFieldsSchema';

interface FieldStateOptions {
  autovalidate: boolean;
}

export const useFieldsState = <FieldsType>(
  fieldsSchema: AnySchema,
  initialData: any,
  options: Partial<FieldStateOptions> = {},
) => {
  type FieldsKeysType = keyof FieldsType;
  const defaultOptions: FieldStateOptions = {
    autovalidate: false,
  };
  const opts = { ...defaultOptions, ...options };

  const [fieldsState, setFieldsState] =
    useState<Partial<FieldsType>>(initialData);

  type ErrorsType = {
    [key in FieldsKeysType]: any;
  };

  const [errors, setErrors] = useState<ErrorsType>({} as ErrorsType);
  const [feedbackErrors, setFeedbackErrors] = useState<ErrorsType>(
    {} as ErrorsType,
  );
  const errorsExist = Object.keys(errors).length > 0;

  const setFieldValue = useCallback(
    (key: FieldsKeysType, value: any) => {
      setFieldsState((current) => ({ ...current, [key]: value }));
    },
    [setFieldsState, fieldsSchema],
  );

  const resetFieldsState = useCallback(() => {
    setFieldsState(initialData);
  }, [setFieldsState, initialData]);

  const validateFields = (updateFeedbackErrors = true) => {
    const validationState = validateFieldsSchema(fieldsSchema, fieldsState);
    setErrors(validationState.errors as ErrorsType);

    if (updateFeedbackErrors) {
      setFeedbackErrors(validationState.errors as ErrorsType);
    }

    return !Object.keys(validationState.errors).length;
  };

  useEffect(() => {
    validateFields(false);
  }, [fieldsState]);

  useEffect(() => {
    if (opts.autovalidate) {
      setFeedbackErrors(errors);
    }
  }, [errors]);

  // Make sure to load initial data when it renders
  useEffect(() => {
    setFieldsState(initialData);
  }, []);

  return {
    errors,
    errorsExist,
    feedbackErrors,
    fieldsState,
    resetFieldsState,
    setFieldValue,
    validateFields,
  };
};

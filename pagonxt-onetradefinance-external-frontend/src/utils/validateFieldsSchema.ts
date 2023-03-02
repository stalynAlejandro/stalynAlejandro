import { AnySchema, ValidationError } from 'yup';

import { getErrorsPaths } from './getErrorsPaths';

interface ValidationProps {
  errors: { [key: string]: boolean };
  validated: any;
}

export const validateFieldsSchema = (
  fieldsSchema: AnySchema,
  data: any,
): ValidationProps => {
  const result: ValidationProps = {
    errors: {},
    validated: {},
  };

  try {
    result.validated = fieldsSchema.validateSync(data, {
      abortEarly: false,
    });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      result.errors = getErrorsPaths(err);
    } else {
      throw err;
    }
  }

  return result;
};

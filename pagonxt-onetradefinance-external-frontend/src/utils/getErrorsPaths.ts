import { ValidationError } from 'yup';

export const getErrorsPaths = (validationError: ValidationError) => {
  const newErrors: { [key: string]: boolean } = {};

  validationError.inner.forEach(({ path }) => {
    if (path) {
      newErrors[path] = true;
    }
  });

  return newErrors;
};

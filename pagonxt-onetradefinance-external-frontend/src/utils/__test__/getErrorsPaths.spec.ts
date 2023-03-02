import { getErrorsPaths } from '../getErrorsPaths';

const validationError = {
  inner: [
    {
      errors: ['clientAccount is a required field'],
      inner: [],
      message: 'clientAccount is a required field',
      name: 'ValidationError',
      params: {
        path: 'clientAccount',
      },
      path: 'clientAccount',
      type: 'required',
    },
    {
      errors: ['collectionAmount is a required field'],
      inner: [],
      message: 'collectionAmount is a required field',
      name: 'ValidationError',
      params: {
        originalValue: '',
        path: 'collectionAmount',
        value: '',
      },
      path: 'collectionAmount',
      type: 'required',
      value: '',
    },
    {
      errors: ['collectionCurrency is a required field'],
      inner: [],
      message: 'collectionCurrency is a required field',
      name: 'ValidationError',
      params: {
        path: 'collectionCurrency',
      },
      path: 'collectionCurrency',
      type: 'required',
    },
    {
      errors: ['collectionType is a required field'],
      inner: [],
      message: 'collectionType is a required field',
      name: 'ValidationError',
      params: {
        path: 'collectionType',
      },
      path: 'collectionType',
      type: 'required',
    },
    {
      errors: ['commissionAccount is a required field'],
      inner: [],
      message: 'commissionAccount is a required field',
      name: 'ValidationError',
      params: {
        path: 'commissionAccount',
      },
      path: 'commissionAccount',
      type: 'required',
    },
  ],
};

describe('Util getErrorsPaths', () => {
  it('returns an object with the errors paths as keys with value as true', () => {
    const errors = getErrorsPaths(validationError as any);
    validationError.inner.forEach((err) => {
      expect(errors[err.path]).toBeTruthy();
    });
  });
});

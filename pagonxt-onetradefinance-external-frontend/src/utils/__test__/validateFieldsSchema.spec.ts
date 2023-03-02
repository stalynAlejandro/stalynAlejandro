import { array, number, object, string } from 'yup';

import { validateFieldsSchema } from '../validateFieldsSchema';

describe('Util validateFieldsSchema', () => {
  const fieldsSchema = object({
    arOpt: array().of(object()),
    numReq: number().required(),
    objOpt: object(),
    strOpt: string().ensure(),
    strReq: string().ensure().required(),
  });

  it('returns validated prop with validated fields and errors as empty if schema validates successfully', () => {
    const fieldsData = {
      numReq: 123,
      objOpt: { p: 'a' },
      strReq: 'my string',
    };
    const res = validateFieldsSchema(fieldsSchema, fieldsData);

    expect(Object.keys(res.validated).length).toBeTruthy();
    expect(Object.keys(res.errors).length).toBe(0);

    expect(res.validated.numReq).toEqual(fieldsData.numReq);
    expect(res.validated.objOpt).toEqual(fieldsData.objOpt);
    expect(res.validated.strReq).toEqual(fieldsData.strReq);
    expect(res.validated.strOpt).toEqual(''); // schema has ensure() in it, transforms null to empty
    expect(res.validated.arOpt).toBeUndefined();
  });

  it('returns validated prop empty if schema does not validates successfully', () => {
    const fieldsData = {
      numReq: 123,
      objOpt: { p: 'a' },
    };

    const res = validateFieldsSchema(fieldsSchema, fieldsData);
    expect(Object.keys(res.validated).length).toBe(0);
  });

  it('returns errors prop with all incorrect props when validation fails', () => {
    const fieldsData = {
      numReq: 123,
      objOpt: { p: 'a' },
      strOpt: ['1', '2'],
    };

    const res = validateFieldsSchema(fieldsSchema, fieldsData);
    expect(res.errors.strReq).toBeTruthy(); // it is required, it has an error because it's not fulfilled
    expect(res.errors.strOpt).toBeTruthy(); // it's type is not correct
    expect(res.errors.numReq).toBeFalsy(); // it does not have any errors, should not appear
  });

  it('throws an error if any unexpected error happens', () => {
    jest.spyOn(fieldsSchema, 'validateSync').mockImplementation(() => {
      throw Error('my error');
    });
    expect(() => validateFieldsSchema(fieldsSchema, {})).toThrow('my error');
  });
});

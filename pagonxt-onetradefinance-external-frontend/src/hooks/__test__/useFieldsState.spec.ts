import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { array, InferType, number, object, string } from 'yup';

import { useFieldsState } from '../useFieldsState';

describe('Hook useFieldsState', () => {
  const fieldsSchema = object({
    arOpt: array().of(object()),
    numReq: number().required(),
    objOpt: object(),
    strOpt: string().ensure(),
    strReq: string().ensure().required(),
  });

  it('sets fields state as provided initial data', () => {
    const initialData = {
      numReq: 123,
      strOpt: 'str',
    };
    const { result } = renderHook(() =>
      useFieldsState<InferType<typeof fieldsSchema>>(fieldsSchema, initialData),
    );

    expect(result.current.fieldsState).toEqual(initialData);
  });

  it('validates fields on load by default', () => {
    const initialData = {
      numReq: 123,
      strOpt: 'str',
    };
    const { result } = renderHook(() =>
      useFieldsState<InferType<typeof fieldsSchema>>(fieldsSchema, initialData),
    );

    expect(result.current.errorsExist).toBeTruthy();
    expect(result.current.errors.strReq).toBeTruthy();
  });

  it('does not update feedbackErrors by default', () => {
    const initialData = {
      numReq: 123,
      strOpt: 'str',
    };
    const { result } = renderHook(() =>
      useFieldsState<InferType<typeof fieldsSchema>>(fieldsSchema, initialData),
    );

    expect(Object.keys(result.current.feedbackErrors).length).toBe(0);
  });

  it('updates feedbackErrors if autovalidate is set to true', () => {
    const initialData = {
      numReq: 123,
      strOpt: 'str',
    };
    const { result } = renderHook(() =>
      useFieldsState<InferType<typeof fieldsSchema>>(
        fieldsSchema,
        initialData,
        { autovalidate: true },
      ),
    );

    expect(Object.keys(result.current.feedbackErrors).length).not.toBe(0);
    expect(result.current.errors.strReq).toBeTruthy();
    expect(result.current.feedbackErrors.strReq).toBeTruthy();
  });

  it('updates field value when executing setFieldValue method', () => {
    const initialData = {
      numReq: 123,
      strOpt: 'str',
    };
    const { result } = renderHook(() =>
      useFieldsState<InferType<typeof fieldsSchema>>(fieldsSchema, initialData),
    );

    act(() => {
      result.current.setFieldValue('arOpt', ['1']);
      result.current.setFieldValue('strOpt', 'another');
    });

    expect(result.current.fieldsState.arOpt).toEqual(['1']);
    expect(result.current.fieldsState.strOpt).toEqual('another');
  });

  it('validates and updates errors whenever fields data change', () => {
    const initialData = {
      numReq: 123,
      strOpt: 'str',
    };
    const { result } = renderHook(() =>
      useFieldsState<InferType<typeof fieldsSchema>>(fieldsSchema, initialData),
    );

    expect(result.current.errors.strReq).toBeTruthy();

    act(() => {
      result.current.setFieldValue('strReq', 'my string');
    });

    expect(result.current.errors.strReq).toBeUndefined();
  });

  it('sets fields data to initial data whenever resetFieldsState is executed', () => {
    const initialData = {
      numReq: 123,
      strOpt: 'str',
    };
    const { result } = renderHook(() =>
      useFieldsState<InferType<typeof fieldsSchema>>(fieldsSchema, initialData),
    );

    act(() => {
      result.current.setFieldValue('strReq', 'my string');
      result.current.setFieldValue('numReq', 456);
    });

    act(() => {
      result.current.resetFieldsState();
    });

    expect(result.current.fieldsState.strReq).toBeUndefined();
    expect(result.current.fieldsState.numReq).toBe(123);
  });

  it('validates the fields when validateFields method is executed', () => {
    const initialData = {
      numReq: 123,
      strOpt: 'str',
    };
    const { result } = renderHook(() =>
      useFieldsState<InferType<typeof fieldsSchema>>(fieldsSchema, initialData),
    );

    act(() => {
      result.current.setFieldValue('numReq', 'ft');
    });

    expect(result.current.feedbackErrors.strReq).toBeUndefined();
    expect(result.current.feedbackErrors.numReq).toBeUndefined();

    act(() => {
      result.current.validateFields();
    });

    expect(result.current.feedbackErrors.strReq).toBeTruthy();
    expect(result.current.feedbackErrors.numReq).toBeTruthy();
  });

  it('does not update feedbackErrors if updateFeedbackErrors is set to false in validateFields', () => {
    const initialData = {
      numReq: 123,
      strOpt: 'str',
    };
    const { result } = renderHook(() =>
      useFieldsState<InferType<typeof fieldsSchema>>(fieldsSchema, initialData),
    );

    act(() => {
      result.current.setFieldValue('strReq', 'my string');
      result.current.setFieldValue('numReq', 'ft');
    });

    expect(result.current.feedbackErrors.strReq).toBeUndefined();
    expect(result.current.feedbackErrors.numReq).toBeUndefined();

    act(() => {
      result.current.validateFields(false);
    });

    expect(result.current.feedbackErrors.strReq).toBeUndefined();
    expect(result.current.feedbackErrors.numReq).toBeUndefined();
  });
});

import { renderHook } from '@testing-library/react';
import reactI18nModule from 'react-i18next';

import { useFormTranslation } from '../useFormTranslation';

jest.mock('../useFormTranslation', () => ({
  ...jest.requireActual('../useFormTranslation'),
}));

describe('Hook useFormTranslation', () => {
  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(reactI18nModule, 'useTranslation').mockImplementation(
      (ns = '') =>
        ({
          t: (keys: any, props: any) => ({ keys, ns, props } as any),
        } as any),
    );
  });

  it('uses the forms namespace', () => {
    const { result }: { result: { current: any } } = renderHook(() =>
      useFormTranslation('formContext'),
    );
    const translation = result.current.t('test');
    expect(translation.ns).toEqual('forms');
  });

  it('adds the specified context and returns all variations from context + key + common:key', () => {
    const { result }: { result: { current: any } } = renderHook(() =>
      useFormTranslation('firstContext.secondContext'),
    );
    const translation = result.current.t('test');
    expect(translation.keys).toEqual([
      'firstContext.secondContext.test',
      'firstContext.test',
      'test',
      'common:test',
    ]);
  });

  it('sends provided props to original translation function', () => {
    const { result }: { result: { current: any } } = renderHook(() =>
      useFormTranslation('firstContext.secondContext'),
    );
    const props = { prop: 'test' };
    const translation = result.current.t('test', props);
    expect(translation.props).toEqual(props);
  });
});

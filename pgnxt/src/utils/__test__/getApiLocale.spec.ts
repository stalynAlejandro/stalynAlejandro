import i18n from '../../i18n';
import { getApiLocale } from '../getApiLocale';

describe('Util getApiLocale', () => {
  const originalLanguage = i18n.language;

  afterAll(() => {
    i18n.language = originalLanguage;
  });

  it('returns es_es if language contains es', () => {
    i18n.language = 'es_US';
    expect(getApiLocale()).toEqual('es_es');
  });

  it('returns the provided language in lowercase if it already has the right format', () => {
    i18n.language = 'en_US';
    expect(getApiLocale()).toEqual('en_us');
  });

  it('replaces hyphen with low bar', () => {
    i18n.language = 'en-US';
    expect(getApiLocale()).toEqual('en_us');
  });

  it('returns en_us if language is en', () => {
    i18n.language = 'en';
    expect(getApiLocale()).toEqual('en_us');
  });

  it('returns es_es if language is not defined', () => {
    i18n.language = '';
    expect(getApiLocale()).toEqual('es_es');
  });
});

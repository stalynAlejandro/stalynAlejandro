import { getFilterFieldsArray } from '../getFilterFieldsArray';
import { apiFilters } from '../../testUtils/mocks/data/requestsApiFilters';

describe('Helper getFilterFieldsArray', () => {
  it('returns only the specified filters', () => {
    const fieldNames = ['code', 'eventId', 'fromAmount'];
    const result = getFilterFieldsArray({
      apiFilters,
      fieldNames,
    });

    expect(result.map((f) => f.key).join()).toEqual(fieldNames.join());
  });

  it('ignores filter names that are not present in apiFilters', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const fieldNames = ['code', 'eventId', 'fromAmount', 'notPresent'];
    const result = getFilterFieldsArray({
      apiFilters,
      fieldNames,
    });

    expect(warn).toHaveBeenCalled();
    expect(result.map((f) => f.key).includes('notPresent')).toBeFalsy();
    warn.mockReset();
  });

  it('uses the provided t parameter to translate strings', () => {
    const mockedT = jest.fn().mockImplementation((str) => `TT_${str}`);
    const fieldNames = ['eventId'];
    const result = getFilterFieldsArray({
      apiFilters,
      fieldNames,
      t: mockedT,
    });

    expect(mockedT).toHaveBeenCalled();
    expect((result as any)[0].options[0].label).toEqual(
      `TT_${apiFilters.eventId.options[0].code.toLowerCase()}`,
    );
  });

  it('adds the relatedField prop as provided', () => {
    const result = getFilterFieldsArray({
      apiFilters,
      fieldNames: ['code', 'fromAmount', 'toAmount'],
      relatedFields: { fromAmount: 'toAmount' },
    });

    const relatedField = result.filter((f) => f.key === 'fromAmount')[0];
    expect(relatedField.relatedField).toEqual('toAmount');
  });

  it('only adds options if they are provided in apiFilters', () => {
    const result = getFilterFieldsArray({
      apiFilters,
      fieldNames: ['code', 'eventId'],
    });

    const optionsField = result.filter((f) => f.key === 'eventId')[0] as any;
    const noOptionsField = result.filter((f) => f.key === 'code')[0] as any;

    expect(optionsField.options).not.toBeUndefined();
    expect(noOptionsField.options).toBeUndefined();
  });

  it('adds i18nPrefix to translated label only in options array of specified fields', () => {
    const result = getFilterFieldsArray({
      apiFilters,
      fieldNames: ['eventId', 'productId'],
      i18nPrefixes: { eventId: 'events' },
    });

    const prefixField = result.filter((f) => f.key === 'eventId')[0] as any;
    const noPrefixField = result.filter((f) => f.key === 'productId')[0] as any;

    expect(prefixField.options[0].label).toEqual(
      `T_events.${apiFilters.eventId.options[0].code.toLowerCase()}`,
    );
    expect(noPrefixField.options[0].label).toEqual(
      `T_${apiFilters.productId.options[0].code.toLowerCase()}`,
    );
  });
});

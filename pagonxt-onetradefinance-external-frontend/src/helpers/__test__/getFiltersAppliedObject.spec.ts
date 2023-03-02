import { apiFilters } from '../../testUtils/mocks/data/requestsApiFilters';
import { getFiltersAppliedObject } from '../getFiltersAppliedObject';

describe('Helper getFiltersAppliedObject', () => {
  it('adds the value property when filter is not a select type', () => {
    const result = getFiltersAppliedObject(apiFilters, {
      code: 'my value',
    });

    expect(result.code.value).toEqual('my value');
    expect(result.code.type).toEqual(apiFilters.code.type);
    expect(result.code.values).toBeUndefined();
  });

  it('adds the values property, in plural, when filter is a select type', () => {
    const value = ['REQUEST', 'MODIFICATION'];
    const result = getFiltersAppliedObject(apiFilters, {
      eventId: value,
    });

    expect(result.eventId.values).not.toBeUndefined();
    expect(result.eventId.values.join()).toEqual(value.join());
    expect(result.eventId.type).toEqual(apiFilters.eventId.type);
    expect(result.eventId.value).toBeUndefined();
  });
});

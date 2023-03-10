import { getOptionId } from '../getOptionId';

describe('Util getOptionId', () => {
  it('returns undefined if option is empty', () => {
    expect(getOptionId('')).toBeUndefined();
  });

  it('returns the provided option if it is not an object', () => {
    expect(getOptionId('test')).toEqual('test');
    expect(getOptionId(50)).toEqual(50);
    expect(getOptionId(true)).toEqual(true);
  });

  it('returns the id property of the option as string', () => {
    expect(getOptionId({ id: 5, name: 'my-name', value: 3 })).toEqual('5');
  });

  it('returns the name property of the action if there is no id', () => {
    expect(getOptionId({ name: 'my-name', value: 3 })).toEqual('my-name');
  });

  it('returns the provided option if no id or name properties are present', () => {
    const opt = { prop: 'prop', value: 'test' };
    expect(getOptionId(opt)).toEqual(opt);
  });
});

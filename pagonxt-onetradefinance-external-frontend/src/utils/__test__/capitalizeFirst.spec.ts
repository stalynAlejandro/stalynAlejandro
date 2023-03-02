import { capitalizeFirst } from '../capitalizeFirst';

describe('Util capitalizeFirst', () => {
  it('capitalizes first letter', () => {
    expect(capitalizeFirst('hello world')).toEqual('Hello world');
  });
});

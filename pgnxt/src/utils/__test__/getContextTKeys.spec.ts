import { getContextTKeys } from '../getContextTKeys';

describe('Util getContextTKeys', () => {
  it('allows to send keys as an array of strings', () => {
    const result = getContextTKeys(
      ['testOne', 'testTwo'],
      'testPrecontext.testContext',
    );

    expect(result).toEqual([
      'testPrecontext.testContext.testOne',
      'testPrecontext.testOne',
      'testOne',
      'common:testOne',
      'testPrecontext.testContext.testTwo',
      'testPrecontext.testTwo',
      'testTwo',
      'common:testTwo',
    ]);
  });

  it('allows to send keys as a string', () => {
    const result = getContextTKeys('testOne', 'testPrecontext.testContext');

    expect(result).toEqual([
      'testPrecontext.testContext.testOne',
      'testPrecontext.testOne',
      'testOne',
      'common:testOne',
    ]);
  });

  it('returns all contexts from more specific to less specific and a final common context', () => {
    const result = getContextTKeys('testOne', 'testPrecontext.testContext');

    expect(result).toEqual([
      'testPrecontext.testContext.testOne',
      'testPrecontext.testOne',
      'testOne',
      'common:testOne',
    ]);
  });

  it('works with single context prefix', () => {
    const result = getContextTKeys('testOne', 'testPrecontext');

    expect(result).toEqual([
      'testPrecontext.testOne',
      'testOne',
      'common:testOne',
    ]);
  });

  it('works with multiple context prefixes', () => {
    const result = getContextTKeys('testOne', 'testPrecontext.testContext');

    expect(result).toEqual([
      'testPrecontext.testContext.testOne',
      'testPrecontext.testOne',
      'testOne',
      'common:testOne',
    ]);
  });
});

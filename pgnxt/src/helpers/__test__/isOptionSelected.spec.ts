import { isOptionSelected } from '../isOptionSelected';

describe('Helper isOptionSelected', () => {
  it('returns true if option value equals provided value', () => {
    const result = isOptionSelected({ value: 'myvalue' }, { id: 'myvalue' });
    expect(result).toBeTruthy();
  });

  it('returns false if option value does not equal provided value', () => {
    const result = isOptionSelected({ value: 'myvalue' }, { id: 'notmyvalue' });
    expect(result).toBeFalsy();
  });

  it('returns true if option valueKey equals value valueKey', () => {
    const result = isOptionSelected(
      { value: { myKey: 'myvalue' } },
      { myKey: 'myvalue' },
      'myKey',
    );
    expect(result).toBeTruthy();
  });

  it('returns false if option valueKey equals value valueKey', () => {
    const result = isOptionSelected(
      { value: { myKey: 'myvalue' } },
      { myKey: 'notmyvalue' },
      'myKey',
    );
    expect(result).toBeFalsy();
  });

  it('returns true if the option is found inside the value elements when it is an array', () => {
    const result = isOptionSelected({ value: 'myvalue' }, [
      { id: 'myvalue' },
      { id: 'notmyvalue' },
    ]);
    expect(result).toBeTruthy();
  });

  it('returns false if the option is not found inside the value elements when it is an array', () => {
    const result = isOptionSelected({ value: 'myvalue' }, [
      { id: 'notmyvalue' },
      { id: 'notmyvalue2' },
    ]);
    expect(result).toBeFalsy();
  });
});

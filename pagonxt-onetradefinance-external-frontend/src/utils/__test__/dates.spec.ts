import { addDaysToDate, formatDate, isValidDate } from '../dates';

describe('Util dates', () => {
  describe('method formatDate', () => {
    const date = new Date('2022-09-30T06:14:02.118Z');

    it('formats the date with the expected format if none is provided', () => {
      expect(formatDate(date)).toEqual('30/09/2022');
    });

    it('formats the date with the provided format', () => {
      expect(formatDate(date, false, 'yyyy-MM-dd')).toEqual('2022-09-30');
    });

    it('formats the date with the time included if specified', () => {
      expect(formatDate(date, true)).toEqual(
        `30/09/2022 ${date.getHours().toString().padStart(2, '0')}:14`,
      );
    });
  });

  describe('method isValidDate', () => {
    it('returns true if parameter is a date', () => {
      expect(isValidDate(new Date())).toBeTruthy();
    });

    it('returns true if parameter is a valid date string', () => {
      expect(isValidDate('2022-09-30T06:14:02.118Z')).toBeTruthy();
    });

    it('returns false if parameter is not provided', () => {
      expect(isValidDate()).toBeFalsy();
    });

    it('returns false if parameter is a non valid string', () => {
      expect(isValidDate('my test')).toBeFalsy();
    });
  });

  describe('method addDaysToDate', () => {
    const defaultFormat = 'yyyy-MM-dd';

    it('returns empty if no date is provided', () => {
      expect(addDaysToDate('' as any)).toEqual('');
    });

    it('allows days to be provided as string or number', () => {
      const date = new Date();
      const addedDate = addDaysToDate(date, 10);

      expect(addDaysToDate(date, '10')).toEqual(addedDate);

      date.setDate(date.getDate() + 10);
      expect(addedDate).toEqual(formatDate(date, false, defaultFormat));
    });

    it('formats date by default', () => {
      const date = new Date();
      const addedDate = new Date(date);
      addedDate.setDate(date.getDate() + 1);

      expect(addDaysToDate(date, 1)).toEqual(
        formatDate(addedDate, false, defaultFormat),
      );
    });

    it('returns a date if no format is specified', () => {
      const date = new Date();
      const addedDate = new Date(date);
      addedDate.setDate(date.getDate() + 1);

      expect(addDaysToDate(date, 1, '')).toEqual(addedDate);
    });

    it('formats the date with the string format provided', () => {
      const date = new Date();
      const addedDate = new Date(date);
      addedDate.setDate(date.getDate() + 1);

      expect(addDaysToDate(date, 1, 'dd/MM/yyyy')).toEqual(
        formatDate(addedDate, false, 'dd/MM/yyyy'),
      );
    });
  });
});

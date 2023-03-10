import format from 'date-fns/format';

export const isValidDate = (date?: any) => {
  if (!date) {
    return false;
  }

  const parsedDate = new Date(date);
  return (
    parsedDate &&
    parsedDate instanceof Date &&
    !Number.isNaN(parsedDate.getTime())
  );
};

export const formatDate = (
  date: Date,
  withTime: boolean = false,
  formatString: string = '',
) => {
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }

  if (formatString) {
    return format(date, formatString);
  }

  if (withTime) {
    return format(date, 'dd/MM/yyyy HH:mm');
  }

  return format(date, 'dd/MM/yyyy');
};

export const addDaysToDate = (
  date: Date,
  days?: string | number,
  dateFormat: string = 'yyyy-MM-dd',
) => {
  if (!date || !days) {
    return '';
  }

  const newDate = new Date(date);
  const parsedDays = Number.parseInt(`${days}`, 10);
  newDate.setDate(date.getDate() + parsedDays);

  // If format is specified, return the formatted date as string
  if (dateFormat) {
    return formatDate(newDate, false, dateFormat);
  }

  // Return the raw date if there is no format specified
  return newDate;
};

export const defaultIfEmpty = (data: any, initialData: any) =>
  data && Object.keys(data).length > 0 ? data : initialData;

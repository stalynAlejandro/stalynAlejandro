import { useCallback, useState } from 'react';

import { fetchServer } from '../utils/fetchServer';

const useSingleFetch = <T>(url: string) => {
  const abortController = new AbortController();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (options?: any): Promise<T | null> => {
      // Return null if we are already fetching to avoid duplicate calls
      if (isLoading) {
        return null;
      }

      let parsedData = null;
      setIsLoading(true);

      try {
        parsedData = await fetchServer<T>(url, {
          signal: abortController.signal,
          ...(options || {}),
        });

        setData(parsedData);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return null;
        }
        throw err;
      } finally {
        setIsLoading(false);
      }

      return parsedData;
    },
    [url, isLoading],
  );

  return {
    data: data as T,
    fetchData,
    isLoading,
  };
};

export default useSingleFetch;

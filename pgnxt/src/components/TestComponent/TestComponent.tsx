import React, { useEffect } from 'react';

import apiUrls from '../../constants/apiUrls';
import useSingleFetch from '../../hooks/useSingleFetch';

export const TestComponent: React.FC = () => {
  const { data, fetchData, isLoading } = useSingleFetch<any>(
    `${apiUrls.clients}?name=c`,
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading}
      {data ? JSON.stringify(data) : 'data not received'}
    </div>
  );
};

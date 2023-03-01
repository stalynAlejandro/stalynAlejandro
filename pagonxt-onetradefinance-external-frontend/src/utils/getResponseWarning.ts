import { ApiResponse } from '../api/types/ApiResponse';

export const getResponseWarning = (response?: ApiResponse<any> | null) => {
  if (response && response.type === 'warning') {
    return response.key;
  }

  return undefined;
};

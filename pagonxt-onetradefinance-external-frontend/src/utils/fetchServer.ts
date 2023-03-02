import { ApiResponse } from '../api/types/ApiResponse';
import { getAccessToken } from './getAccessToken';

interface ErrorResponse {
  originalResponse: any;
  parsedResponse: ApiResponse<null> | string;
  response: any;
  status: number;
  statusText: string;
}

export const fetchServer = async <T>(
  url: string,
  options: any = {},
): Promise<T> => {
  const accessToken = await getAccessToken();
  const { returnRaw, ...fetchOptions } = options;

  const defaultOptions = {
    credentials: 'same-origin',
    method: 'get',
    ...fetchOptions,
    headers: {
      ...(accessToken &&
        process.env.REACT_APP_APIGEE_HOST && {
          Authorization: `Bearer ${accessToken}`,
          'X-Santander-Client-Id': process.env.REACT_APP_SANTANDER_CLIENTID,
        }), // add the msal idToken if it exists
      ...(fetchOptions.headers || {}),
    },
  };

  const rawResponse = await fetch(url, { ...defaultOptions });

  if (returnRaw) {
    return rawResponse as any;
  }

  // Throw an error with all properties parsed and available
  if (!rawResponse.ok) {
    const errorResponse: Partial<ErrorResponse> = {
      originalResponse: rawResponse,
      status: rawResponse.status,
      statusText: rawResponse.statusText,
    };

    const errorText: string = await rawResponse.text();
    let errorObj;

    try {
      errorObj = JSON.parse(errorText);
    } catch (err) {
      errorObj = errorText;
    }

    errorResponse.parsedResponse = errorObj;
    throw errorResponse;
  }

  const textResponse: string = await rawResponse.text();
  let parsedResponse;

  try {
    parsedResponse = JSON.parse(textResponse);
  } catch (err) {
    // JSON.parse error, means received answer is not JSON, is a string
    return textResponse as unknown as T;
  }

  return parsedResponse as T;
};

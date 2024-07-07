export function isNetworkError(error: CustomError): boolean {
  return (
    error.code === 'ERR_NETWORK' || (error.isAxiosError && !error.response)
  );
}

export function isUnauthorizedError(error: CustomError): boolean {
  return error.response?.status === 401;
}

export interface CustomError {
  code?: string;
  message?: string;
  response?: {
    data?: any;
    status?: number;
  };
  isAxiosError?: boolean;
}

export function handleErrorMessage(err: CustomError) {
  console.log('====error====', err);

  if (!err) {
    return {status: 0, message: 'Unknown error occurred'};
  }

  if (err.isAxiosError) {
    const {response} = err;
    if (response) {
      const {data, status} = response;

      switch (status) {
        case 401:
          return {status: 'EXP_TOKEN', message: 'Login session expired'};
        case 502:
          return {
            message:
              'Something is temporarily wrong with your network connection! Please try again later',
          };
        default:
          if (data) {
            if (data.error) {
              return {status, message: data.error};
            }
            if (Array.isArray(data.details) && data.details.length > 0) {
              return {status, message: data.details[0].message};
            }
          }
          return {status, message: err.message || 'An unknown error occurred'};
      }
    }
  }

  return {status: 0, message: err.message || 'Error'};
}

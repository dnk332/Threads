export function handleErrorMessage(err) {
  console.log('====error====', err);

  const {response} = err;

  if (response) {
    const {data, status} = response;
    if (status === 401) {
      return {
        status: 'EXP_TOKEN',
        message: 'Login session expired',
      };
    }
    if (status === 502) {
      return {
        message:
          'Something is temporary wrong with your network connection! Please try again later',
      };
    }
    if (data && data.error) {
      return {
        status,
        message: data.error,
      };
    }
    if (data && Array.isArray(data.details) && data.details[0]) {
      return {
        status,
        message: data.details[0].message,
      };
    }
    return {
      status,
      message: err.message,
    };
  }
  const strMessage = err ? err.message : 'Error';
  return {
    status: 0,
    message: strMessage,
  };
}

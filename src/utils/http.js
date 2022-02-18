const httpRequestData = async (method, url, headers = {}) => {
  const response = await fetch(url, {
    method,
    headers,
  });

  // eslint-disable-next-line no-return-await
  return await response.json();
};

// eslint-disable-next-line import/prefer-default-export
export const getData = (url, headers = {}) =>
  httpRequestData("GET", url, headers);

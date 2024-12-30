export const getUrlApi = () => {
  let url = 'http://localhost:4200/api';
  const mode = process.env.mode;
  if (!mode) return url;

  if (mode === 'development') {
    return process.env.API_URL_DEV || url;
  }
  if (mode === 'production') {
    return process.env.API_URL_PROD || url;
  }

  return url;
};

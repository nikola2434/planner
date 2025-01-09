export const isBoolean = (input: unknown): input is boolean => {
  return typeof input === 'boolean';
};

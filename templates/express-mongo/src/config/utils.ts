export const isNullOrUndefined = (
  value: unknown
): value is null | undefined => {
  return value === null || value === undefined;
};

export const notNullOrUndefined = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

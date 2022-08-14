export const removeUndefinedFields = <T>(obj: Partial<T>): Partial<T> => {
  const copy = { ...obj };
  const keys = Object.keys(copy) as [keyof T];

  keys.forEach((key) => (copy[key] === undefined
    ? delete copy[key]
    : {})
  );

  return copy;
};

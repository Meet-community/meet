export const getUrl = (...args: string[]): string => {
  return `/${args.join('/')}`;
};

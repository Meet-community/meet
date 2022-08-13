export const getDate = (offset = 0) => {
  const date = new Date();

  date.setDate(date.getDate() + offset);

  return date;
};

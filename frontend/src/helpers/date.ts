export const HOUR = 1000 * 60 * 60;

export const isToday = (date: Date): boolean => {
  const today = new Date();
  const isSameYear = today.getFullYear() === date.getFullYear();
  const isSameMonth = today.getMonth() === date.getMonth();
  const isSameDate = today.getDate() === date.getDate();

  return isSameYear && isSameMonth && isSameDate;
};

export const HOUR = 1000 * 60 * 60;

export const isToday = (date: Date): boolean => {
  const today = new Date();
  const isSameYear = today.getFullYear() === date.getFullYear();
  const isSameMonth = today.getMonth() === date.getMonth();
  const isSameDate = today.getDate() === date.getDate();

  return isSameYear && isSameMonth && isSameDate;
};

export const getNearCoolTime = (date: Date = new Date()): Date => {
  const result = new Date(date);

  result.setHours(date.getHours() + 1);

  result.setMinutes(0);
  result.setSeconds(0);
  result.setMilliseconds(0);

  return result;
};

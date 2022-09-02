import { MONTH_MAP } from './constants';

export interface Time {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function add0(num: number) {
  return num < 10 ? `0${num}` : num;
}

export const formatDate = (
  value: string | number,
  formatType?: string,
) => {
  const date = new Date(value);

  if (formatType === 'hours') {
    return `${
      add0(date.getHours())
    }:${
      add0(date.getMinutes())
    }`;
  }

  return `${
    add0(date.getDate())
  } ${
    MONTH_MAP[date.getMonth()]
  } ${
    add0(date.getHours())
  }:${
    add0(date.getMinutes())
  }`;
};

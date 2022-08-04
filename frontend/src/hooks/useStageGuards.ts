import getConfig from 'next/config';
import { useLocalStorage } from './useLocaleStorage';

export const useStageGuards = () => {
  const { publicRuntimeConfig } = getConfig();
  const stage = publicRuntimeConfig.STAGE;

  const [
    loginDedDate, setLoginDedDate,
  ] = useLocalStorage<number>('devLoginDedDate', Date.now());

  if (typeof prompt === 'undefined') {
    return;
  }

  if (stage === 'development') {
    const now = Date.now();

    if (loginDedDate > now) {
      return;
    }

    while (true) {
      const password = prompt('If you don\'t know the password then you are lost. Try to remove dev from url (links) \n \n Password:');

      if (password !== '200926') {
        continue;
      }

      const day = 1000 * 60 * 60 * 24;

      setLoginDedDate(day * 3 + now);

      break;
    }
  }
};

import { useCallback, useEffect } from 'react';

export const useSaveShortcut = (callback: () => any) => {
  const pressHandler = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && String.fromCharCode(e.keyCode).toLowerCase() === 's') {
      e.preventDefault();
      e.stopPropagation();

      callback();

      return;
    }

    if (e.metaKey && String.fromCharCode(e.keyCode).toLowerCase() === 's') {
      e.preventDefault();
      e.stopPropagation();

      callback();
    }
  }, [callback]);

  useEffect(() => {
    document?.addEventListener('keydown', pressHandler, false);

    return () => document?.removeEventListener('keydown', pressHandler);
  }, [callback, pressHandler]);
};

import { useCallback, useState } from 'react';

type HookOutput = [
  () => void,
  number
]

export const useSecondsTimer = (seconds: number, onComplete?: () => void): HookOutput => {
  const [leftSeconds, setLeftSeconds] = useState(seconds);

  const next = useCallback(() => {
    setTimeout(
      () => (setLeftSeconds((prev) => {
        if (prev === 1) {
          if (onComplete) {
            onComplete();
          }

          return 0;
        }

        next();

        return prev - 1;
      })),
      1000,
    );
  }, [onComplete]);

  const run = useCallback(() => {
    next();
  }, [next]);

  return [run, leftSeconds];
};

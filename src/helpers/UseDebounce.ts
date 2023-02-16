import {useEffect, useCallback} from 'react';

export default function useDebounce(
  effect: () => void,
  dependencies: any,
  delay: number,
) {
  const callback: () => void = useCallback<() => void>(effect, [
    ...dependencies,
    effect,
  ]);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

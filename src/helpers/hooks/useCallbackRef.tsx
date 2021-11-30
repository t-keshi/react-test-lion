/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useRef, useCallback } from 'react';

export const useCallbackRef = <T extends (...args: any[]) => any>(
  fn: T | undefined,
  deps: React.DependencyList = [],
): T => {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-return
  return useCallback(((...args) => ref.current?.(...args)) as T, deps);
};

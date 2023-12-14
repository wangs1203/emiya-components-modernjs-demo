import { useCallback, useLayoutEffect, useRef, MutableRefObject } from 'react';

type Noop = (...arg: any[]) => any;

/**
 * @description reactv18 useEvent
 * @see [详见](https://github.com/react/rfcs/blob/useevent/text/0000-use-event.md)
 * @param {noop} fn
 * @returns {noop}
 */
const useEvent = <T extends Noop>(fn: T) => {
  const handleRef = useRef<T>(null) as MutableRefObject<T>;
  useLayoutEffect(() => {
    handleRef.current = fn;
  });
  return useCallback((...args: any[]) => {
    const fn = handleRef.current;
    return fn?.(...args);
  }, []);
};

export default useEvent;

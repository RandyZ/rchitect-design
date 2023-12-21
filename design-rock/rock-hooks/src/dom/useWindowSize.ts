import { type AnyFunction } from '@rchitect-design/types';
import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@rchitect-rock/tools'

interface UseWindowSizeOptions {
  wait?: number;
  once?: boolean;
  immediate?: boolean;
  listenerOptions?: AddEventListenerOptions | boolean;
}

function useWindowSizeFn(fn: AnyFunction, options: UseWindowSizeOptions = {}) {
  const { wait = 150, immediate } = options;
  let handler = () => {
    fn();
  };
  const handleSize = useDebounceFn(handler, wait);
  handler = handleSize;

  const start = () => {
    if (immediate) {
      handler();
    }
    window.addEventListener('resize', handler);
  };

  const stop = () => {
    window.removeEventListener('resize', handler);
  };

  tryOnMounted(() => {
    start();
  });

  tryOnUnmounted(() => {
    stop();
  });
  return { start, stop };
}

export { useWindowSizeFn, type UseWindowSizeOptions };

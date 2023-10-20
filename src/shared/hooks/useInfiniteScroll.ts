import { useEffect } from 'react';

import type { MutableRefObject } from 'react';

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef?: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef
}: UseInfiniteScrollOptions): void {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const wrapperElement = wrapperRef?.current ?? null;
    const triggerElement = triggerRef.current;
    if (callback !== undefined) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      observer.observe(triggerElement);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (observer !== null) observer.unobserve(triggerElement);
    };
  }, [callback, triggerRef, wrapperRef]);
}

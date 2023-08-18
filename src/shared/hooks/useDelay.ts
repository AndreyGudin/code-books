import { useEffect, useRef } from 'react';

interface UseDelayProps {
  handler: () => void;
}

interface UseDelayType {
  delayedHandler: () => void;
}

export const useDelay = ({ handler }: UseDelayProps): UseDelayType => {
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const delayedHandler = (): void => {
    timeRef.current = setTimeout(() => {
      handler();
    }, 0);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  });

  return { delayedHandler };
};

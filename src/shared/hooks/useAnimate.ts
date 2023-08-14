import { useState, useRef, useCallback, useEffect } from 'react';

interface UseAnimate {
  isAuthModal: boolean;
  animate: boolean;
  toggle: () => void;
  close: () => void;
}

export const useAnimate = (): UseAnimate => {
  const [isAuthModal, setAuthModal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const toggle = useCallback(() => {
    setAuthModal((prev) => !prev);
    timeRef.current = setTimeout(() => {
      setAnimate((prev) => !prev);
    }, 0);
  }, []);

  const close = useCallback(() => {
    setAnimate((prev) => !prev);
    timeRef.current = setTimeout(() => {
      setAuthModal((prev) => !prev);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

  return {
    isAuthModal,
    animate,
    toggle,
    close
  };
};

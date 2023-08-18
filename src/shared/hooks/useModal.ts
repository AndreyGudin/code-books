import { useCallback, useEffect, useRef, useState } from 'react';

interface useModalProps {
  onClose?: () => void;
  isOpen: boolean;
}

interface UseModal {
  close: () => void;
  animate: boolean;
}

export const useModal = ({ isOpen, onClose }: useModalProps): UseModal => {
  const [animate, setAnimate] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) {
      timeRef.current = setTimeout(() => {
        setAnimate(true);
      }, 0);
    }
  }, [isOpen]);

  const close = useCallback(() => {
    setAnimate(false);
    timeRef.current = setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return {
    close,
    animate
  };
};

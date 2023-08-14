import { useCallback, useEffect } from 'react';

interface useModalProps {
  onClose?: () => void;
  isOpen: boolean;
}

interface UseModal {
  close: () => void;
}

export const useModal = ({ isOpen, onClose }: useModalProps): UseModal => {
  const close = useCallback(() => {
    if (onClose !== null) onClose?.();
  }, [onClose]);

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
    close
  };
};

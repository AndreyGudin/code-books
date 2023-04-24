import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  className = '',
  isOpen = false,
  onClose,
  children
}: ModalProps) => {
  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen
  };
  const closeHandler = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeHandler();
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return (
    <div className={classNames(cls.Modal, mods, [className])}>
      <div className={cls.overlay} onClick={closeHandler}>
        <div className={cls.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>
  );
};

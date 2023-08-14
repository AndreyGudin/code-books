import type { FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from 'shared/hooks/useModal';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  animate?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  className = '',
  animate = false,
  isOpen = false,
  onClose,
  children
}: ModalProps) => {
  const { close } = useModal({ isOpen, onClose });
  const mods: Record<string, boolean> = {
    [cls.opened]: animate
  };

  const onContentClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </Overlay>
      </div>
    </Portal>
  );
};

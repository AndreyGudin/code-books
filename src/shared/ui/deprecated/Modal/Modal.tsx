import type { FC, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/hooks/useModal';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Modal: FC<ModalProps> = ({
  className = '',
  isOpen = false,
  onClose,
  children
}: ModalProps) => {
  const { close, animate } = useModal({ isOpen, onClose });
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

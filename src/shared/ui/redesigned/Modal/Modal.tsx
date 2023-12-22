import type { FC, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/hooks/useModal';
import { toggleFeatures } from '@/shared/lib/features';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  staticSize?: boolean;
}

export const Modal: FC<ModalProps> = ({
  className = '',
  isOpen = false,
  staticSize = false,
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
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={classNames(cls.Modal, mods, [
          className,
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.modalNew,
            off: () => cls.modalOld
          })
        ])}
      >
        <Overlay onClick={close}>
          <div
            className={classNames(
              cls.content,
              { [cls.staticSize]: staticSize },
              []
            )}
            onClick={onContentClick}
          >
            {children}
          </div>
        </Overlay>
      </div>
    </Portal>
  );
};

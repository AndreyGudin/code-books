import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { type Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer: FC<DrawerProps> = memo(
  ({
    className = '',
    children,
    onClose = () => {},
    isOpen = false
  }: DrawerProps) => {
    const mods: Mods = {
      [cls.opened]: isOpen
    };
    return (
      <Portal>
        <div
          className={classNames(cls.Drawer, mods, [className, 'app_drawer'])}
        >
          <Overlay onClick={onClose}>
            <div className={cls.content}>{children}</div>
          </Overlay>
        </div>
      </Portal>
    );
  }
);

import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Overlay: FC<OverlayProps> = memo(
  ({ className = '', children, onClick = () => {} }: OverlayProps) => {
    return (
      <div
        onClick={onClick}
        className={classNames(cls.Overlay, {}, [className])}
      >
        {children}
      </div>
    );
  }
);

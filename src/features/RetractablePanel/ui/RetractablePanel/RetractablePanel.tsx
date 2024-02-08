import { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RetractablePanel.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface RetractablePanelProps {
  className?: string;
  position?: 'right' | 'left';
  fullHeight?: boolean;
  children: ReactNode;
}

export const RetractablePanel: FC<RetractablePanelProps> = memo(
  ({
    className = '',
    position = 'right',
    fullHeight = true,
    children
  }: RetractablePanelProps) => {
    const [collapsed, setCollapsed] = useState(true);

    const onToggle = (): void => {
      setCollapsed((prev) => !prev);
    };

    const mods = {
      [cls.retracted]: collapsed,
      [cls.fullHeight]: fullHeight
    };

    return (
      <aside
        className={classNames(cls.RetractablePanel, mods, [
          className,
          cls[position]
        ])}
      >
        {children}
        <Icon
          className={cls.btnToRetract}
          data-testid="sidebar-toggle"
          onClick={onToggle}
          Svg={ArrowIcon}
          clickable
        />
      </aside>
    );
  }
);

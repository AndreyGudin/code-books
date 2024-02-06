import { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RetractablePanel.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface RetractablePanelProps {
  className?: string;
  position?: 'right' | 'left';
  children: ReactNode;
}

export const RetractablePanel: FC<RetractablePanelProps> = memo(
  ({ className = '', position = 'right', children }: RetractablePanelProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = (): void => {
      setCollapsed((prev) => !prev);
    };

    return (
      <aside
        className={classNames(
          cls.RetractablePanel,
          { [cls.retracted]: collapsed },
          [className, cls[position]]
        )}
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

import { memo } from 'react';
import type { FC, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar?: ReactElement;
  toolbar?: ReactElement;
  collapsedSidebar?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = memo(
  ({
    className = '',
    content,
    header,
    sidebar,
    toolbar,
    collapsedSidebar = false
  }: MainLayoutProps) => {
    return (
      <div className={classNames(cls.MainLayout, {}, [className])}>
        {sidebar ? (
          <div
            className={classNames(
              cls.sidebar,
              { [cls.collapsedSidebar]: collapsedSidebar },
              []
            )}
          >
            {sidebar}
          </div>
        ) : null}

        <div className={cls.content}>{content}</div>
        <div className={cls.rightbar}>
          <div className={cls.header}>{header}</div>
          <div className={cls.toolbar}>{toolbar}</div>
        </div>
      </div>
    );
  }
);

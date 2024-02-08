import { memo } from 'react';
import type { FC, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';
import { useDevice } from '@/shared/hooks/useDevice';

interface MainLayoutProps {
  className?: string;
  header?: ReactElement;
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
    const isMobile = useDevice();

    const sidebarContent = sidebar ? (
      <div
        className={classNames(
          cls.sidebar,
          { [cls.collapsedSidebar]: collapsedSidebar },
          []
        )}
      >
        {sidebar}
      </div>
    ) : null;

    const toolbarContent = toolbar ? (
      <div className={cls.toolbar}>{toolbar}</div>
    ) : null;

    const headerContent = header ? (
      <div className={cls.header}>{header}</div>
    ) : null;

    return (
      <div
        className={classNames(
          cls.MainLayout,
          { [cls.mobileMainLayout]: isMobile },
          [className]
        )}
      >
        {sidebarContent}

        <div className={cls.content}>{content}</div>
        {headerContent ?? toolbarContent ? (
          <div className={cls.rightbar}>
            {headerContent}
            {toolbarContent}
          </div>
        ) : null}
      </div>
    );
  }
);

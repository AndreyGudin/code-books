import { memo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import type { FC, MutableRefObject, ReactNode, UIEvent } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import type { StateSchema } from 'app/providers/StoreProvider';

import cls from './Page.module.scss';
import {
  getSaveScrollPositionByPath,
  scrollSaveActions
} from 'features/ScrollSave';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/hooks/useInitialEffect';
import { useThrottle } from 'shared/hooks/useThrottle';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo(
  ({ className = '', children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
      getSaveScrollPositionByPath(state, pathname)
    );

    useInfiniteScroll({
      triggerRef,
      wrapperRef,
      callback: onScrollEnd
    });

    useInitialEffect(() => {
      wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>): void => {
      dispatch(
        scrollSaveActions.setScrollPosition({
          position: e.currentTarget.scrollTop,
          path: pathname
        })
      );
    }, 500);

    return (
      <section
        ref={wrapperRef}
        className={classNames(cls.Page, {}, [className])}
        onScroll={(e) => onScroll(e)}
      >
        {children}
        {onScrollEnd !== undefined ? (
          <div className={cls.trigger} ref={triggerRef}></div>
        ) : null}
      </section>
    );
  }
);

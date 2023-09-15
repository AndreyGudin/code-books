import { memo, useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { FC, MutableRefObject, ReactNode, UIEvent } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import type { StateSchema } from '@/app/providers/StoreProvider';

import cls from './Page.module.scss';
import {
  getSaveScrollPositionByPath,
  scrollSaveActions
} from '@/features/ScrollSave';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { useThrottle } from '@/shared/hooks/useThrottle';
import { Button } from '@/shared/ui/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';
import { useTranslation } from 'react-i18next';
import { TestProps } from '@/shared/types/tests';

interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
  onLoadMore?: () => void;
  enableButton?: boolean;
}

export const Page: FC<PageProps> = memo((props: PageProps) => {
  const {
    className = '',
    enableButton = false,
    children,
    onScrollEnd,
    onLoadMore
  } = props;
  const { t } = useTranslation();
  const [clientHeight, setClientHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) =>
    getSaveScrollPositionByPath(state, pathname)
  );

  const isScrolling = clientHeight >= scrollHeight;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
    setClientHeight(wrapperRef.current.clientHeight);
    setScrollHeight(wrapperRef.current.scrollHeight);
  });

  const onClickMore = useCallback(() => {
    onLoadMore?.();
  }, [onLoadMore]);

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>): void => {
    dispatch(
      scrollSaveActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname
      })
    );
  }, 500);

  return (
    <main
      data-testid={props['data-testid'] ?? 'Page'}
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      onScroll={(e) => onScroll(e)}
    >
      {children}
      {onScrollEnd !== undefined ? (
        <div className={cls.trigger} ref={triggerRef}></div>
      ) : null}
      {isScrolling && enableButton !== undefined && enableButton ? (
        <Button onClick={onClickMore} theme={ButtonTheme.OUTLINE}>
          {t('Загрузить ещё')}
        </Button>
      ) : null}
    </main>
  );
});

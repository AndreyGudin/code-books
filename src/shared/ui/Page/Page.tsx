import { memo, useRef } from 'react';
import type { FC, MutableRefObject, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo(
  ({ className = '', children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
      triggerRef,
      wrapperRef,
      callback: onScrollEnd
    });

    return (
      <section
        ref={wrapperRef}
        className={classNames(cls.Page, {}, [className])}
      >
        {children}
        <div ref={triggerRef}></div>
      </section>
    );
  }
);

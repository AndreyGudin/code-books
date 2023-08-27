import { memo } from 'react';
import type { FC } from 'react';

import { ArticleView } from '../../model/consts/const';
import { Card } from '@/shared/ui/Card';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleListItemSkeletonProps {
  className?: string;
  view?: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = memo(
  ({
    className = '',
    view = ArticleView.GRID
  }: ArticleListItemSkeletonProps) => {
    if (view === ArticleView.LIST) {
      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view]
          ])}
        >
          <Card className={cls.card}>
            <div className={cls.header}>
              <Skeleton border={'50%'} width={30} height={30} />
              <Skeleton width={150} height={16} className={cls.username} />
              <Skeleton width={150} height={16} className={cls.date} />
            </div>
            <Skeleton width={250} height={24} className={cls.title} />
            <Skeleton height={200} className={cls.img} />

            <div className={cls.footer}>
              <Skeleton height={36} width={200} className={cls.img} />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <Skeleton width={200} height={200} className={cls.img} />
          </div>
          <div className={cls.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} />
        </Card>
      </div>
    );
  }
);

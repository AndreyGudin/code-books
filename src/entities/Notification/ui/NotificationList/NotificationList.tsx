import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationList.module.scss';
import { useNotifications } from '../../api/notification';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton as DeprecatedSkeleton } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as RedesignedSkeleton } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationListProps {
  className?: string;
}

export const NotificationList: FC<NotificationListProps> = memo(
  ({ className = '' }: NotificationListProps) => {
    const { data, isLoading } = useNotifications(null, {
      pollingInterval: 5000
    });

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => RedesignedSkeleton,
      off: () => DeprecatedSkeleton
    });

    if (isLoading) {
      return (
        <VStack
          gap="16"
          className={classNames(cls.NotificationList, {}, [className])}
        >
          <Skeleton width={'100%'} border={'8px'} height={'80px'} />
          <Skeleton width={'100%'} border={'8px'} height={'80px'} />
          <Skeleton width={'100%'} border={'8px'} height={'80px'} />
        </VStack>
      );
    }

    return (
      <VStack
        gap="16"
        className={classNames(cls.NotificationList, {}, [className])}
      >
        {data?.map((item) => {
          return <NotificationItem key={item.id} item={item} />;
        })}
      </VStack>
    );
  }
);

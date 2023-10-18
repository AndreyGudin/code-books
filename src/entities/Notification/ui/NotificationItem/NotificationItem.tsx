import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import type { Notification } from '../../model/types/notification';
import { Card as DeprecatedCard } from '@/shared/ui/deprecated/Card';
import { CardTheme as DeprecatedCardTheme } from '@/shared/ui/deprecated/Card/const';
import { Text as DeprecatedvText } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = memo(
  ({ className = '', item }: NotificationItemProps) => {
    const content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card
            variant="outlined"
            className={classNames(cls.NotificationItem, {}, [className])}
          >
            <Text title={item.title} text={item.description} />
          </Card>
        }
        off={
          <DeprecatedCard
            theme={DeprecatedCardTheme.OUTLINED}
            className={classNames(cls.NotificationItem, {}, [className])}
          >
            <DeprecatedvText title={item.title} text={item.description} />
          </DeprecatedCard>
        }
      />
    );

    if (item.href?.length !== undefined && item.href?.length > 0)
      return (
        <a
          className={cls.link}
          target="_blank"
          href={item.href}
          rel="noreferrer"
        >
          {content}
        </a>
      );

    return content;
  }
);

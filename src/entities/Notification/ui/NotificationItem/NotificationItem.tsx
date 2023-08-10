import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import type { Notification } from '../../model/types/notification';
import { Card } from 'shared/ui/Card/Card';
import { CardTheme } from 'shared/ui/Card/const';
import { Text } from 'shared/ui/Text/Text';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = memo(
  ({ className = '', item }: NotificationItemProps) => {
    const content = (
      <Card
        theme={CardTheme.OUTLINED}
        className={classNames(cls.NotificationItem, {}, [className])}
      >
        <Text title={item.title} text={item.description} />
      </Card>
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

import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { NotificationList } from 'entities/Notification';
import { Button } from 'shared/ui/Button/Button';
import { ButtonTheme } from 'shared/ui/Button/const';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationsIcon from 'shared/assets/icons/notifications.svg';
import { Popover } from 'shared/ui/Popups';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = memo(
  ({ className = '' }: NotificationButtonProps) => {
    const { t } = useTranslation();
    return (
      <>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={
            <Button theme={ButtonTheme.CLEAR}>
              <Icon inverted Svg={NotificationsIcon} />
            </Button>
          }
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </>
    );
  }
);

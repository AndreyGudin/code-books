import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { NotificationList } from '@/entities/Notification';
import { Button } from '@/shared/ui/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';
import { Icon } from '@/shared/ui/Icon';
import NotificationsIcon from '@/shared/assets/icons/notifications.svg';
import { Popover } from '@/shared/ui/Popups';
import { Drawer } from '@/shared/ui/Drawer';
import { useDevice } from '@/shared/hooks/useDevice';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = memo(
  ({ className = '' }: NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useDevice();

    const onOpenDrawer = useCallback(() => {
      setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
      setIsOpen(false);
    }, []);

    const trigger = (
      <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
        <Icon inverted Svg={NotificationsIcon} />
      </Button>
    );

    if (isMobile)
      return (
        <>
          {trigger}
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        </>
      );

    return (
      <>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </>
    );
  }
);

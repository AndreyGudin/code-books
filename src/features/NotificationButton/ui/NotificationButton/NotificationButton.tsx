import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { NotificationList } from '@/entities/Notification';
import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import { Icon as DeprecatedIcon } from '@/shared/ui/deprecated/Icon';
import DeprecatedNotificationsIcon from '@/shared/assets/icons/notifications.svg';
import NotificationsIcon from '@/shared/assets/icons/notifications_new.svg';
import { Popover as DeprecatedPopover } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { useDevice } from '@/shared/hooks/useDevice';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Icon Svg={NotificationsIcon} onClick={onOpenDrawer} clickable />}
        off={
          <DeprecatedButton onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <DeprecatedIcon inverted Svg={DeprecatedNotificationsIcon} />
          </DeprecatedButton>
        }
      />
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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction="bottom left"
            trigger={trigger}
          >
            <NotificationList className={cls.notifications} />
          </Popover>
        }
        off={
          <DeprecatedPopover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction="bottom left"
            trigger={trigger}
          >
            <NotificationList className={cls.notifications} />
          </DeprecatedPopover>
        }
      />
    );
  }
);

import type { ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import { Popover as HPopover } from '@headlessui/react';
import type { DropdownDirection } from '../../../../types/ui';
import popupCls from '../../styles/popup.module.scss';
import { mapDirectionClass } from '../../styles/const';

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export function Popover({
  className = '',
  trigger,
  children,
  direction = 'bottom right'
}: PopoverProps): JSX.Element {
  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HPopover
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopover.Button className={popupCls.trigger}>{trigger}</HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, optionsClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}

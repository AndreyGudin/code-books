import { Menu } from '@headlessui/react';
import { Fragment, type ReactNode } from 'react';

import cls from './Dropdown.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import type { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/const';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction: DropdownDirection;
}

export function Dropdown({
  items,
  trigger,
  className = '',
  direction = 'bottom right'
}: DropdownProps): JSX.Element {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu
      as="div"
      className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
    >
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }): JSX.Element => (
            <button
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(
                cls.item,
                { [popupCls.active]: active },
                []
              )}
            >
              {item.content}
            </button>
          );

          if (item.href !== undefined) {
            return (
              <Menu.Item
                as={AppLink}
                to={item.href}
                key={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item as={Fragment} key={item.href} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}

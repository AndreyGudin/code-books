import { Fragment, type ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';

import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../Button/Button';
import type { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/const';
import { HStack } from '../../../../redesigned/Stack';

export interface ListboxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListboxProps {
  items?: ListboxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  direction?: DropdownDirection;
  label?: string;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export function ListBox({
  className = '',
  items = [],
  value,
  defaultValue = '',
  disabled = false,
  direction = 'bottom right',
  label = '',
  onChange
}: ListboxProps): JSX.Element {
  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack className={className} gap="4">
      {label.length > 0 && <span>{label}</span>}
      <HListbox
        as="div"
        className={classNames(cls.ListBox, {}, [popupCls.popup])}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <HListbox.Button as={Button} className={popupCls.trigger}>
          {value ?? defaultValue}
        </HListbox.Button>
        <HListbox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items.map((item) => (
            <HListbox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled ?? false
                  })}
                >
                  {selected && '*'}
                  {item.content}
                </li>
              )}
            </HListbox.Option>
          ))}
        </HListbox.Options>
      </HListbox>
    </HStack>
  );
}

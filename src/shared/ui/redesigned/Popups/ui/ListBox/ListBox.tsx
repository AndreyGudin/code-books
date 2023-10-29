import { Fragment, useMemo, type ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';

import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import type { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/const';

export interface ListboxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListboxProps<T extends string> {
  items?: ListboxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  disabled?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function ListBox<T extends string>({
  className = '',
  items = [],
  value,
  defaultValue = '',
  disabled = false,
  direction = 'bottom right',
  label = '',
  onChange
}: ListboxProps<T>): JSX.Element {
  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  const selectedItem = useMemo(() => {
    return items.find((item) => item.value === value);
  }, [items, value]);

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
        <HListbox.Button className={popupCls.trigger}>
          <Button variant="filled" disabled={disabled}>
            {selectedItem?.content ?? defaultValue}
          </Button>
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
                    [popupCls.disabled]: item.disabled ?? false,
                    [popupCls.selected]: selected
                  })}
                >
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

import { Fragment, type ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';

import cls from './ListBox.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';
import type { DropdownDirection } from 'shared/types/ui';

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

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight
};

export function Listbox({
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
        className={classNames(cls.ListBox, {}, [])}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <HListbox.Button className={cls.trigger}>
          <Button disabled={disabled}>{value ?? defaultValue}</Button>
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
                    [cls.active]: active,
                    [cls.disabled]: item.disabled ?? false
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

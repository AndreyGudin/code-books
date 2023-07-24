import { Fragment, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';

import cls from './ListBox.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';

export interface ListboxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropdownDirection = 'top' | 'bottom';

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
  bottom: cls.optionsBottom,
  top: cls.optionsTop
};

export function Listbox({
  className = '',
  items = [],
  value,
  defaultValue = '',
  disabled = false,
  direction = 'bottom',
  label = '',
  onChange
}: ListboxProps) {
  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4">
      {label && <span>{label}</span>}
      <HListbox
        as="div"
        className={classNames(cls.ListBox, {}, [className])}
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

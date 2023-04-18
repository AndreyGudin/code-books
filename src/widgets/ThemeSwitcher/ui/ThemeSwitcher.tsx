import type { FC } from 'react';

import { Theme, useTheme } from 'app/providers/ThemeProviders';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

import cls from './ThemeSwitcher.module.scss';
import ThemeIcon from 'shared/assets/icons/theme-icon.svg';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC = ({ className = '' }: ThemeSwitcherProps) => {
  const { theme = Theme.LIGHT, toggleTheme } = useTheme();
  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className, theme])}
      onClick={toggleTheme}
    >
      <ThemeIcon className={cls.icon} />
    </Button>
  );
};

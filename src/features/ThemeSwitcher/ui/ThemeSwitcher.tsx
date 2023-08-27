import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';

import cls from './ThemeSwitcher.module.scss';
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/hooks/useTheme';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC = memo(
  ({ className = '' }: ThemeSwitcherProps) => {
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
  }
);

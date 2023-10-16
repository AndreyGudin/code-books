import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';

import cls from './ThemeSwitcher.module.scss';
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/hooks/useTheme';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon } from '@/shared/ui/Icon';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC = memo(
  ({ className = '' }: ThemeSwitcherProps) => {
    const { theme = Theme.LIGHT, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();
    const onToggleHandler = useCallback(() => {
      toggleTheme((newTheme) => {
        dispatch(saveJsonSettings({ theme: newTheme })).catch((e) => {
          console.log(e);
        });
      });
    }, [dispatch, toggleTheme]);

    return (
      <Button
        theme={ButtonTheme.CLEAR}
        className={classNames(cls.ThemeSwitcher, {}, [className, theme])}
        onClick={onToggleHandler}
      >
        <Icon Svg={ThemeIcon} width={40} height={40} inverted />
      </Button>
    );
  }
);

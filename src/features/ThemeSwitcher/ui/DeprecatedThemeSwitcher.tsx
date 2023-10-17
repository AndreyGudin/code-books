import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';

import cls from './ThemeSwitcher.module.scss';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-icon.svg';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/hooks/useTheme';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';

interface DeprecatedThemeSwitcherProps {
  className?: string;
}

export const DeprecatedThemeSwitcher: FC = memo(
  ({ className = '' }: DeprecatedThemeSwitcherProps) => {
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
        <IconDeprecated
          Svg={ThemeIconDeprecated}
          width={40}
          height={40}
          inverted
        />
      </Button>
    );
  }
);

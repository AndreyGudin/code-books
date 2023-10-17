import { memo, useCallback } from 'react';
import type { FC } from 'react';

import cls from './ThemeSwitcher.module.scss';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { useTheme } from '@/shared/hooks/useTheme';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface RedesignedThemeSwitcherProps {
  className?: string;
}

export const RedesignedThemeSwitcher: FC = memo(
  ({ className = '' }: RedesignedThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();
    const onToggleHandler = useCallback(() => {
      toggleTheme((newTheme) => {
        dispatch(saveJsonSettings({ theme: newTheme })).catch((e) => {
          console.log(e);
        });
      });
    }, [dispatch, toggleTheme]);

    return (
      <Icon
        className={className}
        Svg={ThemeIcon}
        onClick={onToggleHandler}
        width={40}
        height={40}
        clickable
      />
    );
  }
);

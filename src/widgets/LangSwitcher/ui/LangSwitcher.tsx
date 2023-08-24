import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = memo(
  ({ className = '', short = false }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = (): void => {
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru').catch((e) => {
        console.warn(e);
      });
    };
    return (
      <Button
        theme={ButtonTheme.CLEAR}
        onClick={toggle}
        className={classNames(cls.LangSwitcher, {}, [className])}
      >
        {t(short ? 'Короткий язык' : 'Язык')}
      </Button>
    );
  }
);

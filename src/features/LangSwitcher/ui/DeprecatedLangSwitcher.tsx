import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import cls from './LangSwitcher.module.scss';

interface DeprecatedLangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const DeprecatedLangSwitcher: FC<DeprecatedLangSwitcherProps> = memo(
  ({ className = '', short = false }: DeprecatedLangSwitcherProps) => {
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

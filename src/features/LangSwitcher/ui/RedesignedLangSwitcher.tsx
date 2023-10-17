import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import cls from './LangSwitcher.module.scss';

interface RedesignedLangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const RedesignedLangSwitcher: FC<RedesignedLangSwitcherProps> = memo(
  ({ className = '', short = false }: RedesignedLangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = (): void => {
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru').catch((e) => {
        console.warn(e);
      });
    };
    return (
      <Button
        variant="clear"
        onClick={toggle}
        className={classNames(cls.LangSwitcher, {}, [className])}
      >
        {t(short ? 'Короткий язык' : 'Язык')}
      </Button>
    );
  }
);

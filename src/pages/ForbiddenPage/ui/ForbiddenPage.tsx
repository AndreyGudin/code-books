import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage: FC<ForbiddenPageProps> = memo(
  ({ className = '' }: ForbiddenPageProps) => {
    const { t } = useTranslation();
    return (
      <div className={classNames(cls.ForbiddenPage, {}, [className])}>
        {t('Доступ запрещен')}
      </div>
    );
  }
);

export default ForbiddenPage;

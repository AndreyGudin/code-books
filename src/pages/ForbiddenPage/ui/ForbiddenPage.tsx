import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ForbiddenPage.module.scss';
import { Page } from '@/widgets/Page';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage: FC<ForbiddenPageProps> = memo(
  ({ className = '' }: ForbiddenPageProps) => {
    const { t } = useTranslation();
    return (
      <Page
        data-testid="ForbiddenPage"
        className={classNames(cls.ForbiddenPage, {}, [className])}
      >
        {t('Доступ запрещен')}
      </Page>
    );
  }
);

export default ForbiddenPage;

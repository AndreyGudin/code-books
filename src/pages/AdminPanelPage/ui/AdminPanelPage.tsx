import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AdminPanelPage.module.scss';
import { Page } from 'widgets/Page/Page';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage: FC<AdminPanelPageProps> = memo(
  ({ className = '' }: AdminPanelPageProps) => {
    const { t } = useTranslation();
    return (
      <Page className={classNames(cls.AdminPanelPage, {}, [className])}>
        Админ панель
      </Page>
    );
  }
);

export default AdminPanelPage;

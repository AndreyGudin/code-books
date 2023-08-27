import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
}

export const PageError: FC<PageErrorProps> = ({
  className = ''
}: PageErrorProps) => {
  const { t } = useTranslation();

  const reloadPage = (): void => {
    location.reload();
  };
  console.log('err', classNames(cls.PageError, {}, [className]));
  return (
    <main className={classNames(cls.PageError, {}, [className])}>
      <p>{t('Произошла непредвиденная ошибка')}</p>
      <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
    </main>
  );
};

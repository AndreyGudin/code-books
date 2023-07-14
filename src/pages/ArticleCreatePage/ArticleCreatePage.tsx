import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';

interface ArticleCreatePageProps {
  className?: string;
}

export const ArticleCreatePage: FC<ArticleCreatePageProps> = memo(
  ({ className = '' }: ArticleCreatePageProps) => {
    const { t } = useTranslation();
    return (
      <div className={classNames(cls.ArticleCreatePage, {}, [className])}></div>
    );
  }
);

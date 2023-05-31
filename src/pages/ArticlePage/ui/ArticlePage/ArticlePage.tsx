import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlePage.module.scss';

interface ArticlePageProps {
  className?: string;
}

const ArticlePage: FC<ArticlePageProps> = ({
  className = ''
}: ArticlePageProps) => {
  const { t } = useTranslation('article');
  return (
    <div className={classNames(cls.ArticlePage, {}, [className])}>
      ARTICLE PAGE
    </div>
  );
};
export default memo(ArticlePage);

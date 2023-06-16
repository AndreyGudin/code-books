import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';

import { ArticleView } from '../../model/types/article';
import type { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList: FC<ArticleListProps> = memo(
  ({
    articles,
    className = '',
    isLoading = false,
    view = ArticleView.GRID
  }: ArticleListProps) => {
    const { t } = useTranslation();

    const renderArticle = (article: Article): JSX.Element => {
      return (
        <ArticleListItem
          className={cls.card}
          article={article}
          view={view}
          key={article.id}
        />
      );
    };

    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
      </div>
    );
  }
);

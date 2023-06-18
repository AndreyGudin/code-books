import { memo } from 'react';
import type { FC } from 'react';

import { ArticleView } from '../../model/types/article';
import type { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';

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

    if (isLoading) {
      return (
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          {new Array(view === ArticleView.GRID ? 9 : 3)
            .fill(0)
            .map((item, i) => {
              return <ArticleListItemSkeleton key={i} view={view} />;
            })}
        </div>
      );
    }

    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
      </div>
    );
  }
);

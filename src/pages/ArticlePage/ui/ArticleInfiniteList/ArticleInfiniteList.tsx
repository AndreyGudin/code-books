import { memo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { ArticleList } from '@/entities/Article';
import {
  getArticlesError,
  getArticlesIsLoading,
  getArticlesView
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slice/articlePageSlice';
import { Text } from '@/shared/ui/deprecated/Text';
import { TextTheme } from '@/shared/ui/redesigned/Text/const';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = memo(
  ({ className = '' }: ArticleInfiniteListProps) => {
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const view = useSelector(getArticlesView);

    if (error !== undefined && error?.length > 0) {
      return <Text theme={TextTheme.ERROR} text={'Something gone wrong'} />;
    }

    return (
      <ArticleList
        className={className}
        isLoading={isLoading}
        view={view}
        articles={articles}
      />
    );
  }
);

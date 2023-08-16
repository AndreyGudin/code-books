import { memo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { ArticleList } from '@/entities/Article';
import {
  getArticlesError,
  getArticlesIsLoading,
  getArticlesView
} from '../../model/selectors/articlesPageSelectors';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { getArticles } from '../../model/slice/articlePageSlice';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { Text } from '@/shared/ui/Text/Text';
import { TextTheme } from '@/shared/ui/Text/const';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = memo(
  ({ className = '' }: ArticleInfiniteListProps) => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const view = useSelector(getArticlesView);
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
      dispatch(initArticlesPage(searchParams)).catch((e) => {
        console.log(e);
      });
    });

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

import { memo, useCallback } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../model/slice/articlePageSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getArticlesHasMore } from '../../model/selectors/articlesPageSelectors';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlePage.module.scss';

interface ArticlePageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
};

const ArticlePage: FC<ArticlePageProps> = ({
  className = ''
}: ArticlePageProps) => {
  const hasMore = useSelector(getArticlesHasMore);
  const dispatch = useAppDispatch();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage()).catch((e) => {
      console.log(e);
    });
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        data-testid="ArticlesPage"
        onScrollEnd={onLoadNextPart}
        onLoadMore={onLoadNextPart}
        className={classNames(cls.ArticlePage, {}, [className])}
        enableButton={hasMore}
      >
        <ArticlePageFilters />
        <ArticleInfiniteList className={cls.list} />
      </Page>
    </DynamicModuleLoader>
  );
};
export default memo(ArticlePage);

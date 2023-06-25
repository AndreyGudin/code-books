import { memo, useCallback } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { ArticleList } from 'entities/Article';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articlesPageReducer,
  getArticles
} from '../../model/slice/articlePageSlice';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/hooks/useInitialEffect';
import {
  getArticlesError,
  getArticlesIsLoading,
  getArticlesView
} from '../../model/selectors/articlesPageSelectors';
import { Page } from 'widgets/Page/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';

import { classNames } from 'shared/lib/classNames/classNames';
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
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const error = useSelector(getArticlesError);
  const view = useSelector(getArticlesView);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage()).catch((e) => {
      console.log(e);
    });
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage()).catch((e) => {
      console.log(e);
    });
  });

  if (error !== undefined && error?.length > 0) {
    return <Text theme={TextTheme.ERROR} text={'Something gone wrong'} />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlePage, {}, [className])}
      >
        <ArticlePageFilters />
        <ArticleList
          className={cls.list}
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>
  );
};
export default memo(ArticlePage);

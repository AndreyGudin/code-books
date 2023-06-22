import { memo, useCallback } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { ArticleList, ArticleViewSelector } from 'entities/Article';
import type { ArticleView } from 'entities/Article';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles
} from '../../model/slice/articlePageSlice';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/hooks/useInitialEffect';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
  getArticlesError,
  getArticlesIsLoading,
  getArticlesView
} from '../../model/selectors/articlesPageSelectors';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlePage.module.scss';
import { Text, TextTheme } from 'shared/ui/Text/Text';

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
    dispatch(articlesPageActions.initState());
    dispatch(
      fetchArticlesList({
        page: 1
      })
    ).catch((e) => {
      console.log(e);
    });
  });

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  if (error !== undefined && error?.length > 0) {
    return <Text theme={TextTheme.ERROR} text={'Something gone wrong'} />;
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlePage, {}, [className])}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  );
};
export default memo(ArticlePage);

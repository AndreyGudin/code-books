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
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainers';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { useSearchParams } from 'react-router-dom';
import { RetractablePanel } from '@/features/RetractablePanel';
import { useDevice } from '@/shared/hooks/useDevice';

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
  const [searchParams] = useSearchParams();
  const isMobile = useDevice();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage()).catch((e) => {
      console.log(e);
    });
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams)).catch((e) => {
      console.log(e);
    });
  });

  const mainContent = (
    <StickyContentLayout
      left={<ViewSelectorContainer />}
      right={<FiltersContainer />}
      content={
        <Page
          data-testid="ArticlesPage"
          onScrollEnd={onLoadNextPart}
          onLoadMore={onLoadNextPart}
          className={classNames(cls.ArticlePageRedesigned, {}, [className])}
          enableButton={hasMore}
        >
          <ArticleInfiniteList className={cls.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  );

  const mobileContent = (
    <>
      <RetractablePanel>
        <ViewSelectorContainer />
        <FiltersContainer />
      </RetractablePanel>

      <StickyContentLayout
        content={
          <Page
            data-testid="ArticlesPage"
            onScrollEnd={onLoadNextPart}
            onLoadMore={onLoadNextPart}
            className={classNames(cls.ArticlePageRedesigned, {}, [className])}
            enableButton={hasMore}
          >
            <ArticleInfiniteList className={cls.list} />
            <ArticlePageGreeting />
          </Page>
        }
      />
    </>
  );

  const currentContent = isMobile ? mobileContent : mainContent;

  const contentForFeature = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={currentContent}
      off={
        <Page
          data-testid="ArticlesPage"
          onScrollEnd={onLoadNextPart}
          onLoadMore={onLoadNextPart}
          className={classNames(cls.ArticlePage, {}, [className])}
          enableButton={hasMore}
        >
          <ArticlePageFilters />
          <ArticleInfiniteList className={cls.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {contentForFeature}
    </DynamicModuleLoader>
  );
};
export default memo(ArticlePage);

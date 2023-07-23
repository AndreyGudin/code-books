import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { ArticleDetails, ArticleList } from 'entities/Article';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { useInitialEffect } from 'shared/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/addCommentForm';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { Page } from 'widgets/Page/Page';
import { getArticleRecommendations } from '../../model/slice/articleDetailsPageRecommendationsSlice';
import { getArticleRecommendationsCommentsIsLoading } from '../../model/selectors/recommendations';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slice';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from 'shared/ui/Stack';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({
  className = ''
}: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(
    getArticleRecommendationsCommentsIsLoading
  );
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id)).catch((e) => {
      console.log(e);
    });
    dispatch(fetchArticleRecommendations()).catch((e) => {
      console.log(e);
    });
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text)).catch((e) => {
        console.log(e);
      });
    },
    [dispatch]
  );

  if (id === undefined) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <Text
            size={TextSize.L}
            className={cls.commentTitle}
            title={t('Рекомендуем')}
          />
          <ArticleList
            className={cls.recommendations}
            articles={recommendations}
            isLoading={recommendationsIsLoading}
            target="_blank"
          />
          <Text
            size={TextSize.L}
            className={cls.commentTitle}
            title={t('Комментарии')}
          />
          <AddCommentForm onSendComment={onSendComment} />
          <CommentList isLoading={isLoading} comments={comments} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);

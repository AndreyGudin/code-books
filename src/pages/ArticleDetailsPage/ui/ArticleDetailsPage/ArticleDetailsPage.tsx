import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

import { ArticleDetails } from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleDetailsCommentsReducer,
  getArticleComments
} from '../../model/slice/artilceDetailsCommentsSlice';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { useSelector } from 'react-redux';
import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { useInitialEffect } from 'shared/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({
  className = ''
}: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id)).catch((e) => {
      console.log(e);
    });
  });

  if (id === undefined) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t('Комментарии')} />
        <CommentList isLoading={isLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Suspense, memo, useCallback } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { TextSize } from '@/shared/ui/Text/const';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { VStack } from '@/shared/ui/Stack';

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo(
  ({ className = '', id }: ArticleDetailsCommentsProps) => {
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text)).catch((e) => {
          console.log(e);
        });
      },
      [dispatch]
    );

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id)).catch((e) => {
        console.log(e);
      });
    });
    return (
      <VStack gap="16" className={classNames('', {}, [className])}>
        <Text size={TextSize.L} className={''} title={t('Комментарии')} />
        <Suspense fallback="Идет загрузка">
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>
        <CommentList isLoading={isLoading} comments={comments} />
      </VStack>
    );
  }
);

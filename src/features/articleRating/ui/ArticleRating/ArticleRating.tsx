import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { RatingCard } from '@/entities/Rating';
import {
  useGetArticleRating,
  useRateArticle
} from '../../model/api/articleRatingApi';
import { getAuthUserData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating: FC<ArticleRatingProps> = memo(
  ({ className = '', articleId }: ArticleRatingProps) => {
    const { t } = useTranslation();
    const userData = useSelector(getAuthUserData);
    const { data, isLoading } = useGetArticleRating({
      userId: userData?.id ?? '',
      articleId
    });
    const [rateArticleMutation] = useRateArticle();

    const rating = data?.[0];

    const handleRateArticle = useCallback(
      (starsCount: number, feedback?: string) => {
        rateArticleMutation({
          articleId,
          rate: starsCount,
          userId: userData?.id ?? '',
          feedback
        }).catch((e) => {
          console.log(e);
        });
      },
      [articleId, rateArticleMutation, userData?.id]
    );

    const onCancel = useCallback(
      (starsCount: number) => {
        handleRateArticle(starsCount);
      },
      [handleRateArticle]
    );
    const onAccept = useCallback(
      (starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
      },
      [handleRateArticle]
    );

    if (isLoading) {
      return <Skeleton width={'100%'} height={120} />;
    }

    return (
      <RatingCard
        onCancel={onCancel}
        onAccept={onAccept}
        rate={rating?.rate}
        className={className}
        title={t('Оцените статью') ?? 'Оцените статью'}
        feedbackTitle={t('Оставьте свой отзыв') ?? 'Оставьте свой отзыв'}
        hasFeedback
      />
    );
  }
);

export default ArticleRating;

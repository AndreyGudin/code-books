import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { TextSize, TextTheme } from '@/shared/ui/Text/const';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList: FC<ArticleRecommendationsListProps> =
  memo(({ className = '' }: ArticleRecommendationsListProps) => {
    const { t } = useTranslation();
    const {
      data: articles,
      isLoading,
      isError
    } = useArticleRecommendationsList(3);

    if (isError || articles === undefined)
      return <Text theme={TextTheme.ERROR} text={'Error'} />;

    return (
      <VStack gap={'8'} className={classNames('', {}, [className])}>
        <Text size={TextSize.L} className={''} title={t('Рекомендуем')} />
        <ArticleList
          className={''}
          articles={articles}
          isLoading={isLoading}
          target="_blank"
        />
      </VStack>
    );
  });

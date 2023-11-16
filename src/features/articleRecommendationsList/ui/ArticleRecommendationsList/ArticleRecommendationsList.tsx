import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextSize, TextTheme } from '@/shared/ui/deprecated/Text/const';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';

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
      return (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text variant={'error'} text={'Error'} />}
          off={<DeprecatedText theme={TextTheme.ERROR} text={'Error'} />}
        />
      );

    return (
      <VStack
        data-testid="ArticleRecommendationsList"
        gap={'8'}
        className={classNames('', {}, [className])}
      >
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text size={'l'} className={''} title={t('Рекомендуем')} />}
          off={
            <DeprecatedText
              size={TextSize.L}
              className={''}
              title={t('Рекомендуем')}
            />
          }
        />
        <ArticleList
          className={''}
          articles={articles}
          isLoading={isLoading}
          target="_blank"
        />
      </VStack>
    );
  });

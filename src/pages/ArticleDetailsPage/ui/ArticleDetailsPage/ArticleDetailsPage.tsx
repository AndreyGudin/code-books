import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

import { ArticleDetails } from '@/entities/Article';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { useDevice } from '@/shared/hooks/useDevice';
import { RetractablePanel } from '@/features/RetractablePanel';

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
  const isMobile = useDevice();

  const mainContent = (
    <StickyContentLayout
      content={
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
          <VStack gap="16" max>
            <DetailsContainer />
            <ArticleRating articleId={id ?? ''} />
            <ArticleRecommendationsList />
            <ArticleDetailsComments id={id ?? ''} />
          </VStack>
        </Page>
      }
      right={<AdditionalInfoContainer />}
    />
  );

  const mobileContent = (
    <>
      <RetractablePanel fullHeight={false}>
        <AdditionalInfoContainer />
      </RetractablePanel>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <DetailsContainer />
          <ArticleRating articleId={id ?? ''} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id ?? ''} />
        </VStack>
      </Page>
    </>
  );

  const contentForFeature = isMobile ? mobileContent : mainContent;

  if (id === undefined) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={contentForFeature}
        off={
          <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
              <ArticleDetailsPageHeader />
              <ArticleDetails id={id} />
              <ArticleRating articleId={id} />
              <ArticleRecommendationsList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);

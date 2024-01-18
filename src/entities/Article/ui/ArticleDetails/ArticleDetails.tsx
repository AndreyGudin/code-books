import { useTranslation } from 'react-i18next';
import { useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text as RedesignedText } from '@/shared/ui/redesigned/Text';

import { TextAlign } from '@/shared/ui/deprecated/Text/const';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton';
import { RedesignedArticleDetailsComponent } from './RedesignedArticleDetailsComponent';
import { DeprecatedArticleDetailsComponent } from './DeprecatedArticleDetailsComponent';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
};

export const DeprecatedArticleDetails = (): JSX.Element | null => {
  const article = useSelector(getArticleDetailsData);
  if (article) return <DeprecatedArticleDetailsComponent article={article} />;
  return null;
};

const RedesignedArticleDetails = (): JSX.Element | null => {
  const article = useSelector(getArticleDetailsData);

  if (article) return <RedesignedArticleDetailsComponent article={article} />;
  return null;
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ id, className = '' }: ArticleDetailsProps) => {
    const { t } = useTranslation('article-details');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);

    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
      if (__PROJECT__ !== 'storybook') {
        dispatch(fetchArticleById(id)).catch((e) => {
          console.log(e);
        });
      }
    }, [dispatch, id]);

    let content;

    if (isLoading !== undefined && isLoading) {
      content = <ArticleDetailsSkeleton />;
    } else if (error !== undefined && error.length > 0) {
      content = (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <RedesignedText
              align={'center'}
              title={t('Произошла ошибка при загрузке статьи')}
            />
          }
          off={
            <DeprecatedText
              align={TextAlign.CENTER}
              title={t('Произошла ошибка при загрузке статьи')}
            />
          }
        />
      );
    } else {
      content = (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<RedesignedArticleDetails />}
          off={<DeprecatedArticleDetails />}
        />
      );
    }

    return (
      <DynamicModuleLoader reducers={reducers}>
        <VStack
          gap="16"
          max
          className={classNames(cls.ArticleDetails, {}, [className])}
        >
          {content}
        </VStack>
      </DynamicModuleLoader>
    );
  }
);

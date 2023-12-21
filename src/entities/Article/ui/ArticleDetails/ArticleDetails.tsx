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

import { TextAlign, TextSize } from '@/shared/ui/deprecated/Text/const';
import { Avatar } from '@/shared/ui/deprecated/Avatar';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon as DeprecatedIcon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { renderBlock } from './renderBlock';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton';
import { RedesignedArticleDetailsComponent } from './RedesignedArticleDetailsComponent';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
};

const DeprecatedArticleDetails = (): JSX.Element => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify="center" max className={cls.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={cls.avatar} />
      </HStack>
      <VStack gap="4" max data-testid="ArticleDetails.Info">
        <DeprecatedText
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <HStack gap="8" className={cls.articleInfo}>
          <DeprecatedIcon Svg={EyeIcon} className={cls.icon} />
          <DeprecatedText text={String(article?.views)} />
        </HStack>
        <HStack gap="8" className={cls.articleInfo}>
          <DeprecatedIcon Svg={CalendarIcon} className={cls.icon} />
          <DeprecatedText text={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderBlock)}
    </>
  );
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

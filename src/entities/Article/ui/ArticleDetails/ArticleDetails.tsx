import { useTranslation } from 'react-i18next';
import { useEffect, memo, useCallback } from 'react';
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
import { Text } from '@/shared/ui/Text/Text';
import { TextAlign, TextSize } from '@/shared/ui/Text/const';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { ArticleBlockType } from '../../model/consts/const';
import type { ArticleBlock } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ArticleCodeBlockComponents } from '../ArticleCodeBlockComponents/ArticleCodeBlockComponents';
import { ArticleImageBlockComponents } from '../ArticleImageBlockComponents/ArticleImageBlockComponents';
import { ArticleTextBlockComponents } from '../ArticleTextBlockComponents/ArticleTextBlockComponents';
import { HStack, VStack } from '@/shared/ui/Stack';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
};
export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ id, className = '' }: ArticleDetailsProps) => {
    const { t } = useTranslation('article-details');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);

    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.CODE:
          return (
            <ArticleCodeBlockComponents
              key={block.id}
              block={block}
              className={cls.block}
            />
          );
        case ArticleBlockType.IMAGE:
          return (
            <ArticleImageBlockComponents
              key={block.id}
              block={block}
              className={cls.block}
            />
          );
        case ArticleBlockType.TEXT:
          return (
            <ArticleTextBlockComponents
              key={block.id}
              block={block}
              className={cls.block}
            />
          );
        default:
          return null;
      }
    }, []);

    useEffect(() => {
      if (__PROJECT__ !== 'storybook') {
        dispatch(fetchArticleById(id)).catch((e) => {
          console.log(e);
        });
      }
    }, [dispatch, id]);

    let content;

    if (isLoading !== undefined && isLoading) {
      content = (
        <>
          <Skeleton
            className={cls.avatar}
            width={200}
            height={200}
            border={'50%'}
          />
          <Skeleton className={cls.title} width={300} height={32} />
          <Skeleton className={cls.skeleton} width={600} height={24} />
          <Skeleton className={cls.skeleton} width="100%" height={200} />
          <Skeleton className={cls.skeleton} width="100%" height={200} />
        </>
      );
    } else if (error !== undefined && error.length > 0) {
      content = (
        <Text
          align={TextAlign.CENTER}
          title={t('Произошла ошибка при загрузке статьи')}
        />
      );
    } else {
      content = (
        <>
          <HStack justify="center" max className={cls.avatarWrapper}>
            <Avatar size={200} src={article?.img} className={cls.avatar} />
          </HStack>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <HStack gap="8" className={cls.articleInfo}>
            <Icon Svg={EyeIcon} className={cls.icon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap="8" className={cls.articleInfo}>
            <Icon Svg={CalendarIcon} className={cls.icon} />
            <Text text={article?.createdAt} />
          </HStack>
          {article?.blocks.map(renderBlock)}
        </>
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

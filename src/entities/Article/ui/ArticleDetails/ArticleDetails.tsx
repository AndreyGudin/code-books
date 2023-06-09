import { useTranslation } from 'react-i18next';
import { useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import EyeIcon from 'shared/assets/icons/eye.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import { Icon } from 'shared/ui/Icon/Icon';

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

    useEffect(() => {
      dispatch(fetchArticleById(id)).catch((e) => {
        console.log(e);
      });
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
          <div className={cls.avatarWrapper}>
            <Avatar size={200} src={article?.img} className={cls.avatar} />
          </div>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <div className={cls.articleInfo}>
            <Icon Svg={EyeIcon} className={cls.icon} />
            <Text text={String(article?.views)} />
          </div>
          <div className={cls.articleInfo}>
            <Icon Svg={CalendarIcon} className={cls.icon} />
            <Text text={article?.createdAt} />
          </div>
        </>
      );
    }

    return (
      <DynamicModuleLoader reducers={reducers}>
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
          {content}
        </div>
      </DynamicModuleLoader>
    );
  }
);

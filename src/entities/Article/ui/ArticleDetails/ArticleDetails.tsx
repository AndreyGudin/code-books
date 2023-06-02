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
import { Text, TextAlign } from 'shared/ui/Text/Text';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';

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
      content = <div>Loading..</div>;
    } else if (error !== undefined && error.length > 0) {
      content = (
        <Text
          align={TextAlign.CENTER}
          title={t('Произошла ошибка при загрузке статьи')}
        />
      );
    } else {
      content = <div>Article Details</div>;
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

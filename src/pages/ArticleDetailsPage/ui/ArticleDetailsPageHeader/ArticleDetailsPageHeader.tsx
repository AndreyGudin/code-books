import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPageHeader.module.scss';
import { RoutePath } from 'shared/config/routerConfig/routerConfig';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article';
import { getArticleDetailsData } from 'entities/Article';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(
  ({ className = '' }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackList = useCallback(() => {
      navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      if (article !== undefined)
        navigate(`${RoutePath.articles_details}${article?.id}/edit`);
    }, [article, navigate]);

    return (
      <div
        className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackList}>
          {t('Назад к списку')}
        </Button>
        {canEdit && (
          <Button
            className={cls.editButton}
            theme={ButtonTheme.OUTLINE}
            onClick={onEditArticle}
          >
            {t('Редактировать')}
          </Button>
        )}
      </div>
    );
  }
);

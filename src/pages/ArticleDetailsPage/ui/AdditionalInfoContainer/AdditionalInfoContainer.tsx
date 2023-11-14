import { memo, useCallback } from 'react';
import type { FC } from 'react';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit } from '@/shared/const/router';

export const AdditionalInfoContainer: FC = memo(() => {
  const article = useSelector(getArticleDetailsData);
  // TODO вынести в отдельную фичу(ArticleDetailsPageHeader)
  const navigate = useNavigate();
  const onEditArticle = useCallback(() => {
    if (article !== undefined) navigate(getRouteArticleEdit(article?.id));
  }, [article, navigate]);

  if (article === undefined) return null;

  return (
    <Card padding="24" border="round" className={cls.card}>
      <ArticleAdditionalInfo
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
        onEdit={onEditArticle}
      />
    </Card>
  );
});

import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './RedesignedArticleDetailsPageHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { getCanDeleteArticle } from '../../../model/selectors/article';
import { useDeleteArticleMutation } from '../../../model/api/articleDetailsApi';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Button } from '@/shared/ui/redesigned/Button';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const RedesignedArticleDetailsPageHeader: FC = memo(() => {
  const { t } = useTranslation('article-details');
  const article = useSelector(getArticleDetailsData);
  const [toDelete, setToDelete] = useState(false);
  const navigate = useNavigate();
  const canDelete = useSelector(getCanDeleteArticle);
  const [deleteArticle] = useDeleteArticleMutation();
  const onEditArticle = useCallback(() => {
    if (article !== undefined) navigate(getRouteArticleEdit(article?.id));
  }, [article, navigate]);

  const onShowDeleteModal = (): void => {
    setToDelete(true);
  };

  const onDelete = useCallback(() => {
    setToDelete(true);
    if (canDelete && article !== undefined) {
      console.log('delete');
      deleteArticle(article?.id)
        .then(() => {
          navigate(getRouteArticles());
          navigate(0);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [article, canDelete, deleteArticle, navigate]);

  const onClose = (): void => {
    setToDelete(false);
  };

  if (article === undefined) return null;

  return (
    <Card padding="24" border="round" className={cls.card}>
      <ArticleAdditionalInfo
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
        onEdit={onEditArticle}
        deleteButton={canDelete}
        onDelete={onShowDeleteModal}
      />
      <Modal className="preview" isOpen={toDelete} onClose={onClose}>
        <VStack gap="8">
          <span>{t('Вы действительно хотите удалить статью?')}</span>
          <HStack max gap="8">
            <Button onClick={onDelete}>{t('Да')}</Button>
            <Button onClick={onClose}>{t('Нет')}</Button>
          </HStack>
        </VStack>
      </Modal>
    </Card>
  );
});

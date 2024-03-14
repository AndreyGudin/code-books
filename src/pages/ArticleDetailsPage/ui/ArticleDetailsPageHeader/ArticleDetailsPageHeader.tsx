import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './ArticleDetailsPageHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import {
  getCanDeleteArticle,
  getCanEditArticle
} from '../../model/selectors/article';
import { useDeleteArticleMutation } from '../../model/api/articleDetailsApi';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Button as RedesignedButton } from '@/shared/ui/redesigned/Button';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(
  ({ className = '' }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);
    const [toDelete, setToDelete] = useState(false);
    const canDelete = useSelector(getCanDeleteArticle);
    const [deleteArticle] = useDeleteArticleMutation();

    const onBackList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
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
                  <RedesignedButton onClick={onDelete}>
                    {t('Да')}
                  </RedesignedButton>
                  <RedesignedButton onClick={onClose}>
                    {t('Нет')}
                  </RedesignedButton>
                </HStack>
              </VStack>
            </Modal>
          </Card>
        }
        off={
          <>
            <HStack
              max
              justify="between"
              className={classNames('', {}, [className])}
            >
              <DeprecatedButton
                theme={ButtonTheme.OUTLINE}
                onClick={onBackList}
              >
                {t('Назад к списку')}
              </DeprecatedButton>
              {canEdit && (
                <DeprecatedButton
                  theme={ButtonTheme.OUTLINE}
                  onClick={onEditArticle}
                >
                  {t('Редактировать')}
                </DeprecatedButton>
              )}
              {canDelete && (
                <DeprecatedButton
                  theme={ButtonTheme.OUTLINE}
                  onClick={onShowDeleteModal}
                >
                  {t('Удалить статью')}
                </DeprecatedButton>
              )}
            </HStack>
            <Modal className="preview" isOpen={toDelete} onClose={onClose}>
              <VStack gap="8">
                <span>{t('Вы действительно хотите удалить статью?')}</span>
                <HStack max gap="8">
                  <DeprecatedButton onClick={onDelete}>
                    {t('Да')}
                  </DeprecatedButton>
                  <DeprecatedButton onClick={onClose}>
                    {t('Нет')}
                  </DeprecatedButton>
                </HStack>
              </VStack>
            </Modal>
          </>
        }
      />
    );
  }
);

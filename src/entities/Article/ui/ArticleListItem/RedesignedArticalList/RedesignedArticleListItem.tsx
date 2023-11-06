import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FC, HTMLAttributeAnchorTarget } from 'react';

import { ArticleBlockType, ArticleView } from '../../../model/consts/const';
import type { ArticleTextBlock, Article } from '../../../model/types/article';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.new.module.scss';
import EyeIcon from '@/shared/assets/icons/eye_new.svg';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface RedesignedArticleListItemProps {
  className?: string;
  view?: ArticleView;
  article: Article;
  target?: HTMLAttributeAnchorTarget;
}

export const RedesignedArticleListItem: FC<RedesignedArticleListItemProps> =
  memo(
    ({
      article,
      className = '',
      target = '',
      view = ArticleView.GRID
    }: RedesignedArticleListItemProps) => {
      const { t } = useTranslation();
      const navigate = useNavigate();

      const onOpenArticle = useCallback(() => {
        navigate(getRouteArticleDetails(article.id));
      }, [article.id, navigate]);

      const types = (
        <>
          <Text text={article.type.join(', ')} className={cls.types} />
        </>
      );

      const userInfo = (
        <>
          <Avatar size={30} src={article.user.avatar} />
          <Text bold text={article.user.username} />
        </>
      );

      const views = (
        <HStack gap="8">
          <Icon Svg={EyeIcon} />
          <Text text={String(article.views)} className={cls.views} />
        </HStack>
      );

      if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
          (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;

        return (
          <Card
            fullWidth
            padding="24"
            data-testid="ArticleListItem"
            className={classNames(cls.ArticleListItem, {}, [
              className,
              cls[view]
            ])}
          >
            <VStack max gap="16">
              <HStack max gap="8">
                {userInfo}
                <Text text={article.createdAt} />
              </HStack>
              <Text bold title={article.title} />
              <Text bold title={article.subtitle} size="s" />
              {types}
              <AppImage
                fallback={<Skeleton width={'100%'} height={250} />}
                src={article.img}
                className={cls.img}
                alt=""
              />
              {textBlock !== undefined ? (
                <Text
                  text={textBlock.paragraphs.slice(0, 2).join('')}
                  className={cls.textBlock}
                />
              ) : null}
              <HStack max justify="between">
                <AppLink
                  to={getRouteArticleDetails(article.id)}
                  target={target}
                >
                  <Button variant={'outline'}>{t('Читать далее')}</Button>
                </AppLink>
                {views}
              </HStack>
            </VStack>
          </Card>
        );
      }

      return (
        <AppLink
          data-testid="ArticleListItem"
          target={target}
          to={getRouteArticleDetails(article.id)}
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view]
          ])}
        >
          <Card className={cls.card} border="round" onClick={onOpenArticle}>
            <AppImage
              fallback={<Skeleton width={200} height={200} />}
              src={article.img}
              className={cls.img}
              alt=""
            />
            <VStack className={cls.info} gap="4">
              <Text text={article.title} className={cls.title} />
              <VStack gap="4" className={cls.footer}>
                <HStack justify="between">
                  <Text text={article.createdAt} className={cls.date} />
                  {types}
                  {views}
                </HStack>
                <HStack gap="4">{userInfo}</HStack>
              </VStack>
            </VStack>
          </Card>
        </AppLink>
      );
    }
  );

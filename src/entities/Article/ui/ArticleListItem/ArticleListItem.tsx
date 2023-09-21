import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FC, HTMLAttributeAnchorTarget } from 'react';

import { ArticleBlockType, ArticleView } from '../../model/consts/const';
import type { ArticleTextBlock, Article } from '../../model/types/article';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';
import { ArticleTextBlockComponents } from '../ArticleTextBlockComponents/ArticleTextBlockComponents';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleListItemProps {
  className?: string;
  view?: ArticleView;
  article: Article;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo(
  ({
    article,
    className = '',
    target = '',
    view = ArticleView.GRID
  }: ArticleListItemProps) => {
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

    const views = (
      <>
        <Text text={String(article.views)} className={cls.views} />
        <Icon Svg={EyeIcon} />
      </>
    );

    if (view === ArticleView.LIST) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT
      ) as ArticleTextBlock;

      return (
        <div
          data-testid="ArticleListItem"
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view]
          ])}
        >
          <Card className={cls.card}>
            <div className={cls.header}>
              <Avatar size={30} src={article.user.avatar} />
              <Text text={article.user.username} className={cls.username} />
              <Text text={article.createdAt} className={cls.date} />
            </div>
            <Text title={article.title} className={cls.title} />
            {types}
            <AppImage
              fallback={<Skeleton width={'100%'} height={250} />}
              src={article.img}
              className={cls.img}
              alt=""
            />
            {textBlock !== undefined ? (
              <ArticleTextBlockComponents
                block={textBlock}
                className={cls.textBlock}
              />
            ) : null}
            <div className={cls.footer}>
              <AppLink to={getRouteArticleDetails(article.id)} target={target}>
                <Button theme={ButtonTheme.OUTLINE}>{t('Читать далее')}</Button>
              </AppLink>
              {views}
            </div>
          </Card>
        </div>
      );
    }

    return (
      <AppLink
        data-testid="ArticleListItem"
        target={target}
        to={getRouteArticleDetails(article.id)}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card} onClick={onOpenArticle}>
          <div className={cls.imageWrapper}>
            <AppImage
              fallback={<Skeleton width={200} height={200} />}
              src={article.img}
              className={cls.img}
              alt=""
            />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text title={article.title} className={cls.title} />
        </Card>
      </AppLink>
    );
  }
);

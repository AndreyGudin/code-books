import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FC, HTMLAttributeAnchorTarget } from 'react';

import { ArticleBlockType, ArticleView } from '../../model/consts/const';
import type { ArticleTextBlock, Article } from '../../model/types/article';
import { Text } from '@/shared/ui/Text/Text';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Card } from '@/shared/ui/Card/Card';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';
import { ArticleTextBlockComponents } from '../ArticleTextBlockComponents/ArticleTextBlockComponents';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/const/router';

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
      navigate(RoutePath.articles_details + article.id);
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
            <img src={article.img} className={cls.img} alt="" />
            {textBlock !== undefined ? (
              <ArticleTextBlockComponents
                block={textBlock}
                className={cls.textBlock}
              />
            ) : null}
            <div className={cls.footer}>
              <AppLink
                to={RoutePath.articles_details + article.id}
                target={target}
              >
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
        target={target}
        to={RoutePath.articles_details + article.id}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card} onClick={onOpenArticle}>
          <div className={cls.imageWrapper}>
            <img src={article.img} className={cls.img} alt="" />
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

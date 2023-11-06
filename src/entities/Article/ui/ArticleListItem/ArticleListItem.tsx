import { memo } from 'react';
import type { FC, HTMLAttributeAnchorTarget } from 'react';

import { ArticleView } from '../../model/consts/const';
import type { Article } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { RedesignedArticleListItem } from './RedesignedArticalList/RedesignedArticleListItem';
import { DeprecatedArticleListItem } from './DeprecatedArticleList/DeprecatedArticleListItem';

interface ArticleListItemProps {
  className?: string;
  view?: ArticleView;
  article: Article;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo(
  (props: ArticleListItemProps) => {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<RedesignedArticleListItem {...props} />}
        off={<DeprecatedArticleListItem {...props} />}
      />
    );
  }
);

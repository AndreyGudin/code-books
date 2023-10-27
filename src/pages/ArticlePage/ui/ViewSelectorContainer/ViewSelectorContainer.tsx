import { memo } from 'react';
import type { FC } from 'react';

import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilters } from '../../model/lib/hooks/useArticleFilters';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer: FC<ViewSelectorContainerProps> = memo(
  ({ className = '' }: ViewSelectorContainerProps) => {
    const { view, onChangeView } = useArticleFilters();
    return (
      <ArticleViewSelector
        className={className}
        view={view}
        onViewClick={onChangeView}
      />
    );
  }
);

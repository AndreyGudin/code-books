import { memo } from 'react';
import type { FC } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../model/lib/hooks/useArticleFilters';

interface FiltersContainersProps {
  className?: string;
}

export const FiltersContainer: FC<FiltersContainersProps> = memo(
  ({ className = '' }: FiltersContainersProps) => {
    const {
      sort,
      order,
      search,
      type,
      onChangeOrder,
      onChangeSort,
      onChangeSearch,
      onChangeType
    } = useArticleFilters();
    return (
      <ArticlesFilters
        onChangeOrder={onChangeOrder}
        sort={sort}
        order={order}
        search={search}
        type={type}
        onChangeSort={onChangeSort}
        onChangeSearch={onChangeSearch}
        onChangeType={onChangeType}
        className={className}
      />
    );
  }
);

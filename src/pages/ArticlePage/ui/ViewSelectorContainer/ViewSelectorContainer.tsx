import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getArticlesView } from '../../model/selectors/articlesPageSelectors';
import { ArticleView } from '@/entities/Article';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { articlesPageActions } from '../../model/slice/articlePageSlice';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer: FC<ViewSelectorContainerProps> = memo(
  ({ className = '' }: ViewSelectorContainerProps) => {
    const view = useSelector(getArticlesView);
    const dispatch = useAppDispatch();

    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
      },
      [dispatch]
    );
    return (
      <ArticleViewSelector
        className={className}
        view={view}
        onViewClick={onChangeView}
      />
    );
  }
);

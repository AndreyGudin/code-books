import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { RedesignedArticleForm } from './RedesignedArticleForm/RedesignedArticleForm';
import { DeprecatedArticleForm } from './DeprecatedArticleForm/DeprecatedArticleForm';

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleFormProps {
  existingArticleId?: string;
  className?: string;
}
const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
};

export const ArticleForm: FC<ArticleFormProps> = memo(
  ({ className = '', existingArticleId }: ArticleFormProps) => {
    const { t } = useTranslation();

    return (
      <DynamicModuleLoader reducers={reducers}>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<RedesignedArticleForm existingArticleId={existingArticleId} />}
          off={<DeprecatedArticleForm existingArticleId={existingArticleId} />}
        />
      </DynamicModuleLoader>
    );
  }
);

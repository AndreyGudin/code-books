import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { RedesignedArticleForm } from './RedesignedArticleForm/RedesignedArticleForm';

interface ArticleFormProps {
  className?: string;
}

export const ArticleForm: FC<ArticleFormProps> = memo(
  ({ className = '' }: ArticleFormProps) => {
    const { t } = useTranslation();
    return <RedesignedArticleForm />;
  }
);

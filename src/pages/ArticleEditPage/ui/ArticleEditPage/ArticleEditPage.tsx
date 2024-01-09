import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';
import { ArticleForm } from '@/widgets/ArticleForm';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<ArticleEditPageProps> = memo(
  ({ className = '' }: ArticleEditPageProps) => {
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);
    return (
      <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
        {isEdit ? <ArticleForm existingArticleId={id} /> : <ArticleForm />}
      </Page>
    );
  }
);

export default ArticleEditPage;

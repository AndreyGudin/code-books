import { memo } from 'react';
import type { FC } from 'react';

import type { ArticleTextBlock } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponents.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleTextBlockComponentsProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponents: FC<ArticleTextBlockComponentsProps> =
  memo(({ block, className = '' }: ArticleTextBlockComponentsProps) => {
    return (
      <div
        className={classNames(cls.ArticleTextBlockComponents, {}, [className])}
      >
        {block.title !== undefined ? (
          <Text title={block.title} className={cls.title} />
        ) : null}
        {block.paragraphs.map((paragraph, i) => {
          return <Text key={i} text={paragraph} className={cls.paragraph} />;
        })}
      </div>
    );
  });

import { memo } from 'react';
import type { FC } from 'react';

import { Code } from '@/shared/ui/Code/Code';
import type { ArticleCodeBlock } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCodeBlockComponents.module.scss';

interface ArticleCodeBlockComponentsProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponents: FC<ArticleCodeBlockComponentsProps> =
  memo(({ block, className = '' }: ArticleCodeBlockComponentsProps) => {
    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponents, {}, [className])}
      >
        <Code text={block.code} />
      </div>
    );
  });

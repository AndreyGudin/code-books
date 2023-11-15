import { memo } from 'react';
import type { FC } from 'react';

import { Code as DeprecatedCode } from '@/shared/ui/deprecated/Code';
import { Code as RedesignedCode } from '@/shared/ui/redesigned/Code';
import type { ArticleCodeBlock } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCodeBlockComponents.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

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
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<RedesignedCode text={block.code} />}
          off={<DeprecatedCode text={block.code} />}
        />
      </div>
    );
  });

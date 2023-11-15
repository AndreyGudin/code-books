import { memo } from 'react';
import type { FC } from 'react';

import type { ArticleTextBlock } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponents.module.scss';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text as RedesignedText } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';

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
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<RedesignedText title={block.title} className={cls.title} />}
            off={<DeprecatedText title={block.title} className={cls.title} />}
          />
        ) : null}
        {block.paragraphs.map((paragraph, i) => {
          return (
            <ToggleFeatures
              key={i}
              feature="isAppRedesigned"
              on={<RedesignedText text={paragraph} className={cls.paragraph} />}
              off={
                <DeprecatedText text={paragraph} className={cls.paragraph} />
              }
            />
          );
        })}
      </div>
    );
  });

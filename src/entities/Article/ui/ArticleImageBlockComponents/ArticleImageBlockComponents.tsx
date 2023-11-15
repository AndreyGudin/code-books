import { memo } from 'react';
import type { FC } from 'react';

import type { ArticleImageBlock } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponents.module.scss';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text as RedesignedText } from '@/shared/ui/redesigned/Text';
import { TextAlign } from '@/shared/ui/deprecated/Text/const';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleImageBlockComponentsProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponents: FC<ArticleImageBlockComponentsProps> =
  memo(({ block, className = '' }: ArticleImageBlockComponentsProps) => {
    return (
      <div
        className={classNames(cls.ArticleImageBlockComponents, {}, [className])}
      >
        <img src={block.src} alt={block.title} className={cls.img} />
        {block.title.length > 0 ? (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<RedesignedText text={block.title} align={'center'} />}
            off={<DeprecatedText text={block.title} align={TextAlign.CENTER} />}
          />
        ) : null}
      </div>
    );
  });

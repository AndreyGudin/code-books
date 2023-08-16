import { memo } from 'react';
import type { FC } from 'react';

import type { ArticleImageBlock } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponents.module.scss';
import { Text } from '@/shared/ui/Text/Text';
import { TextAlign } from '@/shared/ui/Text/const';

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
          <Text text={block.title} align={TextAlign.CENTER} />
        ) : null}
      </div>
    );
  });

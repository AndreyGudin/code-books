import type { FC } from 'react';
import cls from './ArticleDetails.module.scss';
import { Article } from '../../model/types/article';
import { renderBlock } from './renderBlock';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon as DeprecatedIcon } from '@/shared/ui/deprecated/Icon';
import { TextSize } from '@/shared/ui/deprecated/Text/const';

interface DeprecatedArticleDetailsComponentProps {
  article: Article;
}

export const DeprecatedArticleDetailsComponent: FC<
  DeprecatedArticleDetailsComponentProps
> = ({ article }: DeprecatedArticleDetailsComponentProps) => {
  return (
    <>
      <HStack justify="center" max className={cls.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={cls.avatar} />
      </HStack>
      <VStack gap="4" max data-testid="ArticleDetails.Info">
        <DeprecatedText
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <HStack gap="8" className={cls.articleInfo}>
          <DeprecatedIcon Svg={EyeIcon} className={cls.icon} />
          <DeprecatedText text={String(article?.views)} />
        </HStack>
        <HStack gap="8" className={cls.articleInfo}>
          <DeprecatedIcon Svg={CalendarIcon} className={cls.icon} />
          <DeprecatedText text={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderBlock)}
    </>
  );
};

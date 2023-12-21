import type { FC } from 'react';
import cls from './ArticleDetails.module.scss';
import { Article } from '../../model/types/article';
import { Text as RedesignedText } from '@/shared/ui/redesigned/Text';
import { Icon as RedesignedIcon } from '@/shared/ui/redesigned/Icon';
import { Skeleton as RedesignedSkeleton } from '@/shared/ui/redesigned/Skeleton';
import { renderBlock } from './renderBlock';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';

interface RedesignedArticleDetailsComponentProps {
  article: Article;
}

export const RedesignedArticleDetailsComponent: FC<
  RedesignedArticleDetailsComponentProps
> = ({ article }: RedesignedArticleDetailsComponentProps) => {
  return (
    <>
      <RedesignedText className={cls.title} title={article?.title} size={'l'} />
      <RedesignedText title={article?.subtitle} size={'l'} />
      <AppImage
        fallback={
          <RedesignedSkeleton width={'100%'} height={420} border={'16px'} />
        }
        className={cls.img}
        src={article?.img}
      />
      <VStack gap="4" max data-testid="ArticleDetails.Info">
        <HStack gap="8" className={cls.articleInfo}>
          <RedesignedIcon Svg={EyeIcon} className={cls.icon} />
          <RedesignedText text={String(article?.views)} />
        </HStack>
        <HStack gap="8" className={cls.articleInfo}>
          <RedesignedIcon Svg={CalendarIcon} className={cls.icon} />
          <RedesignedText text={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderBlock)}
    </>
  );
};

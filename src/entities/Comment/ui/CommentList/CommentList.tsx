import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

import type { Comment } from '../../model/types/comment';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { CommentCard } from '../CommentCard/CommentCard';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo(
  ({ className = '', comments, isLoading = false }: CommentListProps) => {
    const { t } = useTranslation();

    if (isLoading) {
      return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
          <CommentCard isLoading />
          <CommentCard isLoading />
          <CommentCard isLoading />
        </VStack>
      );
    }

    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        {comments !== undefined && comments?.length > 0 ? (
          comments.map((comment, i) => (
            <CommentCard isLoading={isLoading} comment={comment} key={i} />
          ))
        ) : (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<Text text={t('Комментарии отсутствуют')} />}
            off={<DeprecatedText text={t('Комментарии отсутствуют')} />}
          />
        )}
      </VStack>
    );
  }
);

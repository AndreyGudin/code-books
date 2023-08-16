import { memo } from 'react';
import type { FC } from 'react';

import type { Comment } from '../../model/types/comment';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/config/routerConfig/routerConfig';
import { VStack } from '@/shared/ui/Stack';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = memo(
  ({ className = '', comment, isLoading = false }: CommentCardProps) => {
    if (isLoading) {
      return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
          <div className={cls.header}>
            <Skeleton width={30} height={30} border={'50%'} />
            <Skeleton height={16} width={100} className={cls.username} />
          </div>
          <Skeleton className={cls.text} width={'100%'} height={50} />
        </div>
      );
    }

    if (comment === undefined) {
      return null;
    }

    return (
      <VStack
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [className])}
      >
        <AppLink
          to={`${RoutePath.profile}${comment.user.id}`}
          className={cls.header}
        >
          {comment.user.avatar !== undefined ? (
            <Avatar size={30} src={comment.user.avatar} />
          ) : null}
          <Text className={cls.username} title={comment.user.username} />
        </AppLink>
        <Text className={cls.text} text={comment.text} />
      </VStack>
    );
  }
);

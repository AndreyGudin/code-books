import { memo } from 'react';
import type { FC } from 'react';

import type { Comment } from '../../model/types/comment';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Avatar as DeprecatedAvatar } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as DeprecatedSkeleton } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as RedesignedSkeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as DeprecatedAppLink } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { VStack, getFlexClasses } from '@/shared/ui/redesigned/Stack';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = memo(
  ({ className = '', comment, isLoading = false }: CommentCardProps) => {
    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      off: () => DeprecatedSkeleton,
      on: () => RedesignedSkeleton
    });

    if (isLoading) {
      return (
        <VStack
          data-testid="CommentCard.Loading"
          gap="8"
          max
          className={classNames(cls.CommentCard, {}, [className])}
        >
          <div className={cls.header}>
            <Skeleton width={30} height={30} border={'50%'} />
            <Skeleton height={16} width={100} className={cls.username} />
          </div>
          <Skeleton className={cls.text} width={'100%'} height={50} />
        </VStack>
      );
    }

    if (comment === undefined) {
      return null;
    }

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card padding="24" border="round" fullWidth>
            <VStack
              data-testid="CommentCard.Content"
              gap="8"
              max
              className={classNames(cls.CommentCardRedesigned, {}, [className])}
            >
              <AppLink
                to={getRouteProfile(comment.user.id)}
                className={getFlexClasses({ direction: 'row', gap: '8' })}
              >
                {comment.user.avatar !== undefined ? (
                  <Avatar size={30} src={comment.user.avatar} />
                ) : null}
                <Text
                  className={cls.username}
                  text={comment.user.username}
                  bold
                />
              </AppLink>
              <Text text={comment.text} />
            </VStack>
          </Card>
        }
        off={
          <VStack
            data-testid="CommentCard.Content"
            gap="8"
            max
            className={classNames(cls.CommentCard, {}, [className])}
          >
            <DeprecatedAppLink
              to={getRouteProfile(comment.user.id)}
              className={cls.header}
            >
              {comment.user.avatar !== undefined ? (
                <DeprecatedAvatar size={30} src={comment.user.avatar} />
              ) : null}
              <DeprecatedText
                className={cls.username}
                title={comment.user.username}
              />
            </DeprecatedAppLink>
            <DeprecatedText className={cls.text} text={comment.text} />
          </VStack>
        }
      />
    );
  }
);

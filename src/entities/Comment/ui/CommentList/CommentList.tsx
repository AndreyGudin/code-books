import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

import type { Comment } from '../../model/types/comment';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../CommentCard/CommentCard';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CommentList.module.scss';

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
        <div className={classNames(cls.CommentList, {}, [className])}>
          <CommentCard isLoading />
          <CommentCard isLoading />
          <CommentCard isLoading />
        </div>
      );
    }

    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        {comments !== undefined && comments?.length > 0 ? (
          comments.map((comment, i) => (
            <CommentCard
              isLoading={isLoading}
              className={cls.comment}
              comment={comment}
              key={i}
            />
          ))
        ) : (
          <Text text={t('Комментарии отсутствуют')} />
        )}
      </div>
    );
  }
);

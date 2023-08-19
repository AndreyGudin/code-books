import { Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export const ArticleRatingLazy = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./ArticleRating')
);

export const ArticleRatingAsync = (props: ArticleRatingProps): JSX.Element => {
  return (
    <Suspense fallback={<Skeleton width={'100%'} height={140} />}>
      <ArticleRatingLazy {...props} />
    </Suspense>
  );
};

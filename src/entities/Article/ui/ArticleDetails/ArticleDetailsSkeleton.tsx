import cls from './ArticleDetails.module.scss';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as DeprecatedSkeleton } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as RedesignedSkeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleDetailsSkeleton = (): JSX.Element => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => DeprecatedSkeleton,
    on: () => RedesignedSkeleton
  });
  return (
    <VStack max gap="16">
      <Skeleton
        className={cls.avatar}
        width={200}
        height={200}
        border={'50%'}
      />
      <Skeleton className={cls.title} width={300} height={32} />
      <Skeleton className={cls.skeleton} width={600} height={24} />
      <Skeleton className={cls.skeleton} width="100%" height={200} />
      <Skeleton className={cls.skeleton} width="100%" height={200} />
    </VStack>
  );
};

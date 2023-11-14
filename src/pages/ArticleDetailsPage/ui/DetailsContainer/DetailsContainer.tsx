import { memo } from 'react';
import type { FC } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer: FC<DetailsContainerProps> = memo(
  ({ className = '' }: DetailsContainerProps) => {
    const { id } = useParams<{ id: string }>();

    return (
      <Card
        fullWidth
        fullHeight
        className={className}
        padding="24"
        border="round"
      >
        <ArticleDetails id={id ?? ''} />
      </Card>
    );
  }
);

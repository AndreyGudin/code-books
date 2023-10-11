import { memo } from 'react';
import type { FC } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';
import { DeprecatedSidebar } from './DeprecatedSidebar';
import { RedesignedSidebar } from './RedesignedSidebar';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC = memo(({ className = '' }: SidebarProps) => {
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<RedesignedSidebar />}
      off={<DeprecatedSidebar />}
    />
  );
});

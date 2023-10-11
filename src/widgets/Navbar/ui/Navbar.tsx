/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import type { FC } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';
import { RedesignedNavbar } from './RedesignedNavbar';
import { DeprecatedNavbar } from './DeprecetedNavbar';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC = memo(({ className = '' }: NavbarProps) => {
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<RedesignedNavbar />}
      off={<DeprecatedNavbar />}
    />
  );
});

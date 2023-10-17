import type { FC } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';
import { RedesignedThemeSwitcher } from './RedesignedThemeSwitcher';
import { DeprecatedThemeSwitcher } from './DeprecatedThemeSwitcher';

export const ThemeSwitcher: FC = () => {
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<RedesignedThemeSwitcher />}
      off={<DeprecatedThemeSwitcher />}
    />
  );
};

import type { FC } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';
import { RedesignedAvatarDropdown } from './RedesignedAvatarDropdown';
import { DeprecatedAvatarDropdown } from './DeprecatedAvatarDropdown';

export const AvatarDropdown: FC = () => {
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<RedesignedAvatarDropdown />}
      off={<DeprecatedAvatarDropdown />}
    />
  );
};

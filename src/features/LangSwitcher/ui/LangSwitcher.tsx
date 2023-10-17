import { memo } from 'react';
import type { FC } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';
import { RedesignedLangSwitcher } from './RedesignedLangSwitcher';
import { DeprecatedLangSwitcher } from './DeprecatedLangSwitcher';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = memo(
  ({ className = '', short = false }: LangSwitcherProps) => {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<RedesignedLangSwitcher className={className} short={short} />}
        off={<DeprecatedLangSwitcher className={className} short={short} />}
      />
    );
  }
);

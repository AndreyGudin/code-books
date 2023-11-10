import type { FC, ReactElement } from 'react';
import { getFeatureFlag } from '../../lib/setGetFeatures';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface ToggleFeaturesProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures: FC<ToggleFeaturesProps> = ({
  feature,
  off,
  on
}: ToggleFeaturesProps) => {
  if (getFeatureFlag(feature)) return on;
  return off;
};

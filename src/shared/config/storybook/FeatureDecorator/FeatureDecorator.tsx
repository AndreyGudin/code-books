import type { StoryFn } from '@storybook/react';
// eslint-disable-next-line andrey-gudin-forprod/layer-imports
import '@/app/styles/index.scss';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

export const FeatureDecorator =
  (features: FeatureFlags) => (StoryComponent: StoryFn) => {
    setFeatureFlags(features);
    return <StoryComponent />;
  };

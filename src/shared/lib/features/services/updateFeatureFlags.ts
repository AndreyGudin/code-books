import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutations } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagsOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeaturesFlags = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  UpdateFeatureFlagsOptions,
  ThunkConfig<string>
>(
  'user/updateFeaturesFlag',
  async ({ newFeatures, userId }, { dispatch, rejectWithValue }) => {
    console.log('newFeatures', newFeatures);
    try {
      await dispatch(
        updateFeatureFlagsMutations({
          userId,
          features: { ...getAllFeatureFlags(), ...newFeatures }
        })
      );
      window.location.reload();
    } catch (error) {
      return rejectWithValue('');
    }
  }
);

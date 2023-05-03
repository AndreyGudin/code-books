import type { DeepPartial } from '@reduxjs/toolkit';
import type { Decorator } from '@storybook/react';

import { StoreProvider } from 'app/providers/StoreProvider';
import type { StateSchema } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';

export const StoreDecorator: (state: DeepPartial<StateSchema>) => Decorator =
  (state: DeepPartial<StateSchema>) => (StoryComponent) =>
    (
      <StoreProvider initialState={state as StateSchema}>
        <StoryComponent />
      </StoreProvider>
    );

import type { StateSchema } from 'app/providers/StoreProvider';
import type { ScrollSchema } from '../types/ScrollSaveSchema';
import { createSelector } from '@reduxjs/toolkit';

export const getSaveScrollPosition = (state: StateSchema): ScrollSchema =>
  state.scrollPosition.scroll;
export const getSaveScrollPositionByPath = createSelector(
  getSaveScrollPosition,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] ?? 0
);

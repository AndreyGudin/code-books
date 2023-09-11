import {
  ActionCreator,
  CreateSliceOptions,
  SliceCaseReducers,
  bindActionCreators,
  createSlice
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  const slice = createSlice(options);

  const useActions = (): ActionCreator<unknown> => {
    const dispatch = useDispatch();
    return useMemo(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      () => bindActionCreators(slice.actions, dispatch),
      [dispatch]
    );
  };

  return {
    ...slice,
    useActions
  };
}

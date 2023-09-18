import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>];

export function buildSelectors<T>(selector: Selector<T>): Result<T> {
  const useSelectorHook = (): T => {
    return useSelector(selector);
  };

  return [useSelectorHook, selector];
}
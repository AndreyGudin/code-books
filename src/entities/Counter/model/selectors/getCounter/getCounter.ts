import type { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import type { CounterSchema } from '../../types/CounterSchema';

export const getCounter = (state: StateSchema): CounterSchema => state.counter;

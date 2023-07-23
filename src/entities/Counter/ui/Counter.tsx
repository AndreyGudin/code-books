import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'shared/ui/Button/Button';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = ({ className = '' }: CounterProps) => {
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);
  const increment = (): void => {
    dispatch(counterActions.increment());
  };

  const decrement = (): void => {
    dispatch(counterActions.decrement());
  };
  return (
    <div className={''}>
      <h1 data-testid="value-title">value = {counterValue}</h1>
      <Button data-testid="increment-btn" onClick={increment}>
        increment
      </Button>
      <Button data-testid="decrement-btn" onClick={decrement}>
        decrement
      </Button>
    </div>
  );
};

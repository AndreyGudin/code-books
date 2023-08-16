import type { Decorator } from '@storybook/react';
import '@/app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator: Decorator = (story) => {
  return <BrowserRouter>{story()}</BrowserRouter>;
};

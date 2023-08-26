import type { Decorator } from '@storybook/react';
// eslint-disable-next-line andrey-gudin-forprod/layer-imports
import '@/app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator: Decorator = (story) => {
  return <BrowserRouter>{story()}</BrowserRouter>;
};

import type { Decorator } from '@storybook/react';
// eslint-disable-next-line andrey-gudin-forprod/layer-imports
import '@/app/styles/index.scss';

export const StyleDecorator: Decorator = (story) => story();

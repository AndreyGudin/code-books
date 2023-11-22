import type { Preview } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { FeatureDecorator } from '../../src/shared/config/storybook/FeatureDecorator/FeatureDecorator';
import { Theme } from '../../src/shared/const/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: ['app', Theme.LIGHT], color: '#fff' },
        { name: 'dark', class: ['app', Theme.DARK], color: '#000000' },
        { name: 'green', class: ['app', Theme.GREEN], color: '#3b5998' }
      ]
    }
  },
  decorators: [
    StyleDecorator,
    withRouter,
    SuspenseDecorator,
    FeatureDecorator({ isAppRedesigned: false })
  ]
};
export default preview;

import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import ProfilePage from './ProfilePage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {}
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      profile: {
        form: {
          username: 'admin',
          age: 18,
          avatar,
          city: 'Moscow',
          country: Country.Russia,
          currency: Currency.RUB,
          first: 'Andrei',
          lastname: 'Gudin'
        }
      }
    })
  ]
};

export const Dark: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      profile: {
        form: {
          username: 'admin',
          age: 18,
          avatar,
          city: 'Moscow',
          country: Country.Russia,
          currency: Currency.RUB,
          first: 'Andrei',
          lastname: 'Gudin'
        }
      }
    })
  ]
};

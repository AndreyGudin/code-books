import type { Meta, StoryObj } from '@storybook/react';

import ProfilePage from './ProfilePage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
  title: 'pages/ProfilePage/redesigned',
  component: ProfilePage,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
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

import type { Meta, StoryObj } from '@storybook/react';

import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';

const meta = {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {}
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: {
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
};

export const WithError: Story = {
  args: {
    error: 'true'
  }
};

export const Loading: Story = {
  args: { isLoading: true }
};

import type { Meta, StoryObj } from '@storybook/react';

import { Navbar } from './Navbar';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'widgets/Navbar/deprecated',
  component: Navbar,
  argTypes: {}
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
  decorators: [StoreDecorator({})]
};

export const AuthNavbar: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      user: {
        authData: { username: '123', id: '1' }
      }
    })
  ]
};

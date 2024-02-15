import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import LoginForm from './LoginForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'features/LoginForm/deprecated',
  component: LoginForm,
  argTypes: {}
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      loginForm: {
        username: '123',
        password: '123'
      }
    })
  ]
};

export const Dark: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      loginForm: {
        username: '123',
        password: '123'
      }
    })
  ]
};

export const WithError: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      loginForm: {
        username: '123',
        password: '123',
        error: 'ERROR'
      }
    })
  ]
};

export const Loading: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      loginForm: {
        username: '123',
        password: '123',
        isLoading: true
      }
    })
  ]
};

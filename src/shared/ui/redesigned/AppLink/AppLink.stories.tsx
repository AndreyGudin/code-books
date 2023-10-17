import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { AppLink } from './AppLink';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {},
  args: { to: '/' }
} satisfies Meta<typeof AppLink>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Text', variant: 'primary' }
};

export const Secondary: Story = {
  args: { children: 'Text', variant: 'red' },
  decorators: [ThemeDecorator(Theme.DARK)]
};

export const PrimaryDark: Story = {
  args: { children: 'Text', variant: 'primary' },
  decorators: [ThemeDecorator(Theme.DARK)]
};

export const SecondaryDark: Story = {
  args: { children: 'Text', variant: 'red' },
  decorators: [ThemeDecorator(Theme.DARK)]
};

export default meta;

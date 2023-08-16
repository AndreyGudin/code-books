import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProviders';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Loader } from './Loader';

const meta = {
  title: 'shared/Loader',
  component: Loader,
  argTypes: {}
} satisfies Meta<typeof Loader>;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {}
};

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
};

export default meta;

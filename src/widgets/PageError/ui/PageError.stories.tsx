import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { PageError } from './PageError';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'widgets/PageError',
  component: PageError,
  argTypes: {}
} satisfies Meta<typeof PageError>;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {}
};

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
};

export default meta;

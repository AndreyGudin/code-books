import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ThemeSwitcher } from './ThemeSwitcher';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'widget/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {}
} satisfies Meta<typeof ThemeSwitcher>;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {}
};

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
};

export const Green: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.GREEN)]
};

export default meta;

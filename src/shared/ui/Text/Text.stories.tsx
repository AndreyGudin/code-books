import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProviders';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text, TextTheme } from './Text';

const meta = {
  title: 'shared/Text',
  component: Text,
  argTypes: {}
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Title Lorem, ipsum.',
    text: 'Description Description Description'
  }
};

export const OnlyTitle: Story = {
  args: {
    title: 'Title Lorem, ipsum.'
  }
};

export const OnlyText: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, maiores.'
  }
};

export const PrimaryDark: Story = {
  args: {
    title: 'Title Lorem, ipsum.',
    text: 'Description Description Description'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
};

export const OnlyTitleDark: Story = {
  args: {
    title: 'Title Lorem, ipsum.'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
};

export const OnlyTextDark: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, maiores.'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
};

export const Error: Story = {
  args: {
    title: 'Title Lorem, ipsum.',
    text: 'Description Description Description',
    theme: TextTheme.ERROR
  }
};
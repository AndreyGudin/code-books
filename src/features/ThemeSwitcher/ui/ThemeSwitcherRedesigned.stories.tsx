import type { Meta, StoryObj } from '@storybook/react';

import { ThemeSwitcher } from './ThemeSwitcher';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
  title: 'features/ThemeSwitcher/redesigned',
  component: ThemeSwitcher,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof ThemeSwitcher>;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {}
};
export default meta;

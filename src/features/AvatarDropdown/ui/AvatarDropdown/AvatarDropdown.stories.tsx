import type { Meta, StoryObj } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';
const meta = {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {}
} satisfies Meta<typeof AvatarDropdown>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

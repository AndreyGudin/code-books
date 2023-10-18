import type { Meta, StoryObj } from '@storybook/react';
import { AppImage } from './AppImage';
const meta = {
  title: 'shared/redesigned/AppImage',
  component: AppImage,
  argTypes: {}
} satisfies Meta<typeof AppImage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

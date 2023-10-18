import type { Meta, StoryObj } from '@storybook/react';
import { AppLogo } from './AppLogo';
const meta = {
  title: 'shared/redesigned/AppLogo',
  component: AppLogo,
  argTypes: {}
} satisfies Meta<typeof AppLogo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { AppLogo } from './AppLogo';
const meta = {
  title: 'pages/AppLogo',
  component: AppLogo,
  argTypes: {}
} satisfies Meta<typeof AppLogo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

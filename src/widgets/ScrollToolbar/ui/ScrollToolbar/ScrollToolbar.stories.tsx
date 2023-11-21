import type { Meta, StoryObj } from '@storybook/react';
import { ScrollToolbar } from './ScrollToolbar';
const meta = {
  title: 'pages/ScrollToolbar',
  component: ScrollToolbar,
  argTypes: {}
} satisfies Meta<typeof ScrollToolbar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

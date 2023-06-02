import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
const meta = {
  title: 'pages/Skeleton',
  component: Skeleton,
  argTypes: {}
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

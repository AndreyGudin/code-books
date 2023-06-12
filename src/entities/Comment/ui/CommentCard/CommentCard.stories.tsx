import type { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';
const meta = {
  title: 'pages/CommentCard',
  component: CommentCard,
  argTypes: {}
} satisfies Meta<typeof CommentCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

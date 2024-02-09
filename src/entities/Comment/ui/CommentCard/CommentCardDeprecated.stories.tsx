import type { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';
const meta = {
  title: 'entities/Comment/CommentCard/deprecated',
  component: CommentCard,
  argTypes: {}
} satisfies Meta<typeof CommentCard>;
export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  comment: { id: '1', text: '123213', user: { id: '1', username: 'admin' } }
};

export const Normal: Story = {
  args
};

export const Loading: Story = {
  args: {
    ...args,
    isLoading: true
  }
};

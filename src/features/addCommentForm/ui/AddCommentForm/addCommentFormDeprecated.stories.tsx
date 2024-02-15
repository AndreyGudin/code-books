import type { Meta, StoryObj } from '@storybook/react';

import AddCommentForm from './AddCommentForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'features/AddCommentForm/deprecated',
  component: AddCommentForm,
  argTypes: {}
} satisfies Meta<typeof AddCommentForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
  decorators: [StoreDecorator({})]
};

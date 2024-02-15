import type { Meta, StoryObj } from '@storybook/react';

import AddCommentForm from './AddCommentForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
  title: 'features/AddCommentForm/redesigned',
  component: AddCommentForm,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof AddCommentForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
  decorators: [StoreDecorator({})]
};

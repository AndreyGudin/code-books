import type { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'features/EditableProfileCard/EditableProfileCard/redesigned',
  component: EditableProfileCard,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof EditableProfileCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    id: '1'
  },
  decorators: [StoreDecorator({})]
};

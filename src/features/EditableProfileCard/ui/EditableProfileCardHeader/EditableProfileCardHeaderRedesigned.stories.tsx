import type { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'features/EditableProfileCard/EditableProfileCardHeader/redesigned',
  component: EditableProfileCardHeader,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof EditableProfileCardHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  decorators: [StoreDecorator({})]
};

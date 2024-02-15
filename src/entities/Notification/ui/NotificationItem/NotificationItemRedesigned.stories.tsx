import type { Meta, StoryObj } from '@storybook/react';
import { NotificationItem } from './NotificationItem';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'entities/Notification/NotificationItem/redesigned',
  component: NotificationItem,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof NotificationItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    item: {
      description: 'description',
      id: '1',
      title: 'title'
    }
  }
};

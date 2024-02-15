import type { Meta, StoryObj } from '@storybook/react';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'entities/Notification/NotificationList/deprecated',
  component: NotificationList,
  argTypes: {}
} satisfies Meta<typeof NotificationList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  decorators: [StoreDecorator({})],
  parameters: {
    mockData: [
      {
        url: `${__API__}/notifications`,
        method: 'GET',
        status: 200,
        response: [
          {
            id: '1',
            title: 'Уведомление1',
            description: 'Описание1'
          },
          {
            id: '2',
            title: 'Уведомление2',
            description: 'Описание2'
          },
          {
            id: '3',
            title: 'Уведомление3',
            description: 'Описание3'
          }
        ]
      }
    ]
  }
};

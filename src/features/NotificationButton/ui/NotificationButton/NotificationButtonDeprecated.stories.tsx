import type { Meta, StoryObj } from '@storybook/react';

import { NotificationButton } from './NotificationButton';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'features/NotificationButton/deprecated',
  component: NotificationButton,
  argTypes: {},
  decorators: [
    StoreDecorator({}),
    (Story) => (
      <div style={{ width: 600, position: 'relative' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof NotificationButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

import type { Meta, StoryObj } from '@storybook/react';

import { NotificationButton } from './NotificationButton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'features/NotificationButton/redesigned',
  component: NotificationButton,
  argTypes: {},
  decorators: [
    NewDesignDecorator,
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

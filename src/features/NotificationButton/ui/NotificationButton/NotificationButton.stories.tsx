import type { Meta, StoryObj } from '@storybook/react';
import { NotificationButton } from './NotificationButton';
const meta = {
  title: 'pages/NotificationButton',
  component: NotificationButton,
  argTypes: {}
} satisfies Meta<typeof NotificationButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

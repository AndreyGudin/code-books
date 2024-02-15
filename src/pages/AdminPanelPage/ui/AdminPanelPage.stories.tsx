import type { Meta, StoryObj } from '@storybook/react';
import AdminPanelPage from './AdminPanelPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'pages/AdminPanelPage',
  component: AdminPanelPage,
  argTypes: {},
  decorators: [StoreDecorator({})]
} satisfies Meta<typeof AdminPanelPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};
export const NormalRedesigned: Story = { decorators: [NewDesignDecorator] };

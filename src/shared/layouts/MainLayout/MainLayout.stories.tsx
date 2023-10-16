import type { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from './MainLayout';
const meta = {
  title: 'pages/MainLayout',
  component: MainLayout,
  argTypes: {}
} satisfies Meta<typeof MainLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    content: <div>Content</div>,
    header: <div>header</div>,
    sidebar: <div>Sidebar</div>
  }
};

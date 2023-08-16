import type { Meta, StoryObj } from '@storybook/react';
import ArticlePage from './ArticlePage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'pages/ArticlePage/ArticlePage',
  component: ArticlePage,
  argTypes: {}
} satisfies Meta<typeof ArticlePage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = { decorators: [StoreDecorator({})] };

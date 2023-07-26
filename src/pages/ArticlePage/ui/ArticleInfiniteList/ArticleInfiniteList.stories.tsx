import type { Meta, StoryObj } from '@storybook/react';
import { ArticleInfiniteList } from './ArticleInfiniteList';
const meta = {
  title: 'pages/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {}
} satisfies Meta<typeof ArticleInfiniteList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

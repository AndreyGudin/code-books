import type { Meta, StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';
const meta = {
  title: 'pages/ArticleList',
  component: ArticleList,
  argTypes: {}
} satisfies Meta<typeof ArticleList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = { args: { articles: [] } };

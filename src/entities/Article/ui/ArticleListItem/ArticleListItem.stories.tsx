import type { Meta, StoryObj } from '@storybook/react';
import { ArticleListItem } from './ArticleListItem';
import type { Article } from 'entities/Article/model/types/article';
const meta = {
  title: 'pages/ArticleListItem',
  component: ArticleListItem,
  argTypes: {}
} satisfies Meta<typeof ArticleListItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    article: {} as Article
  }
};

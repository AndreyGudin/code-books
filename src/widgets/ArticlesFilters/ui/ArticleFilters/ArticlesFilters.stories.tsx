import type { Meta, StoryObj } from '@storybook/react';
import { ArticlesFilters } from './ArticlesFilters';
import { ArticleSortField, ArticleType } from '@/entities/Article';
const meta = {
  title: 'pages/ArticlesFilters',
  component: ArticlesFilters,
  argTypes: {}
} satisfies Meta<typeof ArticlesFilters>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    order: 'asc',
    search: '',
    sort: ArticleSortField.CREATED,
    type: ArticleType.ECONOMICS
  }
};

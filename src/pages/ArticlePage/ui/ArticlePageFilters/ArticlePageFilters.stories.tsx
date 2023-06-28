import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePageFilters } from './ArticlePageFilters';
const meta = {
  title: 'pages/ArticlePage/ArticlePageFilters',
  component: ArticlePageFilters,
  argTypes: {}
} satisfies Meta<typeof ArticlePageFilters>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

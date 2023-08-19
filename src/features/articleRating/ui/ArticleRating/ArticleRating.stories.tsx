import type { Meta, StoryObj } from '@storybook/react';
import ArticleRating from './ArticleRating';
const meta = {
  title: 'pages/ArticleRating',
  component: ArticleRating,
  argTypes: {}
} satisfies Meta<typeof ArticleRating>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    articleId: '1'
  }
};

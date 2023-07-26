import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetailsComments } from './ArticleDetailsComments';
const meta = {
  title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
  component: ArticleDetailsComments,
  argTypes: {}
} satisfies Meta<typeof ArticleDetailsComments>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = { args: { id: '1' } };

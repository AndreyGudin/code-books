import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePageGreeting } from './ArticlePageGreeting';
const meta = {
  title: 'pages/ArticlePageGreeting',
  component: ArticlePageGreeting,
  argTypes: {}
} satisfies Meta<typeof ArticlePageGreeting>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

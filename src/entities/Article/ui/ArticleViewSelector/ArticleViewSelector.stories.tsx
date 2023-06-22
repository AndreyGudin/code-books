import type { Meta, StoryObj } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';
const meta = {
  title: 'pages/ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {}
} satisfies Meta<typeof ArticleViewSelector>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

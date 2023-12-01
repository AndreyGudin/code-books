import type { Meta, StoryObj } from '@storybook/react';
import { ArticleForm } from './ArticleForm';
const meta = {
  title: 'pages/ArticleForm',
  component: ArticleForm,
  argTypes: {}
} satisfies Meta<typeof ArticleForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

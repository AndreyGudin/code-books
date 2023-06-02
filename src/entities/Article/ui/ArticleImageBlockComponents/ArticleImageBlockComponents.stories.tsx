import type { Meta, StoryObj } from '@storybook/react';
import { ArticleImageBlockComponents } from './ArticleImageBlockComponents';
const meta = {
  title: 'pages/ArticleImageBlockComponents',
  component: ArticleImageBlockComponents,
  argTypes: {}
} satisfies Meta<typeof ArticleImageBlockComponents>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

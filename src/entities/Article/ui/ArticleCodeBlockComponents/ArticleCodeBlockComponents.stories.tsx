import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCodeBlockComponents } from './ArticleCodeBlockComponents';
const meta = {
  title: 'pages/ArticleCodeBlockComponents',
  component: ArticleCodeBlockComponents,
  argTypes: {}
} satisfies Meta<typeof ArticleCodeBlockComponents>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { ArticleTextBlockComponents } from './ArticleTextBlockComponents';
const meta = {
  title: 'pages/ArticleTextBlockComponents',
  component: ArticleTextBlockComponents,
  argTypes: {}
} satisfies Meta<typeof ArticleTextBlockComponents>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCreatePage } from './ArticleCreatePage';
const meta = {
  title: 'pages/ArticleCreatePage',
  component: ArticleCreatePage,
  argTypes: {}
} satisfies Meta<typeof ArticleCreatePage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { ArticleSortSelector } from './ArticleSortSelector';
const meta = {
  title: 'pages/ArticleSortSelector',
  component: ArticleSortSelector,
  argTypes: {}
} satisfies Meta<typeof ArticleSortSelector>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

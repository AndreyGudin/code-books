import type { Meta, StoryObj } from '@storybook/react';
import { ArticleSortSelector } from './ArticleSortSelector';
import { ArticleSortField } from '../../model/consts/const';
const meta = {
  title: 'entities/Article/ArticleSortSelector',
  component: ArticleSortSelector,
  argTypes: {}
} satisfies Meta<typeof ArticleSortSelector>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    order: 'asc',
    sort: ArticleSortField.CREATED,
    onChangeOrder: () => {},
    onChangeSort: () => {}
  }
};

import type { Meta, StoryObj } from '@storybook/react';
import { ArticleSortSelector } from './ArticleSortSelector';
import { ArticleSortField } from '@/entities/Article';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'entities/Article/ArticleSortSelector/redesigned',
  component: ArticleSortSelector,
  argTypes: {},
  decorators: [NewDesignDecorator]
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

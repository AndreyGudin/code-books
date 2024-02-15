import type { Meta, StoryObj } from '@storybook/react';
import { ArticlesFilters } from './ArticlesFilters';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'widgets/ArticlesFilters/redesigned',
  component: ArticlesFilters,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof ArticlesFilters>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    order: 'asc',
    search: '',
    sort: ArticleSortField.CREATED,
    type: ArticleType.ECONOMICS
  }
};

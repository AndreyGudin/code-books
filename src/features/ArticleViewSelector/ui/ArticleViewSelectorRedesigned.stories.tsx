import type { Meta, StoryObj } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'entities/Article/ArticleViewSelector/redesigned',
  component: ArticleViewSelector,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof ArticleViewSelector>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { ArticleTypeTabs } from './ArticleTypeTabs';
import { ArticleType } from '@/entities/Article';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'entities/Article/ArticleTypeTabs/redesigned',
  component: ArticleTypeTabs,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof ArticleTypeTabs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    value: ArticleType.ECONOMICS
  }
};

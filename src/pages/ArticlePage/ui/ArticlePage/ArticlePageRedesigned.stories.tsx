import type { Meta, StoryObj } from '@storybook/react';
import ArticlePage from './ArticlePage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'pages/ArticlePage/ArticlePage/redesigned',
  component: ArticlePage,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof ArticlePage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = { decorators: [StoreDecorator({})] };

import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePageGreeting } from './ArticlePageGreeting';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'features/ArticlePageGreeting/redesigned',
  component: ArticlePageGreeting,
  argTypes: {},
  decorators: [NewDesignDecorator, StoreDecorator({})]
} satisfies Meta<typeof ArticlePageGreeting>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

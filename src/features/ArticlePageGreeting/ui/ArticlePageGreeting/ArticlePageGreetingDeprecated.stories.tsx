import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePageGreeting } from './ArticlePageGreeting';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'features/ArticlePageGreeting/deprecated',
  component: ArticlePageGreeting,
  argTypes: {},
  decorators: [StoreDecorator({})]
} satisfies Meta<typeof ArticlePageGreeting>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

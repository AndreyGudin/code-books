import type { Meta, StoryObj } from '@storybook/react';
import { ArticleForm } from './ArticleForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'widgets/ArticleForm/deprecated',
  component: ArticleForm,
  argTypes: {},
  decorators: [StoreDecorator({})]
} satisfies Meta<typeof ArticleForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

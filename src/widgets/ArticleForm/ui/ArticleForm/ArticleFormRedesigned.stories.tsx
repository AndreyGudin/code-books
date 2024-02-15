import type { Meta, StoryObj } from '@storybook/react';
import { ArticleForm } from './ArticleForm';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'widgets/ArticleForm/redesigned',
  component: ArticleForm,
  argTypes: {},
  decorators: [NewDesignDecorator, StoreDecorator({})]
} satisfies Meta<typeof ArticleForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

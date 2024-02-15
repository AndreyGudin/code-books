import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetailsComments } from './ArticleDetailsComments';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'pages/ArticleDetailsPage/ArticleDetailsComments/redesigned',
  component: ArticleDetailsComments,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof ArticleDetailsComments>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: { id: '1' },
  decorators: [StoreDecorator({})]
};

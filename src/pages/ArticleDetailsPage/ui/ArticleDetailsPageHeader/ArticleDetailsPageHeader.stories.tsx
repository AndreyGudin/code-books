import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  argTypes: {}
} satisfies Meta<typeof ArticleDetailsPageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = { decorators: [StoreDecorator({})] };

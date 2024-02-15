import type { Meta, StoryObj } from '@storybook/react';
import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';
const meta = {
  title: 'widgets/ArticleAdditionalInfo',
  component: ArticleAdditionalInfo,
  argTypes: {}
} satisfies Meta<typeof ArticleAdditionalInfo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

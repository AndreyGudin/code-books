import type { Meta, StoryObj } from '@storybook/react';
import ForbiddenPage from './ForbiddenPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
  argTypes: {},
  decorators: [StoreDecorator({})]
} satisfies Meta<typeof ForbiddenPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};
export const NormalRedesigned: Story = { decorators: [NewDesignDecorator] };

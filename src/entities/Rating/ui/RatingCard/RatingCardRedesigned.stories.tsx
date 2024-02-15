import type { Meta, StoryObj } from '@storybook/react';
import { RatingCard } from './RatingCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
  title: 'entities/Rating/RatingCard/redesigned',
  component: RatingCard,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof RatingCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

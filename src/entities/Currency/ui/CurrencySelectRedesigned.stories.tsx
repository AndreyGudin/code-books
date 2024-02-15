import type { Meta, StoryObj } from '@storybook/react';

import { CurrencySelect } from './CurrencySelect';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
  title: 'entities/CurrencySelect/redesigned',
  component: CurrencySelect,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof CurrencySelect>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};

export default meta;

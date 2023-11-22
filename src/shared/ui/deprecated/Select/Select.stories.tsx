import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta = {
  title: 'shared/deprecated/Select',
  component: Select,
  argTypes: {}
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Укажите значение',
    options: [
      { value: 'Первое', content: 'Какое-то значение 1' },
      { value: 'Второе', content: 'Какое-то значение 2' }
    ]
  }
};

export default meta;

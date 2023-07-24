import type { Meta, StoryObj } from '@storybook/react';
import { Listbox } from './ListBox';
const meta = {
  title: 'shared/Listbox',
  component: Listbox,
  argTypes: {}
} satisfies Meta<typeof Listbox>;
export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    value: '123',
    content: 'qwert'
  },
  {
    value: '456',
    content: 'asdf'
  },
  {
    value: '789',
    content: 'zxcv'
  }
];

export const Normal: Story = {
  args: {
    items
  }
};

export const WithDirectionTop: Story = {
  args: {
    items,
    direction: 'top'
  }
};

export const Disabled: Story = {
  args: {
    items,
    disabled: true
  }
};

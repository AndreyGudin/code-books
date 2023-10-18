import type { Meta, StoryObj } from '@storybook/react';
import { ListBox } from './ListBox';
const meta = {
  title: 'shared/Listbox',
  component: ListBox,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ padding: 200 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ListBox>;
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
    label: 'Listbox',
    items,
    value: '123'
  }
};

export const WithDirectionTopRight: Story = {
  args: {
    label: 'Listbox',
    items,
    direction: 'top right',
    value: '123'
  }
};
export const WithDirectionTopLeft: Story = {
  args: {
    label: 'Listbox',
    items,
    direction: 'top left',
    value: '123'
  }
};
export const WithDirectionBottomLeft: Story = {
  args: {
    label: 'Listbox',
    items,
    direction: 'bottom left',
    value: '123'
  }
};
export const WithDirectionBottomRight: Story = {
  args: {
    label: 'Listbox',
    items,
    direction: 'bottom right',
    value: '123'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Listbox',
    items,
    disabled: true,
    value: '123'
  }
};

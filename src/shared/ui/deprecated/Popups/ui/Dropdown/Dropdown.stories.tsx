import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../../../Button/Button';
const meta = {
  title: 'shared/deprecated/Dropdown',
  component: Dropdown,
  argTypes: {}
} satisfies Meta<typeof Dropdown>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    trigger: <Button>Press me</Button>,
    items: [
      { content: '1' },
      { content: '2' },

      { content: '3' },

      { content: '4' },

      { content: '5' }
    ],
    direction: 'bottom left'
  }
};

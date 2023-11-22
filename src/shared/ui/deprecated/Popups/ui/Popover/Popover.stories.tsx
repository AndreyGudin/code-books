/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../../../Button/Button';
const meta = {
  title: 'shared/deprecated/Popover',
  component: Popover,
  argTypes: {}
} satisfies Meta<typeof Popover>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    trigger: <Button>Press me</Button>,
    direction: 'bottom left',
    children: <div>Content</div>
  }
};

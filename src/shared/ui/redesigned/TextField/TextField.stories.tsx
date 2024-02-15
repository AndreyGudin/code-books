import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
const meta = {
  title: 'shared/TextField',
  component: TextField,
  argTypes: {}
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    text: 'TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText'
  }
};

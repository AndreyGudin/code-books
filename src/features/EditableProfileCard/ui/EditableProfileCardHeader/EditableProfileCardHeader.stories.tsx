import type { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';
const meta = {
  title: 'features/EditableProfileCard/EditableProfileCardHeader',
  component: EditableProfileCardHeader,
  argTypes: {}
} satisfies Meta<typeof EditableProfileCardHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

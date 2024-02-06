import type { Meta, StoryObj } from '@storybook/react';
import { RetractablePanel } from './RetractablePanel';
const meta = {
  title: 'pages/RetractablePanel',
  component: RetractablePanel,
  argTypes: {}
} satisfies Meta<typeof RetractablePanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    children: <div></div>
  }
};

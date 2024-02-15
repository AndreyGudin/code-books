import type { Meta, StoryObj } from '@storybook/react';
import { RetractablePanel } from './RetractablePanel';
const meta = {
  title: 'pages/RetractablePanel',
  component: RetractablePanel,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ width: '100%', position: 'relative' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof RetractablePanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Right: Story = {
  args: {
    children: <div></div>
  }
};

export const Left: Story = {
  args: {
    position: 'left',
    children: <div></div>
  }
};

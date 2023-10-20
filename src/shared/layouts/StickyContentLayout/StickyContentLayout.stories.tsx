import type { Meta, StoryObj } from '@storybook/react';
import { StickyContentLayout } from './StickyContentLayout';
const meta = {
  title: 'pages/StickyContentLayout',
  component: StickyContentLayout,
  argTypes: {}
} satisfies Meta<typeof StickyContentLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    content: <div>Content</div>,
    left: <div>Left</div>,
    right: <div>Right</div>
  }
};

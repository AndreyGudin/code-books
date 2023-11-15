import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';
const meta = {
  title: 'shared/Code',
  component: Code,
  argTypes: {}
} satisfies Meta<typeof Code>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    text: `import type { Meta, StoryObj } from '@storybook/react';
  import { Code } from './Code';
  const meta = {
    title: 'pages/Code',
    component: Code,
    argTypes: {}
  } satisfies Meta<typeof Code>;
  export default meta;
  type Story = StoryObj<typeof meta>;
  export const Normal: Story = {args: {`
  }
};

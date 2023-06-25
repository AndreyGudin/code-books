import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page';
const meta = {
  title: 'pages/Page',
  component: Page,
  argTypes: {}
} satisfies Meta<typeof Page>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    children: <div>Page</div>
  }
};

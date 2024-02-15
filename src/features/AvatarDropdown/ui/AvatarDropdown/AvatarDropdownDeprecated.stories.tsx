import type { Meta, StoryObj } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'features/AvatarDropdown/deprecated',
  component: AvatarDropdown,
  argTypes: {},
  decorators: [
    StoreDecorator({
      user: {
        authData: { username: 'admin' }
      }
    }),
    (Story) => (
      <div style={{ width: 32, position: 'relative' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AvatarDropdown>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

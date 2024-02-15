import type { Meta, StoryObj } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
const meta = {
  title: 'features/AvatarDropdown/redesigned',
  component: AvatarDropdown,
  argTypes: {},
  decorators: [
    NewDesignDecorator,
    StoreDecorator({
      user: {
        authData: { username: 'admin' }
      }
    }),
    (Story) => (
      <div style={{ width: 100, position: 'relative' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AvatarDropdown>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {};

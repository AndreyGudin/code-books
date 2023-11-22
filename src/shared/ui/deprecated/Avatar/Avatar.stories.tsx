import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';
import AvatarImg from '../../../assets/tests/storybook.jpg';

const meta = {
  title: 'shared/deprecated/Avatar',
  component: Avatar,
  argTypes: {}
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 150,
    src: AvatarImg
  }
};

export const Small: Story = {
  args: {
    size: 50,
    src: AvatarImg
  }
};

export default meta;

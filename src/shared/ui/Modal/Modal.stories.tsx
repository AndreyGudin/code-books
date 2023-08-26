import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Modal } from './Modal';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {}
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    isOpen: true,
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iure eum tempore dicta repudiandae, molestiae quam alias, placeat corrupti nam earum recusandae mollitia. Atque sunt maiores totam, distinctio maxime voluptatum enim nostrum culpa ullam esse corrupti autem ab alias ratione dolor blanditiis, dolorum natus omnis? Inventore ipsum voluptate quibusdam. Blanditiis aut, obcaecati porro numquam excepturi voluptatum voluptatem quidem quod aliquid corrupti modi dolores possimus iure non exercitationem minima rerum. Soluta eveniet ut suscipit necessitatibus facilis, recusandae ipsa accusantium, harum repellat magnam explicabo. Sapiente, laborum accusantium provident quod voluptatum eos rem aperiam vel dicta neque expedita quasi ad numquam voluptatem modi?'
  }
};

export const Dark: Story = {
  args: {
    isOpen: true,
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iure eum tempore dicta repudiandae, molestiae quam alias, placeat corrupti nam earum recusandae mollitia. Atque sunt maiores totam, distinctio maxime voluptatum enim nostrum culpa ullam esse corrupti autem ab alias ratione dolor blanditiis, dolorum natus omnis? Inventore ipsum voluptate quibusdam. Blanditiis aut, obcaecati porro numquam excepturi voluptatum voluptatem quidem quod aliquid corrupti modi dolores possimus iure non exercitationem minima rerum. Soluta eveniet ut suscipit necessitatibus facilis, recusandae ipsa accusantium, harum repellat magnam explicabo. Sapiente, laborum accusantium provident quod voluptatum eos rem aperiam vel dicta neque expedita quasi ad numquam voluptatem modi?'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
};

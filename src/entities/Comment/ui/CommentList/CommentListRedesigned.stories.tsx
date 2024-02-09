import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from './CommentList';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
const meta = {
  title: 'entities/Comment/CommentList/redesigned',
  component: CommentList,
  argTypes: {},
  decorators: [NewDesignDecorator]
} satisfies Meta<typeof CommentList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    comments: [
      {
        id: '1',
        text: 'comment 1',
        user: {
          id: '1',
          username: 'admin',
          avatar:
            'https://yandex.ru/images/search?pos=8&from=tabbar&img_url=https%3A%2F%2Fforkast.news%2Fwp-content%2Fuploads%2F2021%2F08%2Fhacker-6512174-2048x1280.jpg&text=hacker&rpt=simage&lr=11152'
        }
      },
      {
        id: '2',
        text: 'comment 2',
        user: {
          id: '1',
          username: 'admin',
          avatar:
            'https://yandex.ru/images/search?pos=8&from=tabbar&img_url=https%3A%2F%2Fforkast.news%2Fwp-content%2Fuploads%2F2021%2F08%2Fhacker-6512174-2048x1280.jpg&text=hacker&rpt=simage&lr=11152'
        }
      },
      {
        id: '3',
        text: 'comment 3',
        user: {
          id: '2',
          username: 'user',
          avatar:
            'https://yandex.ru/images/search?pos=32&from=tabbar&img_url=https%3A%2F%2Fsun9-69.userapi.com%2Fimpg%2FkOUSUMrhvFIYF7wzlXIWdOxkrBWZZH6fIHfYMg%2FFIbXWNFgHm8.jpg%3Fsize%3D1280x854%26quality%3D95%26sign%3D5e8c3cd447dcc0415f8a0b6e3689ee39%26c_uniq_tag%3DGA9uuyF4X2V5iIaiDY788cJNf1BYpJ5acJ3uqqBHqXc%26type%3Dalbum&text=hacker&rpt=simage&lr=11152'
        }
      }
    ]
  }
};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};

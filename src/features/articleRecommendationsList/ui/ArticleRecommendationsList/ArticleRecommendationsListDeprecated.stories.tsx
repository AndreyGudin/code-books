import type { Meta, StoryObj } from '@storybook/react';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import type { Article } from '@/entities/Article';

const meta = {
  title: 'features/ArticleRecommendationsList/deprecated',
  component: ArticleRecommendationsList,
  argTypes: {}
} satisfies Meta<typeof ArticleRecommendationsList>;
export default meta;

const article: Article = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  user: {
    id: '1',
    username: 'admin',
    avatar: ''
  },
  createdAt: '26.02.2022',
  type: [],
  blocks: []
};

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  decorators: [StoreDecorator({})],
  parameters: {
    mockData: [
      {
        url: `${__API__}/articles?_limit=3`,
        method: 'GET',
        status: 200,
        response: [
          { ...article, id: '1' },
          { ...article, id: '2' },
          { ...article, id: '3' }
        ]
      }
    ]
  }
};
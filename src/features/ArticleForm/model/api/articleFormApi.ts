import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

type NewArticleArg = Omit<Article, 'id' | 'user'> & { userId: string };

const articleFormApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createNewArticle: build.mutation<Article, NewArticleArg>({
      query: (newArticle) => ({
        url: `/articles`,
        method: 'POST',
        body: newArticle
      })
    })
  })
});

export const useCreateArticleNewMutation =
  articleFormApi.useCreateNewArticleMutation;

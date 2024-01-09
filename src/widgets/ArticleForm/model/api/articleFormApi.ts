import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

export type NewArticleArg = Omit<Article, 'id' | 'user'> & { userId: string };
export type EditedArticle = Omit<Article, 'user'> & { userId: string };

const articleFormApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createNewArticle: build.mutation<Article, NewArticleArg>({
      query: (newArticle) => ({
        url: `/articles`,
        method: 'POST',
        body: newArticle
      })
    }),
    editArticle: build.mutation<Article, EditedArticle>({
      query: (editedArticle) => ({
        url: `/articles/${editedArticle.id}`,
        method: 'PUT',
        body: editedArticle
      })
    })
  })
});

export const useCreateArticleNewMutation =
  articleFormApi.useCreateNewArticleMutation;
export const useEditArticleMutation = articleFormApi.useEditArticleMutation;

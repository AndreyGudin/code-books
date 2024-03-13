import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

const articleDetailsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    deleteArticle: build.mutation<Article, string>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const useDeleteArticleMutation =
  articleDetailsApi.useDeleteArticleMutation;

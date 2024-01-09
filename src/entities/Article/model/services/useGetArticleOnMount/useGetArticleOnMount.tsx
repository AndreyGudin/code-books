import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchArticleById } from '../../services/fetchArticleById/fetchArticleById';
import { getArticleDetailsData } from '../../selectors/articleDetails';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Article } from '../../types/article';

export const useGetArticleOnMount = (
  id: string | undefined
): Article | undefined => {
  const dispatch = useAppDispatch();
  const article = useSelector(getArticleDetailsData);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      if (id) {
        dispatch(fetchArticleById(id)).catch((e) => {
          console.log(e);
        });
      }
    }
  }, [dispatch, id]);

  return article;
};

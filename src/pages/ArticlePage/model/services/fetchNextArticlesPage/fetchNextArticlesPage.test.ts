import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true
      }
    });
    await thunk.callThunk(undefined);
    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
  });

  test('fetchArticlesList hasnt been called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false
      }
    });
    await thunk.callThunk(undefined);
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });

  test('fetchArticlesList hasnt been called with isLoading true', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true
      }
    });
    await thunk.callThunk(undefined);
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});

import { User } from '../../../src/entities/User';
import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  title: 'Testing Article',
  subtitle: 'Testing',
  img: 'https://coursefreedl.com/wp-content/uploads/2020/01/Scala-Zero-To-Hero-Complete-Guide.jpg',
  views: 10222,
  createdAt: '24.01.2022',
  userId: '1',
  type: ['IT'],
  blocks: []
};

export const createArticle = (article?: Article) => {
  return cy
    .request({
      method: 'POST',
      url: `http://localhost:8000/articles`,
      headers: { Authorization: 'user' },
      body: article ?? defaultArticle
    })
    .then((resp) => resp.body);
};

export const removeArticle = (articleId: string) => {
  return cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'user' }
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}

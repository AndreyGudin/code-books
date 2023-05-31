import { lazy } from 'react';

export const ArticlePageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () =>
    new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      setTimeout(() => resolve(import('./ArticlePage')), 1500);
    })
);

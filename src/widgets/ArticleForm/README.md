## Widget ArticleForm

Описание:
Компонент для отображения формы редактирования или создания статьи

#### Public api

- API

`createNewArticle` - Асинхронная функция для создания новой статьи

`useCreateArticleNewMutation` - Хук RTK Query для создания новой статьи

`editArticle` - Асинхронная функция для редактирования статьи

`useEditArticleMutation` - Хук RTK Query для редактирования статьи

- Вспомогательные функции

`transformBlocksToText` - Функция для преобразования блоков типа ArticleBlock в строку

`mapSymbols` - Функция для преобразования текста в массив блоков типа ArticleBlock

## Сущность статьи

Описание:
Содержит различные компоненты для работы со статьей или списком статей

#### Public api

- Components

`ArticleCodeBlockComponents` - Компонент для отображения кода в статье

`ArticleDetails` - компонент с информацией о статье

`ArticleImageBlockComponents` - Компонент для отображения картинки в статье

`ArticleList` - Компонент со списком статей

`ArticleListItem` - Компонент списка статьи

`ArticleTextBlockComponents` - Компонент для отображения текста в статье

- services
  `fetchArticleById` - Сервис для получения статьи изи базы данных по уникальному ID

  `useGetArticleOnMount` - Сервис для получения статьи изи базы данных по уникальному ID при монтировании компонента

- types

`Article` - Тип, описывающий статью
`ArticleBlockBase` - Тип, описывающий базовый блок статьи
`ArticleCodeBlock` - Тип, описывающий блок, содержащий код
`ArticleImageBlock` - Тип, описывающий блок, содержащий картинку
`ArticleTextBlock` - Тип, описывающий блок, содержащий текст
`ArticleBlock` - Тип, объединяющий типы ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock

- selectors

`getArticleDetailsData` - Селектор для получения информации о текущей открытой статье

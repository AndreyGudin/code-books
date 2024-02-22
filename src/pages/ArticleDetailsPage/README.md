## Page ArticleDetailsPage

Описание:
Содержит компоненты для отображения статьи

#### Public api

- Components

`AdditionalInfoContainer` - Компонент, показывающий дополнительную информацию о статье с кнопкой редактирования

`ArticleDetailsComments` - Компонент, отображающий список комментариев под статьей

`ArticleDetailsPage` - Компонент страницы статьи

`ArticleDetailsPageHeader` - Компонент, отображающий заголовок страницы статьи

`DetailsContainer` - Компонент-контейнер для статьи

- Services

`addCommentForArticle` - Сервис добавления комментария для статьи

`fetchArticleRecommendations` - Сервис для получения списка рекомендаций

`fetchCommentsByArticleId` - Сервис для получения комментариев статьи по ID

- Selectors

`getArticleComments` - Селектор для получения комментариев по ID статьи

`getArticleDetailsCommentsIsLoading` - Селектор для получения статуса загрузки комментариев

`getArticleDetailsCommentsError` - Селектор для получения ошибки при загрузке комментариев

`getArticleRecommendations` - Селектор для получения списка рекомендованных статей

`getCanEditArticle` - Селектор для получения статуса редактирования статьи

`getArticleRecommendationsCommentsIsLoading` -Селектор для получения статуса загрузки рекомендаций

`getArticleRecommendationsCommentsError` - Селектор для получения ошибки при загрузке рекомендаций

- Types

`articleDetailsCommentsSchema` - Тип, описывающий комментарий

`articleDetailsPageRecommendationsSchema` - Тип, описывающий рекомендации

`ArticleDetailsPageSchema` - Тип, описывающий состояние

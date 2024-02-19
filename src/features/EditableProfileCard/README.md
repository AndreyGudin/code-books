## Feature EditableProfileCard

Описание:
Содержит компоненты для отображения профиля пользователя

#### Public api

- Components

`EditableProfileCard` - Компонент для отображения профиля пользователя

`EditableProfileCardHeader` - Компонент заголовка профиля

- Reducers

`setReadonly` - Включение или выключение изменения профиля

`cancelEdit` - Отмена изменений

`updateProfile` - Обновление профиля

- Selectors

`getProfileData` - Селектор для получения данных о пользователе

`getProfileError` - Селектор для получения статуса авторизации

`getProfileForm` - Селектор для получения данных, занесенных в форму

`getProfileIsLoading` - Селектор для получения состояния загрузки профиля

`getProfileReadonly` - Селектор для получения редактируемости профиля

`getProfileValidateErrors` - Селектор для ошибок валидации

- Services

`fetchProfileData` - Сервис для получения данных профиля

`updateProfileData` - Сервис для обновления данных профиля

`validateProfile` - Сервис для валидации введённых данных

- Types

`ProfileSchema` - Тип, описывающий состояние

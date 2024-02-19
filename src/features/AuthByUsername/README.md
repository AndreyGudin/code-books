## Feature AuthByUserName

Описание:
Содержит компоненты для аунтификации пользователя

#### Public api

- Components

`LoginForm` - Компонент для формы авторизации

`LoginModal` - Компонент для модального окна авторизации

- Reducers

`setUsername` - Сохраняет имя пользователя в состояние

`setPassword` - Сохраняет пароль в состояние

- Selectors

`getLoginError` - Селектор для получения ошибки авторизации

`getLoginLoading` - Селектор для получения статуса авторизации

`getLoginPassword` - Селектор для получения пароля пользователя

`getLoginState` - Селектор для получения состояния

`getLoginUsername` - Селектор для получения имени пользователя

- Services

`loginByUserName` - Сервис для авторизации пользователя по имении и паролю

- Types

`LoginSchema` - Тип, описывающий состояние

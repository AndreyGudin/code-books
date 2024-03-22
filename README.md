## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

---

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run test:ui` - Запуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `analyze:dev`: - Сборка в dev режиме (не минимизирован) с анализом билда
- `analyze:prod`: - Сборка в prod режиме с анализом билда

---

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Тесты

В проекте используются 4 вида тестов:

1. Обычные unit тесты на jest - `npm run test:unit`
2. Тесты на компоненты с React testing library -`npm run test:unit`
3. Скриншотное тестирование с loki `npm run test:ui`
4. e2e тестирование с Cypress `npm run test:e2e`

Подробнее о тестах - [документация тестирование](/docs/tests.md)

---

## Линтинг

В проекте используется eslint для проверки typescript кода

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin _eslint-plugin-andrey-gudin-forprod_,
который содержит 3 правила

1. path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2. layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entities)
3. public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров

- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:

- `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button } from './Button';
import { ButtonSize, ButtonTheme } from './const';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'shared/Button',
  component: Button,
  argTypes: {}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Text'
  }
};
```

---

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build

Вся конфигурация хранится в /config

- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

---

## Сущности (entities)

- [Article](/src/entities/Article/README.md)
- [Comment](/src/entities/Comment/README.md)
- [Country](/src/entities/Country/README.md)
- [Currency](/src/entities/Currency/README.md)
- [Notification](/src/entities/Notification/README.md)
- [Profile](/src/entities/Profile/README.md)
- [Rating](/src/entities/Rating/README.md)
- [User](/src/entities/User/README.md)

## Фичи (features)

- [addCommentForm](/src/features/addCommentForm/README.md)
- [ArticlePageGreeting](/src/features/ArticlePageGreeting/README.md)
- [articleRating](/src/features/articleRating/README.md)
- [articleRecommendationsList](/src/features/articleRecommendationsList/README.md)
- [ArticleSortSelector](/src/features/ArticleSortSelector/README.md)
- [ArticleTypeTabs](/src/features/ArticleTypeTabs/README.md)
- [ArticleViewSelector](/src/features/ArticleViewSelector/README.md)
- [AuthByUsername](/src/features/AuthByUsername/README.md)
- [AvatarDropdown](/src/features/avatarDropdown/README.md)
- [EditableProfileCard](/src/features/editableProfileCard/README.md)
- [LangSwitcher](/src/features/LangSwitcher/README.md)
- [NotificationButton](/src/features/notificationButton/README.md)
- [PasteTextToPositionButton](/src/features/PasteTextToPositionButton/README.md)
- [RetractablePanel](/src/features/RetractablePanel/README.md)
- [ScrollSave](/src/features/ScrollSave/README.md)
- [ScrollToTopButton](/src/features/ScrollToTopButton/README.md)
- [ThemeSwitcher](/src/features/ThemeSwitcher/README.md)
- [UIDesignSwitcher](/src/features/UIDesignSwitcher/README.md)

## Страницы (pages)

- [AboutPage](/src/pages/AboutPage/README.md)
- [AdminPanelPage](/src/pages/AdminPanelPage/README.md)
- [ArticleDetailsPage](/src/pages/ArticleDetailsPage/README.md)
- [ArticleEditPage](/src/pages/ArticleEditPage/README.md)
- [ArticlePage](/src/pages/ArticlePage/README.md)
- [ForbiddenPage](/src/pages/ForbiddenPage/README.md)
- [MainPage](/src/pages/MainPage/README.md)
- [NotFoundPage](/src/pages/NotFoundPage/README.md)
- [ProfilePage](/src/pages/ProfilePage/README.md)
- [SettingsPage](/src/pages/SettingsPage/README.md)

## Виджеты (widgets)

- [ArticleAdditionalInfo](/src/widgets/ArticleAdditionalInfo/README.md)
- [ArticleForm](/src/widgets/ArticleForm/README.md)
- [ArticlesFilters](/src/widgets/ArticlesFilters/README.md)
- [Navbar](/src/widgets/Navbar/README.md)
- [Page](/src/widgets/Page/README.md)
- [PageError](/src/widgets/PageError/README.md)
- [PageLoader](/src/widgets/PageLoader/README.md)
- [ScrollToolbar](/src/widgets/ScrollToolbar/README.md)
- [Sidebar](/src/widgets/Sidebar/README.md)

## Shared

- [Hooks](/src/shared/hooks/README.md)
- [Lib](/src/shared/lib/README.md)

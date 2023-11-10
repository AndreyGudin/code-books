export enum AppRoutes {
  MAIN = 'main',
  SETTINGS = 'settings',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ARTICLES_DETAILS = 'articles_details',
  ADMIN_PANEL = 'admin_panel',
  NOT_FOUND = 'not_found',
  FORBIDDEN = 'forbidden'
}

export const getRouteMain = (): string => '/';
export const getRouteSettings = (): string => '/settings';
export const getRouteAbout = (): string => '/about';
export const getRouteProfile = (id: string): string => `/profile/${id}`;
export const getRouteArticles = (): string => `/articles`;
export const getRouteArticleDetails = (id: string): string => `/articles/${id}`;
export const getRouteArticleCreate = (): string => `/articles/new`;
export const getRouteArticleEdit = (id: string): string =>
  `/articles/${id}/edit`;
export const getRouteAdmin = (): string => `/admin`;
export const getRouteForbidden = (): string => `/forbidden`;

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: getRouteMain(),
  [AppRoutes.SETTINGS]: getRouteSettings(),
  [AppRoutes.ABOUT]: getRouteAbout(),
  [AppRoutes.PROFILE]: getRouteProfile(':id'),
  [AppRoutes.ARTICLES]: getRouteArticles(),
  [AppRoutes.ARTICLE_CREATE]: getRouteArticleCreate(),
  [AppRoutes.ARTICLE_EDIT]: getRouteArticleEdit(':id'),
  [AppRoutes.ARTICLES_DETAILS]: getRouteArticleDetails(':id'),
  [AppRoutes.ADMIN_PANEL]: getRouteAdmin(),
  [AppRoutes.FORBIDDEN]: getRouteForbidden(),
  [AppRoutes.NOT_FOUND]: '*'
};

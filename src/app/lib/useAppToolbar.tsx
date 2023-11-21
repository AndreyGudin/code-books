/* eslint-disable i18next/no-literal-string */
import { AppRoutes } from '@/shared/const/router';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { JSXElementConstructor, ReactElement } from 'react';

export function useAppToolbar():
  | ReactElement<any, string | JSXElementConstructor<any>>
  | undefined {
  const appRoute = useRouteChange();
  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLES_DETAILS]: <ScrollToolbar />,
    [AppRoutes.MAIN]: <div>Main</div>,
    [AppRoutes.ABOUT]: <div>About</div>
  };

  return toolbarByAppRoute[appRoute];
}

import { RequireAuth } from 'app/providers/router/ui/RequireAuth';
import { Suspense, memo, useCallback } from 'react';
import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from 'shared/config/routerConfig/routerConfig';
import type { AppRoutesProps } from 'shared/config/routerConfig/routerConfig';
import { PageLoader } from 'widgets/PageLoader';

export const AppRouter: FC = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly !== undefined && route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});

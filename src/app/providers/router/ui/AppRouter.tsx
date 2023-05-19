import { getAuthUserData } from 'entities/User';
import { Suspense, memo, useMemo } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from 'shared/config/routerConfig/routerConfig';
import { PageLoader } from 'widgets/PageLoader';

export const AppRouter: FC = memo(() => {
  const isAuth = useSelector(getAuthUserData);

  const routes = useMemo(() => {
    return Object.values(routeConfig).filter((route) => {
      if ((route.authOnly ?? false) && isAuth === undefined) {
        return false;
      }
      return true;
    });
  }, [isAuth]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ element, path }) => {
          return (
            <Route
              key={path}
              path={path}
              element={<div className="page-wrapper">{element}</div>}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
});

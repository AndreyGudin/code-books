import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routeConfig } from "shared/config/routerConfig/routerConfig";

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => {
          return (
            <Route
              key={path}
              path={path}
              element={<div className='page-wrapper'>{element}</div>}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

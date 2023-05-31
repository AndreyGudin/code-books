import { useSelector } from 'react-redux';

import { getAuthUserData } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig/routerConfig';

export const RequireAuth = ({
  children
}: {
  children: JSX.Element;
}): JSX.Element => {
  const auth = useSelector(getAuthUserData);
  const location = useLocation();

  if (auth === undefined) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  return children;
};

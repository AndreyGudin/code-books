import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { type UserRole, getAuthUserData, getUserRoles } from 'entities/User';
import { RoutePath } from 'shared/config/routerConfig/routerConfig';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

export const RequireAuth = ({
  children,
  roles
}: RequireAuthProps): JSX.Element => {
  const auth = useSelector(getAuthUserData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);
  const hasRequiredRoles = useMemo(() => {
    if (roles === undefined) return true;
    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (auth === undefined) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />
    );
  }

  return children;
};

import { createSelector } from '@reduxjs/toolkit';
import type { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/const';

export const getUserRoles = (state: StateSchema): UserRole[] | undefined =>
  state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.ADMIN))
);

export const isUserManager = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.MANAGER))
);

export { userActions, userReducer } from './model/slice/userSlice';
export { getAuthUserData } from './model/selectors/getAuthUserData/getAuthUserData';
export { getUserMounted } from './model/selectors/getUserMounted/getUserMounted';

export type { User, UserSchema } from './model/types/user';

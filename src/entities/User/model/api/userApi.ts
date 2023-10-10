import { JsonSettings } from '../types/jsonSettings';
import { User } from '../types/user';
import { rtkApi } from '@/shared/api/rtkApi';

interface SetJsonSettings {
  userId: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, SetJsonSettings>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          jsonSettings
        }
      })
    }),
    getUserDataById: build.mutation<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET'
      })
    })
  })
});

export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate;
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;

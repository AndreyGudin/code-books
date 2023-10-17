import { createSelector } from '@reduxjs/toolkit';

import { getAuthUserData } from '@/entities/User';

import AboutIconDeprecated from '@/shared/assets/icons/about.svg';
import MainIconDeprecated from '@/shared/assets/icons/home.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article.svg';

import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIcon from '@/shared/assets/icons/home_new.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticleIcon from '@/shared/assets/icons/article_new.svg';

import type { SidebarItemType } from '../types/sidebar';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(getAuthUserData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => MainIcon,
        off: () => MainIconDeprecated
      }),
      text: 'Главная'
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => AboutIcon,
        off: () => AboutIconDeprecated
      }),
      text: 'О сайте'
    }
  ];
  if (userData !== undefined) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated
        }),
        text: 'Профиль',
        authOnly: true
      },
      {
        path: getRouteArticles(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ArticleIcon,
          off: () => ArticleIconDeprecated
        }),
        text: 'Статьи',
        authOnly: true
      }
    );
  }
  return sidebarItemsList;
});

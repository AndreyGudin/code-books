import { createSelector } from '@reduxjs/toolkit';

import { getAuthUserData } from '@/entities/User';
import { RoutePath } from '@/shared/config/routerConfig/routerConfig';
import AboutIcon from '@/shared/assets/icons/about.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import type { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getAuthUserData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      Icon: MainIcon,
      text: 'Главная'
    },
    {
      path: RoutePath.about,
      Icon: AboutIcon,
      text: 'О сайте'
    }
  ];
  if (userData !== undefined) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData.id,
        Icon: ProfileIcon,
        text: 'Профиль',
        authOnly: true
      },
      {
        path: RoutePath.articles,
        Icon: ArticleIcon,
        text: 'Статьи',
        authOnly: true
      }
    );
  }
  return sidebarItemsList;
});
